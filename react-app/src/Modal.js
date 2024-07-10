import React from 'react'

const Modal = props => {
    return (
        <div className={`bg-[#000]/40 w-full absolute top-0 px-5 md:px-20 h-[100vh] ${props.displayValue}`}>
            <div className='p-2 md:w-auto lg:w-[60%] w-full mt-4 mx-auto bg-[#fff] border rounded'>
                <div className='flex flex-col gap-y-5'>
                    <div className='border-b flex items-center mb-2 pb-2'>
                        <p className='font-normal text-xl'>Preferences</p>
                        <svg onClick={() => { props.hideModal() }} className='w-[1em] h-[1em] justify-end ml-auto align-middle fill-black overflow-hidden' viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"><path d="M548.1984 537.6l289.0752-289.0752c9.984-9.984 9.984-26.2144 0-36.1984s-26.2144-9.984-36.1984 0l-289.0752 289.0752-289.0752-289.0752c-9.984-9.984-26.2144-9.984-36.1984 0s-9.984 26.2144 0 36.1984l289.0752 289.0752-289.0752 289.0752c-9.984 9.984-9.984 26.2144 0 36.1984 5.0176 5.0176 11.5712 7.4752 18.1248 7.4752s13.1072-2.5088 18.1248-7.4752l289.0752-289.0752 289.0752 289.0752c5.0176 5.0176 11.5712 7.4752 18.1248 7.4752s13.1072-2.5088 18.1248-7.4752c9.984-9.984 9.984-26.2144 0-36.1984l-289.0752-289.0752z" /></svg>
                    </div>
                    <div className='flex space-y-6 flex-col md:ml-6'>
                        <div className='flex justify-evenly items-center '>
                            <p className='font-semibold mr-5'>Font Size</p>
                            <select className='border pr-3 w-32' value={props.selectValue} onChange={props.handleSelectChange}>
                                <option value='12'>12</option>
                                <option value='14'>14</option>
                                <option value='16'>16</option>
                                <option value='18'>18</option>
                                <option value='20'>20</option>
                                <option value='22'>22</option>
                                <option value='24'>24</option>
                                <option value='26'>26</option>
                                <option value='28'>28</option>
                                <option value='30'>30</option>
                            </select>
                        </div>

                        <div className='flex justify-evenly items-center '>
                            <p className='font-semibold'>Font Weight</p>
                             <select className='border pr-3 w-32' value={props.fontWeight} onChange={props.handleWeightSelectChange}>
                                <option value='lighter'>Light</option>
                                <option value='normal'>Normal</option>
                                <option value='bold'>Bold</option>
                            </select>
                        </div>
                        <div className='flex justify-evenly items-center '>
                            <p className='font-semibold'>Line Height</p>
                            <select className='border pr-3 w-32' onChange={props.handleLineHeightChange}>
                                <option value='18'>18</option>
                                <option value='20'>20</option>
                                <option value='22'>22</option>
                                <option value='24'>24</option>
                                <option value='26'>26</option>
                                <option value='28'>28</option>
                                <option value='30'>30</option>
                                <option value='32'>32</option>
                            </select>
                        </div>
                    </div> 
                    <div className='border-t py-2'>
                        <button onClick={() => {
                            props.hideModal();
                            props.handleClickEvents();
                        }} className='border text-sm px-[8px] py-[6px] hover:bg-green-700 rounded-xl bg-green-600 font-semibold text-white ml-auto block'>Save Changes</button>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Modal