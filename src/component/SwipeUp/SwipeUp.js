import React, {  useEffect} from 'react';
import logo from "../../logo.svg";
// import Swipe from "react-easy-swipe";
// import VideoPlayer from 'react-video-js-player';

import $ from "jquery";
import VideoApp from "../ReactVideoJS/ReactVideoJS";

const SwipeUp = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
   const  onSwipeStart=(event)=> {
       $(".swiperdiv").css("height", "80vh");
        console.log('Start swiping...', event);
    }

    // const  onSwipeMove=(position, event)=> {
    //     console.log(`Moved ${position.x} pixels horizontally`, event);
    //     console.log(`Moved ${position.y} pixels vertically`, event);
    // }
    //
    // const  onSwipeEnd=(  event)=>   {
    //     console.log('End swiping...', event);
    // }

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <p>
                    Edit <code>src/App.js</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
                {/*<Swipe*/}
                {/*    onSwipeStart={ onSwipeStart}*/}
                {/*    onSwipeMove={ onSwipeMove}*/}
                {/*    onSwipeEnd={ onSwipeEnd}>*/}
                    <div className='swiperdiv'  onTouchStart ={onSwipeStart} onMouseUp={onSwipeStart} >
                        <button className='btn btn-danger border-2'>submit </button>
                        <button className='btn btn-success border-3 me-2'>purche </button>

                    </div>

                {/*</Swipe>*/}



            </header>
            <VideoApp/>
        </div>
    );
};

export default SwipeUp;