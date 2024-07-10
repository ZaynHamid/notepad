from flask import Flask, request, jsonify,  url_for, session, g
import mysql.connector
from flask_bcrypt import Bcrypt
import secrets
from flask_mail import Mail, Message
import string
import random
from flask_cors import CORS, cross_origin


app = Flask(__name__)
app.secret_key = "!@#PPBigertandu"
bcrypt = Bcrypt(app)

# Configure CORS to allow credentials
CORS(app, supports_credentials=True)

def get_db():
    if 'db' not in g:
        g.db = mysql.connector.connect(
        host='127.0.0.1',
        user='root',
        password='root',
        database='users'
        )
    return g.db

def close_db(e=None):
    db = g.pop('db', None)
    if db is not None:
        db.close()

@app.teardown_appcontext
def teardown_db(e=None):
    close_db(e)

app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_SSL'] = True
app.config['MAIL_USERNAME'] = 'waleedhamid444@gmail.com'
app.config['MAIL_PASSWORD'] = 'dqykwdrptwhzrpsl'

# Set session cookie attributes
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True

mail = Mail(app)

@app.route('/login', methods=['POST', 'OPTIONS', 'GET'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)

def login():
    data = request.json
    identifier = data.get('identifier')
    password = data.get('password')

    db = get_db()
    cursor = db.cursor()

    if '@' in identifier:  # If '@' is present, treat it as an email
        query = 'SELECT name, pswd, email FROM user WHERE email = %s'
    else:
        query = 'SELECT name, pswd, email FROM user WHERE name = %s'

    cursor.execute(query, (identifier,))
    user = cursor.fetchone()

    if user:
        stored_username, stored_password, email = user  # Unpack the tuple
        if bcrypt.check_password_hash(stored_password, password):
            session['username'] = stored_username
            return jsonify({'success': True, 'message': 'Login successful', 'email': email, 'user': stored_username})
        else:
            return jsonify({'success': False, 'message': 'Invalid username or password. Try again or click Forgot Password.'})
    else:
        return jsonify({'success': False, 'message': "Couldn't find your ZPad Account. Please sign up to create one."})

def generate_verification_code():
    return ''.join(random.choices(string.digits, k=6))


@app.route('/signup', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)

def signup():
    data = request.json
    email = data.get("email")
    username = data.get("username")
    password = data.get("password")

    db = get_db()
    cursor = db.cursor()

    session['email'] = email
    session['username'] = username
    session['password'] = password

    verification_code = generate_verification_code()

    sql_user_exist = 'SELECT * FROM user WHERE email = %s'
    cursor.execute(sql_user_exist, (email,))
    existing_user = cursor.fetchone()
    if existing_user:
        return jsonify({'success': False, 'message': 'User already exists!'})

    sql_username_exist = 'SELECT * FROM user WHERE name = %s'
    cursor.execute(sql_username_exist, (username,))
    existing_username = cursor.fetchone()
    if existing_username:
        return jsonify({'success': False, 'message': 'Username is taken, please try a different one.'})

    session['verification_code'] = verification_code
    msg = Message('Verification Code', sender='waleedhamid444@gmail.com', recipients=[email])
    msg.body = f'Your verification code is: {verification_code}'
    mail.send(msg)
    return jsonify({'success': True, 'message': 'A verification code has been sent to your email!'})



@app.route('/verify-email', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)

def verify_email():
    data = request.json
    code = data.get('code')
    stored_code = session.get('verification_code')

    
    email = session['email']
    username = session['username']
    password= session['password']

    db = get_db()
    cursor = db.cursor()

    if code == stored_code:
        sql = "INSERT INTO user (name, email, pswd, data) VALUES (%s, %s, %s, %s)"
        hashed_pswd = bcrypt.generate_password_hash(password).decode('utf-8')
        val = (username, email, hashed_pswd, f'Hello! {username}')
        cursor.execute(sql, val)
        db.commit() 
        session.pop('verification_code', None)
        session.pop('email', None)
        session.pop('username', None)
        session.pop('password', None)
        return jsonify({'success': True, 'message': 'Account created!'})
    else:
        return jsonify({'success': False, 'message': 'Code does not match, please double-check the code and try again!'})


def generate_token(length=30):
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for i in range(length))

@app.route('/delete_account', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)

