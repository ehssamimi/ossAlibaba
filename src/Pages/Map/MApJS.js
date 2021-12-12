import React, {useState, useEffect} from 'react';
import {config as AmapConfig} from "@amap/amap-react/lib";
 import  "./../../assets/css/Amap.css";
// import {AMapJS} from 'amap-js';
import { AMapLoader, AMapUILoader, LocaLoader, } from 'amap-js';
const  AMapJS = require('amap-js');

// </style>
// <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css" />
// <script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
// <script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=您申请的key值&plugin=AMap.Driving"></script>
// <script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>
// </head>
// <body>
//
AmapConfig.key = "styles/afdd93fc70e330480ae6a54d3d8d4e79"
AmapConfig.key = "8faf092bfa96e5b6748ea7e0a2d6ac9c"

const MApJs = (props) => {
    useStyle('https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css')
    // useScript('https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js')
    //
    // // useScript('https://webapi.amap.com/maps?v=2.0&key=8faf092bfa96e5b6748ea7e0a2d6ac9c&plugin=AMap.Driving')
    // // useScript('https://webapi.amap.com/maps?v=2.0&key=styles/afdd93fc70e330480ae6a54d3d8d4e79&plugin=AMap.Driving')
    // useScript2()
    useScript('https://cache.amap.com/lbs/static/addToolbar.js')
    // const [count, setCount] = useState(1);

    useEffect(() => {
        const  loader  =  new  AMapJS.AMapLoader ( {
            key : '8faf092bfa96e5b6748ea7e0a2d6ac9c' ,
            version : '2.0' ,
            plugins : [ ] ,
        } ) ;
        loader
            . load ( )
            . then ( ( )  =>  {
                console.log("load compelete")
                // Load completed
                var map =new AMapJS.Map("container", {
                    resizeEnable: true,
                    center: [116.397428, 39.90923],//地图中心点
                    zoom: 13 //地图显示的缩放级别
                });
                //构造路线导航类
                var driving =new AMapJS.Driving({
                    map: map,
                    panel: "panel"
                });
                // 根据起终点经纬度规划驾车导航路线
                driving.search(new  AMapJS.LngLat(116.379028, 39.865042), new  AMapJS.LngLat(116.427281, 39.903719), function(status, result) {
                    // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                    if (status === 'complete') {
                        console.log('绘制驾车路线完成')
                    } else {
                        console.log('获取驾车数据失败：' + result)
                    }
                });
                console.log ( AMapJS ) ;
            } )
            . catch ( e  =>  {
                // Load failed
            } ) ;
        // Update the document title using the browser API
        // return //for componentDidMount
        //     //基本地图加载

    }, []);

    return (
        <div>
         <div id="container"></div>
        <div id="panel"></div>
        </div>
    );
};

export default MApJs;
function useStyle(link) {
    useEffect(() => {
        const tag = document.createElement("link");
        tag.setAttribute("rel", "stylesheet");
        tag.setAttribute(
            "href",
            link
        );
        document.head.appendChild(tag);

        return () => {
            document.head.removeChild(tag);
        };
    }, []);
}
function useScript(link) {
    useEffect(() => {
        const tag = document.createElement("script");
        // tag.setAttribute("rel", "stylesheet");
        tag.setAttribute(
            "src",
            link
        );
        document.head.appendChild(tag);

        return () => {
            document.head.removeChild(tag);
        };
    }, []);
}
function useScript2(link) {
    useEffect(() => {

        window.onLoad  = function(){
            var map =new window.AMap.Map("container", {
                resizeEnable: true,
                center: [116.397428, 39.90923],//地图中心点
                zoom: 13 //地图显示的缩放级别
            });
            //构造路线导航类
            var driving =new window.AMap.Driving({
                map: map,
                panel: "panel"
            });
            // 根据起终点经纬度规划驾车导航路线
            driving.search(new window.AMap.LngLat(116.379028, 39.865042), new window.AMap.LngLat(116.427281, 39.903719), function(status, result) {
                // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
                if (status === 'complete') {
                    console.log('绘制驾车路线完成')
                } else {
                    console.log('获取驾车数据失败：' + result)
                }
            });
         }
        var url = 'https://webapi.amap.com/maps?v=2.0&key=8faf092bfa96e5b6748ea7e0a2d6ac9c&plugin=AMap.Driving';
        var jsapi = document.createElement('script');
        jsapi.charset = 'utf-8';
        jsapi.src = url;
        document.head.appendChild(jsapi);

        // const tag = document.createElement("script");
        // // tag.setAttribute("rel", "stylesheet");
        // tag.setAttribute(
        //     "src",
        //     link
        // );
        // document.head.appendChild(tag);

        return () => {
            document.head.appendChild(jsapi);
        };
    }, []);
}


// <!doctype html>
// <html>
// <head>
//     <meta charset="utf-8">
//         <meta http-equiv="X-UA-Compatible" content="IE=edge">
//             <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width">
//                 <title>位置经纬度 + 驾车规划路线</title>
//                 <style type="text/css">
//                     html,
//                     body,
//                     #container {
//                     width: 100%;
//                     height: 100%;
//                 }
//                 </style>
//                 <style type="text/css">
//                     #panel {
//                     position: fixed;
//                     background-color: white;
//                     max-height: 90%;
//                     overflow-y: auto;
//                     top: 10px;
//                     right: 10px;
//                     width: 280px;
//                 }
//                     #panel .amap-call {
//                     background-color: #009cf9;
//                     border-top-left-radius: 4px;
//                     border-top-right-radius: 4px;
//                 }
//                     #panel .amap-lib-driving {
//                     border-bottom-left-radius: 4px;
//                     border-bottom-right-radius: 4px;
//                     overflow: hidden;
//                 }
//                 </style>
//                 <link rel="stylesheet" href="https://a.amap.com/jsapi_demos/static/demo-center/css/demo-center.css" />
//                 <script src="https://a.amap.com/jsapi_demos/static/demo-center/js/demoutils.js"></script>
//                 <script type="text/javascript" src="https://webapi.amap.com/maps?v=2.0&key=您申请的key值&plugin=AMap.Driving"></script>
//                 <script type="text/javascript" src="https://cache.amap.com/lbs/static/addToolbar.js"></script>
// </head>
// <body>
// <div id="container"></div>
// <div id="panel"></div>
// <script type="text/javascript">
//     //基本地图加载
//     var map = new AMap.Map("container", {
//     resizeEnable: true,
//     center: [116.397428, 39.90923],//地图中心点
//     zoom: 13 //地图显示的缩放级别
// });
//     //构造路线导航类
//     var driving = new AMap.Driving({
//     map: map,
//     panel: "panel"
// });
//     // 根据起终点经纬度规划驾车导航路线
//     driving.search(new AMap.LngLat(116.379028, 39.865042), new AMap.LngLat(116.427281, 39.903719), function(status, result) {
//     // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
//     if (status === 'complete') {
//     log.success('绘制驾车路线完成')
// } else {
//     log.error('获取驾车数据失败：' + result)
// }
// });
// </script>
// </body>
// </html>