import React, { useState, useRef, useEffect, useCallback } from "react";
import  "./../../assets/css/Amap.css";
import { Amap, Marker, Polyline, usePlugins, } from "@amap/amap-react";
import { config as AmapConfig } from "@amap/amap-react";
AmapConfig.key = "styles/afdd93fc70e330480ae6a54d3d8d4e79";

var geocoder = require('geocoder');
const LINE_ARR = [
    [116.478935, 39.997761],
    // [116.478939, 39.997825],
    // [116.478912, 39.998549],
    // [116.478912, 39.998549],
    // [116.478998, 39.998555],
    // [116.478998, 39.998555],
    // [116.479282, 39.99856],
    // [116.479658, 39.998528],
    // [116.480151, 39.998453],
    [116.480784, 39.998302],
    // [116.480784, 39.998302],
    // [116.481149, 39.998184],
    // [116.481573, 39.997997],
    // [116.481863, 39.997846],
    // [116.482072, 39.997718],
    // [116.482362, 39.997718],
    // [116.483633, 39.998935],
    // [116.48367, 39.998968],
    [116.484648, 39.999861]
];

const AmpReact = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    useStyle()
    const $marker = useRef(undefined);
    const [position, setPosition] = useState([116.478935, 39.997761]);
    const [customPosition, setcustomPosition] = useState(null);
    const [angle, setAngle] = useState(0);
    const [passedPath, setPassedPath] = useState([]);

    usePlugins("AMap.MoveAnimation");

    const startAnim = useCallback(() => {
        const marker = $marker.current;
        if (!marker) return;
        marker.moveAlong(LINE_ARR, {
            // 每一段的时长
            duration: 200,
            // JSAPI2.0 是否延道路自动设置角度在 moveAlong 里设置
            autoRotation: true
        });
    }, []);
    const pauseAnim = useCallback(() => {
        const marker = $marker.current;
        if (!marker) return;
        marker.pauseMove();
    });
    const resumeAnim = useCallback(() => {
        const marker = $marker.current;
        if (!marker) return;
        marker.resumeMove();
    });
    const stopAnim = useCallback(() => {
        const marker = $marker.current;
        if (!marker) return;
        marker.stopMove();
    });

//     var map = new AMap.Map("container", {
//         resizeEnable: true,
//         center: [116.397428, 39.90923],//地图中心点
//         zoom: 13 //地图显示的缩放级别
//     });
//
// //构造路线导航类
// var driving = new AMap.Driving({
//     map: map,
//     panel: "panel"
// });
// // 根据起终点经纬度规划驾车导航路线
// driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function(status, result) {
//     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
//     if (status === 'complete') {

    return (
        <div className="App">
            <div className="map-container">
                <Amap
                    onClick={(m, s) => {
                        console.log(s)
                        console.log(m)
                        // console.log(s.lnglat.lat,s.lnglat.lng )
                        console.log([s.lnglat.lat,s.lnglat.lng])
                        setcustomPosition([s.lnglat.lng,s.lnglat.lat])
                        // getAddress(s.lnglat.lat, s.lnglat.lng).then(resp=>console.log(resp)).catch(console.error);
                        // fetchLocationName(s.lnglat.lat, s.lnglat.lng).then(resp=>console.log(resp)).catch(console.error);
                        var API = { key : "AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU"};
                        geocoder.reverseGeocode( 33.7489, -84.3789, function ( err, data ) {
                            console.log(data)
                            // do something with data
                        }, API );
                        // const lnglat = m.getPosition();
                        // setPosition([lnglat.getLng(), lnglat.getLat()]);
                    }}


                    zoom={17}
                    onComplete={(map) => {
                        map.setFitView();
                    }}
                >
                    <Polyline
                        path={LINE_ARR}
                        showDir
                        strokeColor="#28F" //线颜色
                        strokeWeight={8} //线宽
                    />

                    {passedPath.length > 0 && (
                        <Polyline
                            path={passedPath}
                            strokeColor="#AF5" //线颜色
                            strokeWeight={8} //线宽
                        />
                    )}

                    <Marker
                        ref={$marker}
                        position={position}
                        autoRotation
                        angle={angle}
                        anchor="center"

                        onMoving={(marker, e) => {
                            setPassedPath(e.passedPath);
                            const p = marker.getPosition();
                            setPosition([p.getLng(), p.getLat()]);
                            setAngle(marker.getAngle());
                        }}
                    >
                        <img
                            src="https://a.amap.com/jsapi_demos/static/demo-center-v2/car.png"
                            alt="car"
                        />
                    </Marker>

                    {customPosition&&
                    <Marker

                        position={customPosition}
                        anchor="center"

                    >
                        <div   className="marker__container">
                            <div className="marker__arrow" />
                            <div className='  marker__body'>
                                <img src="./assets/img/iconsTransparent/active-type-1.png" alt="active-type-1.png"/>
                                <span  >1.5MT</span>

                            </div>
                            {/*<img*/}
                            {/*    alt=""*/}
                            {/*    className="marker__image"*/}
                            {/*    src="https://image.zuiidea.com/photo-1522962506050-a2f0267e4895.jpeg?imageView2/1/w/200/h/200/format/webp/q/75|imageslim"*/}
                            {/*/>*/}
                        </div>)
                    </Marker>

                    }
                </Amap>

                <div className="input-card">
                    <h4>轨迹回放控制</h4>
                    <div className="input-item">
                        <input
                            type="button"
                            className="btn"
                            value="开始动画"
                            onClick={startAnim}
                        />
                        <input
                            type="button"
                            className="btn"
                            value="暂停动画"
                            onClick={pauseAnim}
                        />
                    </div>
                    <div className="input-item">
                        <input
                            type="button"
                            className="btn"
                            value="继续动画"
                            onClick={resumeAnim}
                        />
                        <input
                            type="button"
                            className="btn"
                            value="停止动画"
                            onClick={stopAnim}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AmpReact;

function useStyle() {
    useEffect(() => {
        const tag = document.createElement("link");
        tag.setAttribute("rel", "stylesheet");
        tag.setAttribute(
            "href",
            "https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css"
        );
        document.head.appendChild(tag);

        return () => {
            document.head.removeChild(tag);
        };
    }, []);
}
// function getAddress (latitude, longitude) {
//     return new Promise(function (resolve, reject) {
//         var request = new XMLHttpRequest();
//
//         var method = 'GET';
//
//         // json?key={google_api_key}&address={YOUR-ADDRESS}
//         // https://maps.googleapis.com/maps/api/js?key=AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU&v=3.exp&libraries=geometry,drawing,places
//         var url = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + ',' + longitude + '&sensor=true&key=AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU';
//         var async = true;
//
//         request.open(method, url, async);
//         request.onreadystatechange = function () {
//             if (request.readyState == 4) {
//                 if (request.status == 200) {
//                     var data = JSON.parse(request.responseText);
//                     var address = data.results[0];
//                     console.log("address")
//                     console.log(address)
//                     resolve(address);
//                 }
//                 else {
//                     reject(request.status);
//                 }
//             }
//         };
//         request.send();
//     });
// };

const fetchLocationName = async (lat,lng) => {
    await fetch(
        'https://www.mapquestapi.com/geocoding/v1/reverse?key=AIzaSyCO8MfadmlotuuHC8wmjwL_46I5QAMIiRU&location='+lat+'%2C'+lng+'&outFormat=json&thumbMaps=false',
    )
        .then((response) => response.json())
        .then((responseJson) => {
            console.log(
                'ADDRESS GEOCODE is BACK!! => ' + JSON.stringify(responseJson),
            );
        });
};