def delete_account():
    data = request.json
    username = data.get("username")
    db = get_db()
    cursor = db.cursor()

    cursor.execute('DELETE FROM user WHERE name = %s', (username,))
    db.commit()
    return jsonify({'success': True, 'message': 'Successfully deleted account!', 'redirect_url': url_for('login')})

        

@app.route('/forgot_password', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)

def forgot_password():
    data = request.json
    email = data.get('email')

    db = get_db()
    cursor = db.cursor()

    sql_user_exist = 'SELECT * FROM user WHERE email = %s'
    cursor.execute(sql_user_exist, (email,))
        
    existing_user = cursor.fetchall()
    if existing_user:
        reset_token = generate_token()

        reset_link = 'http://localhost:3000/reset_password/' + reset_token
        session['reset_token'] = reset_token
        session['email'] = email
        msg = Message('Password Reset Request', sender='waleedhamid444@gmail.com', recipients=[email])
        msg.body = f'Click the following link to reset your password: {reset_link}'
        mail.send(msg)
        return jsonify({'success': True, 'message': 'A reset link has been sent to your email!',  'redirect_url': url_for('login')})
    else:       
        return jsonify({'success': False, 'message': 'User does not exist!'})

@app.route("/reset_password", methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)

def reset_password():
    data = request.json
    new_password = data.get("password")
    confirm_password = data.get('confirmPassword')
    db = get_db()
    cursor = db.cursor()

    stored_token = session.get("reset_token")
    email = session.get("email")

    if stored_token and email:
        if new_password == confirm_password:
            hashed_pswd = bcrypt.generate_password_hash(new_password)
            cursor.execute('UPDATE user SET pswd = %s WHERE email = %s', (hashed_pswd, email,))
            db.commit()
            session.pop("reset_token")
            session.pop("email")  
            return jsonify({'success': True, 'message': 'Password Changed Successfully', 'redirect_url': url_for('login')})
        else:
            return jsonify({'success': False, 'message': 'Passwords dont match!'})
    else:
        return jsonify({'success': False, 'message': 'Invalid or expired token'})

@app.route('/save',methods=['POST', 'OPTIONS'])
def save_to_db():
    data = request.json
    val = data.get('inputVal')
    user = data.get('user')
    db = get_db()
    cursor = db.cursor()

    cursor.execute('SELECT * FROM user WHERE name = %s', (user,))
    user_exist = cursor.fetchone()
    if user_exist:  # User exists
        cursor.execute('UPDATE user SET data = %s WHERE name = %s', (val, user, ))
        db.commit()
        return jsonify({'success': True,
         'message': 'Changes Saved!'})
    else:  # User doesn't exist
        return jsonify({'success': True, 'message': 'err'})

@app.route("/get_note", methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)

def get_note():
    try:
        data = request.json
        user = data.get('parsedEmail')

        db = get_db()
        cursor = db.cursor()

        if not user:
            return jsonify({'success': False, 'message': 'User field is missing in the request'}), 400

        cursor.execute('SELECT data FROM user WHERE email = %s', (user,))
        note = cursor.fetchone()

        if note:
            return jsonify({'success': True, 'message': 'Note retrieved successfully', 'data': str(note[0])})
        else:
            return jsonify({'success': False, 'message': 'Note not found for the user'}), 404

    except Exception as e:
        return jsonify({'success': False, 'message': str(e)}), 500
    
@app.route('/change-password', methods=['POST', 'OPTIONS'])
@cross_origin(origin='http://localhost:3000', supports_credentials=True)
def change_password():
    data = request.json 
    current_password = data.get("currentPassword")
    new_password = data.get("newPassword")
    user = data.get("user")   

    db = get_db()
    cursor = db.cursor()
    
    
    cursor.execute('SELECT pswd FROM user WHERE name = %s', (user,))
    stored_password_row = cursor.fetchone()
    
    if stored_password_row is None:
        return jsonify({'success': False, 'message': 'User not found!'})

    stored_password = stored_password_row[0]

    if bcrypt.check_password_hash(stored_password, current_password):
       hashed_new_pswd = bcrypt.generate_password_hash(new_password).decode('utf-8')
       cursor.execute('UPDATE user SET pswd = %s WHERE name = %s', (hashed_new_pswd, user,))
       db.commit()
       return jsonify({'success': True, 'message': 'Password Changed Successfully!'})
    else:
       return jsonify({'success': False, 'message': 'Current Password does not match, please try again!'})

if __name__ == '__main__':
    app.run(debug=True)
