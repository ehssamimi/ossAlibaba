import React, {useState, useEffect} from 'react';
import { Client, put, get } from 'ali-oss-sdk'

const accessKeyId = 'LTAI5tSQooLRB9eQXncVQ8wr';
const accessKeySecret = 'nAUj9B0ov1CZn0I1DS6qRsP9uW26m2';
const endpoint = 'oss-cn-shanghai.aliyuncs.com';
const bucket = 'ashoss';
const config = {
    accessKeyId: accessKeyId,
    accessKeySecret: accessKeySecret,
    endpoint,
    bucket:bucket,
    region: 'oss-cn-hangzhou'
}

const SamOss = (props) => {
    // const [count, setCount] = useState(1);
    useEffect(() => {
        // Update the document title using the browser API
        // return //for componentDidMount
    }, []);
    const handelGetData=(e)=>{


        const client = new Client(config);
        // Client.use(put, get);
        const uploadName = 'test.txt'
        const file =   e.target.files[0];

        client.put(uploadName, file).then(
            client.get(uploadName).then(res => {
                console.log(res.content.toString)

            })
        )
    }

    return (
        <div>
            <h1>Oss</h1>
            <div className='mt-2'>
                <input type='file' onChange={handelGetData}/>

            </div>
        </div>
    );
};

export default SamOss;