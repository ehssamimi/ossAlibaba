import React, {useState, useEffect } from 'react';
import { Amap, Marker  } from "@amap/amap-react";
import  "./../../assets/css/Amap.css";
import {FaMapPin} from "react-icons/all";
const MapMarker = ({InitialPosition,marker}) => {
     const [position, setPosition] = useState(null);
    const [center, setCenter] = useState([116.473179, 39.993169]);
    // InitialPosition={[116.473179, 39.993169]}
    useEffect(() => {
     if(InitialPosition){
         setPosition(InitialPosition);
         setCenter(InitialPosition)
     }
    }, [InitialPosition]);




    return (
        <div className="App">
            <div className="map-container position-relative">
                <Amap
                    onClick={(m, s) => {
                        console.log(s)
                        console.log(m)
                         console.log([s.lnglat.lat,s.lnglat.lng])
                        if (!InitialPosition){
                            setPosition([s.lnglat.lng,s.lnglat.lat]);
                            setCenter([s.lnglat.lng,s.lnglat.lat])
                        }

                    }}
                    center={center}
                    // zoom={17}
                >

                    {position&&
                    <Marker
                        position={position}
                        anchor="center"

                    >

                        <div   className="marker__container">
                            <div className="marker__arrow" />
                            {marker}
                        </div>
                    </Marker>

                    }
                </Amap>
                <div className="w-100 position-absolute bg-white " style={{ marginTop: 20,bottom:0,zIndex:170 }}>
                    <div className='d-flex justify-content-between align-items-center'>
                        <div className='d-flex flex-column'>
                            <p className='mb-0'>pre-transport Quotation</p>
                            <p>jan20th,2022 - 10:34PM </p>
                        </div>
                        <p>view on map <FaMapPin/></p>
                    </div>

                </div>


            </div>
        </div>
    );
};

export default MapMarker;