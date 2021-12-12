/* eslint-disable react-hooks/exhaustive-deps */

import React, { useEffect, useState } from "react";
// import "./styles.css";
import  "./../../assets/css/Amap.css";
import { Amap, useAmap } from "@amap/amap-react";
import createREGL from "regl";

function GLCustomLayer(props) {
    const { points } = props;
    const map = useAmap();

    useEffect(() => {
        if (!map) return;
        if (!points || points.length === 0) return;
        // regl的渲染函数需要指定数组长度
        // 所以当数据变化时重建图层
        const { customCoords } = map;
        const data = customCoords.lngLatsToCoords(points);
        let regl = null;
        let draw = null;
            var map2 =new window.AMap.Map("container", {
    resizeEnable: true,
    center: [116.397428, 39.90923],//地图中心点
    zoom: 13 //地图显示的缩放级别
});
            var driving =new window.AMap.Driving({
    map: map2,
    panel: "panel"
});
            driving.search(new window.AMap.LngLat(116.379028, 39.865042), new window.AMap.LngLat(116.427281, 39.903719), function(status, result) {
    // result 即是对应的驾车导航信息，相关数据结构文档请参考  https://lbs.amap.com/api/javascript-api/reference/route-search#m_DrivingResult
    if (status === 'complete') {
    console.log('绘制驾车路线完成')
} else {
        console.log('获取驾车数据失败：' + result)
}
});
        const layer = new window.AMap.GLCustomLayer({
            // 图层的层级
            zIndex: 10,
            // 初始化的操作，创建图层过程中执行一次。
            init: (gl) => {
                regl = createREGL({
                    gl
                });
                draw = regl({
                    frag: fs,
                    vert: vs,
                    depth: { enable: false },
                    blend: {
                        enable: true,
                        func: regl.prop("blend")
                    },
                    attributes: {
                        position: regl.buffer(data)
                    },
                    primitive: "points",
                    uniforms: {
                        color: [0.2, 0.4, 0.7, 1],
                        mvp: regl.prop("mvp"),
                        zoom: regl.prop("zoom")
                    },
                    count: data.length
                });
            },
            render: () => {
                // 这里必须执行！！重新设置 three 的 gl 上下文状态。
                regl._refresh();
                draw({
                    mvp: customCoords.getMVPMatrix(),
                    zoom: map.getZoom(),
                    blend: {
                        srcRGB: "src alpha",
                        srcAlpha: 1,
                        dstRGB: "one minus src alpha",
                        dstAlpha: 1
                    }
                });
            }
        });
        map.add(layer);
        return () => {
            map.remove(layer);
        };
    }, [points, map]);

    return null;
}

export default function App() {
    const [points, setPoints] = useState([]);

    useEffect(() => {
        loadData().then((points) => {
            setPoints(points.map((p) => p.lnglat));
        });
    }, []);

    return (
        <div className="App">
            <div className="map-container">
                <Amap
                    zoom={4}
                    center={[103, 36]}
                    viewMode="3D"
                    pitch={50}
                    mapStyle="amap://styles/whitesmoke"
                >
                    <GLCustomLayer points={points} />

                </Amap>

                <div id="container"></div>
                <div id="panel"></div>
            </div>
        </div>
    );
}

function loadData() {
    return new Promise((resolve) => {
        const tag = document.createElement("script");
        tag.onload = () => {
            resolve(window.points);
        };
        tag.src = "https://a.amap.com/jsapi_demos/static/china.js";
        document.head.appendChild(tag);
    });
}

const fs = `
precision mediump float;
uniform vec4 color;
varying float vRadius;

void main() {
    gl_FragColor = color;

    float R = vRadius;
    float r = distance(gl_PointCoord, vec2(0.5, 0.5)) * 2.0 * R;
    float taaRadius = 2.0;
    if(r > R) {
      discard;
    } else if(r > R - taaRadius) {
      gl_FragColor = color;
      float opa = smoothstep(1.0, 0.0, (r - (R - taaRadius)) / taaRadius);
      gl_FragColor.a *= opa;
    }
}`;

const vs = `
precision mediump float;
attribute vec2 position;
uniform mat4 mvp;
uniform float zoom;
varying float vRadius;

void main() {
    gl_Position = mvp * vec4(position, 0, 1);
    vRadius = mix(2.0, 30.0, pow(zoom / 20., 2.));
    gl_PointSize = vRadius * 2.;
}`;
