import React, {useState, useEffect} from 'react';
import QrReader from 'react-qr-scanner'
const QrCodeScan = (props) => {
    const [scan, setScan] = useState(false);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    const handleError=(error)=>{
        console.log(error)
    }
     const  handleScan=(data)=>{
        if (data){
            setScan(false)
        }
        console.log(data)
    }
    const previewStyle = {
        height: 240,
        width: 320,
    }
    return (

            <div>
                <button className='btn btn-dark' onClick={()=>{setScan(true)}}>scanQrCode</button>
                {
                    scan&&<QrReader
                        delay={100}
                        style={previewStyle}
                        onError={ handleError}
                        onScan={ handleScan}
                    />
                }

            </div>


    );
};

export default QrCodeScan;