import React, { useEffect, useState } from "react";
 import { Map, MouseTool , Marker } from "react-amap";
 import  "./../../assets/css/Amap.css";
import ReactSwipeButton from 'react-swipe-button'

const layerStyle = {
    padding: "10px",
    background: "#fff",
    border: "1px solid #ddd",
    borderRadius: "4px",
    position: "absolute",
    top: "10px",
    left: "10px",
};

const Amap = (props,{ mapData : pushMapData }) => {
    const [states, setStates] = useState({});
    const [tool, setTool] = useState();
    const [position , setPosition] = useState({});
    useEffect(() => {

        setPosition(props.datas)
        setStates({
            map: {
                lat: 0,
                long: 0,
            },
            what: "点击下方按钮开始绘制",
        });
    }, []);

    const toolEvents = {
        created: (tool) => {
            setTool(tool);
        },
        draw(data) {
            let { obj }=data
            console.log(data)
            console.log(obj)
            const map = {
                latitude: obj.getPosition().lat,
                longitude: obj.getPosition().lng,
            };
            let mapDataJson = JSON.stringify(map);
            pushMapData(mapDataJson);
            drawWhat(obj);
        },
    };

    function drawWhat(obj) {
        let text = "";
        switch (obj.CLASS_NAME) {
            case "AMap.Marker":
                text = `你绘制了一个标记，坐标位置是 {${obj.getPosition()}}`;
                break;

            default:
                text = "";
        }
        setStates({
            what: text,
        });
    }

    function drawMarker() {
        if (tool) {
            tool.marker();
            setStates({
                what: "准备绘制坐标点",
            });
        }
    }

    function close() {
        if (tool) {
            tool.close();
        }
        setStates({
            what: "关闭了鼠标工具",
        });
    }
    const renderMarker=(data)=>{
        return (
            <div key={data?.id} className="marker__container">
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
    }

    const mapPlugins = ["ToolBar"];
    const mapCenter = { longitude: 120, latitude: 45 };

    return (
        <div>
            <div style={{ width: "100%", height: 370 }}>
                <Map
                    amapkey={"styles/afdd93fc70e330480ae6a54d3d8d4e79"}
                    plugins={mapPlugins}
                    center={mapCenter}
                    setMapStyle={"styles/afdd93fc70e330480ae6a54d3d8d4e79"}
                >
                    <Marker position={position}
                            render={ renderMarker}



                    />
                    <MouseTool events={toolEvents} />
                    <div style={layerStyle}>{states.what}</div>
                </Map>
            </div>
            <div className="col s12" style={{ marginTop: 20 }}>
                <button
                    className="btn waves-effect blue darken-4"
                    style={{ textTransform: "unset" }}
                    onClick={() => {
                        drawMarker();
                    }}
                >
                    Draw Marker
                </button>
                <button
                    style={{ marginLeft: 20, textTransform: "unset" }}
                    className="btn waves-effect red darken-4"
                    onClick={() => {
                        close();
                    }}
                >
                    Close Draw Marker
                </button>
            </div>
            <ReactSwipeButton
                text='SWIPE TO UNLOCK'
                color='#f00'
                onSuccess={()=>{console.log("success")}}
            />

        </div>

    );
};

export default Amap;
