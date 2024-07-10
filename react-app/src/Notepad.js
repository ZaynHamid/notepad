import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Modal from "./Modal";

const Notepad = () => {
  const [inputVal, setInputVal] = useState("");
  const [theme, setTheme] = useState(true);
  const [selectValue, setSelectValue] = useState("");
  const fontSize = localStorage.getItem("fontSize");
  let themeName = localStorage.getItem("theme");
  const [displayValue, setDisplayValue] = useState("hidden");
  const [fontWeight, setFontWeight] = useState("");
  const [lineHeight, setLineHeight] = useState("");
  let [characters, setCharacters] = useState(0);
  let [wordCount, setWordCount] = useState(0);
  const user = localStorage.getItem("user");

  themeName === null ? (themeName = "light") : (themeName = themeName );

  const handleClickEvents = () => {
    localStorage.setItem("fontSize", selectValue);
    localStorage.setItem("fontWeight", fontWeight);
    localStorage.setItem("lineHeight", lineHeight);
  };

  const handleThemeClick = (e) => {
    setTheme(!theme);
    if (!theme) {
      themeName = "light";
    } else {
      themeName = "dark";
    }
    localStorage.setItem("theme", themeName);
  };

  const handlePreference = () => {
    setDisplayValue("block");
  };

  useEffect(() => {
    const selectValueOfFontSize = localStorage.getItem("fontSize");
    setSelectValue(selectValueOfFontSize);
    const selectValueOfFontWeight = localStorage.getItem("fontWeight");
    setFontWeight(selectValueOfFontWeight);
    const selectValueOfLineHeight = localStorage.getItem("lineHeight");
    setLineHeight(selectValueOfLineHeight);
  }, []);

  const handleSelectChange = (e) => {
    setSelectValue(e.target.value);
  };

  const handleWeightSelectChange = (e) => {
    setFontWeight(e.target.value);
  };

  const handleLineHeightChange = (e) => {
    if (!e.target.value) {
      e.target.value = "";
    } else {
      setLineHeight(e.target.value);
    }
  };

  const handleChange = (e) => {
      localStorage.setItem("value", e.target.value);
      setInputVal(e.target.value);
      setCharacters(e.target.value.length);
      setWordCount(e.target.value.split(" ").length);
  };

  useEffect(() => {
    const valueOfLocalStorage = localStorage.getItem("value");
    setInputVal(valueOfLocalStorage);
  }, [inputVal]);


  const deleteNotes = () => {
    alert("Notes Deleted");
    localStorage.setItem("value", "");
    setInputVal(localStorage.getItem('value'))
  };

  const copyNotes = () => {
    navigator.clipboard.writeText(inputVal);
    alert("Notes Copied");
  };

  const darkTheme = {
    border: " border-slate-200/40",
    textColor: " text-white",
    textareaBackground: " bg-slate-600",
    containerBackground: " bg-slate-700",
    navbarBackground: " bg-slate-600",
  };

  const lightTheme = {
    border: " border border-slate-400/50",
    textColor: " text-black",
    textareaBackground: " bg-white",
    navbarBackground: " bg-yellow-900",
    containerBackground: " bg-gray-200",
    shadow: " shadow-xl"
  };

  const hideModal = () => {
    setDisplayValue("hidden");
  };

  const saveToDb = async () => {
    const user = localStorage.getItem("user");

    if (user) {
      try {
        const response = await fetch("https://ohzayn.pythonanywhere.com//save", {
          method: "POST",
          credentials: 'include',
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ inputVal, user }),
        });
        const data = await response.json();
        data ? alert(data.message) : alert(data.message);
      } catch (err) {
        console.log(err);
      }
    
    }
  };


  const Notes = async () => {
    const email = localStorage.getItem("email");
    const parsedEmail = JSON.parse(email)
    try {
      const response = await fetch("https://ohzayn.pythonanywhere.com/get_note", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: 'include',

        body: JSON.stringify({ parsedEmail }),
      });
      const data = await response.json();
      
     if(data){
       localStorage.setItem('value', data.data) 
       setInputVal(localStorage.getItem('value'))
      } else if(data.data === 'undefined') {
        alert("Couldn't fetch notes")
      } else if (data.data == 'None') {
        console.log('err')
      }
    } catch (err) {
      console.log("Oh", err);
    }
  };

 useEffect(() => {
    if (user) {
      Notes();
    }
  }, []);

useEffect(() => {
  if (!user) {    
     const val = localStorage.getItem('value')
    setInputVal(val)
  }
}, [user])

  return (
    <>
      <div>
        <Navbar
          handlePreference={handlePreference}
          handleClick={deleteNotes}
          backgroundColor={
            themeName === "light"
              ? lightTheme.navbarBackground
              : darkTheme.navbarBackground
          }
          themeName={themeName}
          copyNotes={copyNotes}
          changeTheme={handleThemeClick}
        />
        <div
          className={`w-full relative h-[100vh] ${
            themeName === "light"
              ? lightTheme.containerBackground
              : darkTheme.containerBackground
          }`}
        >
          <p className="fixed bg-white/70 px-4 dark:border-slate-200 border-slate-800 border-2 rounded-full text-base bottom-6 right-6">
            Character(s) {characters}, Word(s) {wordCount}
          </p>
          <textarea
            type={"text"}
            style={{
              fontSize: fontSize + "px",
              fontWeight: fontWeight,
              lineHeight: lineHeight + "px",
            }}

            className={`md:w-[65%] w-[98%] resize-none block h-[95vh] mx-auto border p-4 outline-none ${
              themeName === "light"
                ? lightTheme.textareaBackground +
                  lightTheme.border +
                  lightTheme.textColor +
                  lightTheme.shadow
                : darkTheme.textareaBackground +
                  darkTheme.border +
                  darkTheme.textColor
            }`}
            placeholder="Add your notes here and they will be stored here unless you clear your browser history"
            value={inputVal}
            onChange={handleChange}
          />
          <div className="container mx-auto fixed bottom-16 md:right-10 right-4">
                <button
            className={`px-6 py-3 rounded-xl bg-white/80 float-right border-2  ${
              user ? "block" : "invisible"
            }  `}
            onClick={saveToDb}
          >
            Save Changes
          </button>
          </div>
      
        </div>
        <Modal
          lineHeight={lineHeight}
          handleLineHeightChange={handleLineHeightChange}
          handleWeightSelectChange={handleWeightSelectChange}
          fontWeight={fontWeight}
          selectValue={selectValue}
          hideModal={hideModal}
          handleClickEvents={handleClickEvents}
          displayValue={displayValue}
          handleSelectChange={handleSelectChange}
        />
      </div>
    </>
  );
};

export default Notepad;


/*
  Difference between Interpreter and Complier

A compiler translates the entire source code into machine code before execution, resulting in faster execution since no translation is needed during runtime. 

On the other hand, an interpreter translates code line by line during execution, making it easier to detect errors but potentially slowing down the program.

*/