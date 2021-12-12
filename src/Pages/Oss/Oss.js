import React, {useState, useEffect} from 'react';
import Upload from "./Upload";
// const OSS = require('ali-oss');
import OSS from 'ali-oss'
const path = require("path");
const accessKeyId = 'LTAI5tSQooLRB9eQXncVQ8wr';
const accessKeySecret = 'nAUj9B0ov1CZn0I1DS6qRsP9uW26m2';
const endpoint = 'oss-cn-shanghai.aliyuncs.com';
const bucket = 'ashoss';


// const AccessKey = 'LTAI5tSQooLRB9eQXncVQ8wr';
// const SecretKey = 'nAUj9B0ov1CZn0I1DS6qRsP9uW26m2';
// const endPoint = 'oss-cn-shanghai.aliyuncs.com';
// const bucketname = 'ashoss';
//
// const configuration = {
//     maxRetryCount: 3,
//     timeoutIntervalForRequest: 30,
//     timeoutIntervalForResource: 24  60  60,
// };

const configuration = {
    maxRetryCount: 3,
    timeoutIntervalForRequest: 30,
    timeoutIntervalForResource: 24 * 60 * 60,
};





const Oss = (props) => {
    const [data, setData] = useState(1);
    const  client = new OSS({
        accessKeyId ,
        accessKeySecret ,
        bucket ,
        endpoint,
        configuration
    });
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    const handelbuffer=async (e)=>{
        const objectkey = "driver" +  '/' + 'v' + '/' + e.target.files[0].name;
        const data = e.target.files[0];
        async function putBuffer () {
            try {

                let result = await client.put('object-name', new Buffer('hello world'));
                console.log(result);
            } catch (e) {
                console.log(e);
            }
        }

        putBuffer();

    }
    const Handelput=async (e)=>{

        const objectkey = "driver" +  '/' + 'v' + '/' + e.target.files[0].name;
        const data = e.target.files[0];

        async function putObject () {
            try {
                // Specify the full path of the object. The full path of the object cannot contain bucket names.
                // You can customize an object name such as exampleobject.txt to upload the data to the current bucket. You can also customize a directory named exampledir/exampleobject.txt to upload the data to the specified directory in the bucket.
                // You can set the data to file objects, Blob data, or OSS buffers.
                const result = await client.put(objectkey, data);
                // const result = await client.multipartUpload(objectkey, data );
                console.log(result);
            } catch (e) {
                // console.log("eeeerpppp");
                console.log(e);
                console.log(e.response );
                // console.log(e.response?.data );
                // console.log(e.response?.data?.message);
            }
        }
        putObject();
    }
    const handelmultipartUpload=async (e)=>{

        const objectkey = "driver" +  '/' + 'v' + '/' + e.target.files[0].name;

        const data = e.target.files[0];

        async function putObject () {
            try {
                // Specify the full path of the object. The full path of the object cannot contain bucket names.
                // You can customize an object name such as exampleobject.txt to upload the data to the current bucket. You can also customize a directory named exampledir/exampleobject.txt to upload the data to the specified directory in the bucket.
                // You can set the data to file objects, Blob data, or OSS buffers.
                // const result = await client.put(objectkey,  Buffer.from(data));
                const result = await client.multipartUpload(objectkey, data );
                console.log(result);
            } catch (e) {
                // console.log("eeeerpppp");
                console.log(e);
                console.log(e.response );
                // console.log(e.response?.data );
                // console.log(e.response?.data?.message);
            }
        }
        putObject();
    }



    // const up = await Upload('', e.target.files[0], '', 'test');
    //     console.log(up)
    // }

    return (
        <div className='row m-0'>
            <div className='col-12 col-md-6 mt-3'>
                <h1>put</h1>

                <div className='mt-2'>
                    <input type='file' onChange={Handelput}/>

                </div>
            </div>
            <div className='col-12 col-md-6 mt-3'>
                <h1>multipartUpload</h1>

                <div className='mt-2'>
                    <input type='file' onChange={handelmultipartUpload}/>

                </div>
            </div>
            <div className='col-12 col-md-6 mt-3'>
                <h1>buffer</h1>

                <div className='mt-2'>
                    <input type='file' onChange={handelbuffer}/>

                </div>
            </div>



        </div>
    );
};

export default Oss;