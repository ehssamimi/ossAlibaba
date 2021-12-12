// import logo from './logo.svg';
import './App.css';
import './assets/css/bootstrap5.min.css';
import React from "react";
import {Route , Switch} from "react-router-dom";
import SwipeUp from "./component/SwipeUp/SwipeUp";
import WithOneAction from "./Pages/SwipeList/SwipeList";
// import AmpReact from "./Pages/Map/AmpReact";
// import Map2 from "./Pages/Map/Map2";
// import MApJs from "./Pages/Map/MApJS";
// import GLCustomLayer from "./Pages/Map/GLCustomLayer";
// import Amap from "./Pages/Map/Map";

import QrCodeScan from "./Pages/QrCodeScan/QrCodeScan";
import MapMarker from "./Pages/Map/MapMarker";
import DataPickers from "./Pages/DataPickers/DataPickers";
import Oss from "./Pages/Oss/Oss";
import SamOss from "./Pages/Oss/SamOss";
const Marker=()=>{
    return(
        <div className='  marker__body'>
            <img src="./assets/img/iconsTransparent/active-type-1.png" alt="active-type-1.png"/>
            <span  >1.5MT</span>
        </div>
    )
}
function App(props) {
  return (
      <Switch>
          <Route exact path="/" {...props}><Oss/></Route>
          {/*<Route path="/map" {...props}><Amap/></Route>*/}
          {/*<Route path="/map" {...props}><AmpReact/></Route>*/}
          {/*<Route path="/map" {...props}><MApJs/></Route>*/}
          {/*<Route path="/map" {...props}><GLCustomLayer/></Route>*/}
          <Route path="/map" {...props}><MapMarker marker={<Marker/>} /></Route>
          <Route path="/qrcode" {...props}><QrCodeScan/></Route>
          <Route path="/swipe-list" {...props}><WithOneAction/></Route>
          <Route path="/data-picker" {...props}><DataPickers/></Route>
          <Route path="/oss"  {...props}><Oss/></Route>
          {/*<Route path="/oss"  {...props}><SamOss/></Route>*/}
          <Route path="/blog/:slug"  {...props}><SwipeUp/></Route>
      </Switch>
   );
}

export default App;
