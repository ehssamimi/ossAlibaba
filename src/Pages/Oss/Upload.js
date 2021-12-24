
const OSS = require('ali-oss');
// const accessKeyId = 'LTAI5tSQooLRB9eQXncVQ8wr';
// const accessKeySecret = 'nAUj9B0ov1CZn0I1DS6qRsP9uW26m2';
// const endpoint = 'oss-cn-shanghai.aliyuncs.com';
// const bucket = 'ashoss';
const accessKeyId = ' ';
const accessKeySecret = ' ';
const endpoint = ' ';
const bucket = ' ';

const configuration = {
  maxRetryCount: 3,
  timeoutIntervalForRequest: 30,
  timeoutIntervalForResource: 24 * 60 * 60,
};

const Upload = async (dispatch, data, state, type) => {

    try {
      console.log("try upload ...")
      const objectkey = "admin" +  '/' + type + '/' + data.name;

      var client = new OSS({
        accessKeyId ,
        accessKeySecret ,
        bucket ,
        endpoint,
        configuration
      });
      console.log(client)
      console.log(data)
      var x= await client.multipartUpload(objectkey, data )
      console.log("X")
      console.log(x)
    } catch (err) {
      console.log(err, 'upload error');

    }


};

export default Upload;


// const OSS = require('ali-oss');
//
// const client = new OSS({
//   // Set yourRegion to the endpoint of the region in which the bucket is located. For example, if your bucket is located in the China (Hangzhou) region, set yourRegion to oss-cn-hangzhou.
//   region: 'yourRegion',
//   // Specify the temporary AccessKey pair obtained from STS.
//   accessKeyId: 'yourAccessKeyId',
//   accessKeySecret: 'yourAccessKeySecret',
//   // Specify the security token obtained from STS.
//   stsToken: 'yourSecurityToken',
//   // Specify the bucket name.
//   bucket: 'examplebucket'
// });
//
// // Select the local file from the drop-down list. Example: <input type="file" id="file" />.
// const data = document.getElementById('file').files[0];
// // Create and specify the Blob data.
// //const data = new Blob('Hello OSS');
// // Create and specify the content of the OSS buffer.
// //const data = new OSS.Buffer('Hello OSS');
//
// async function putObject () {
//   try {
//     // Specify the full path of the object. The full path of the object cannot contain bucket names.
//     // You can customize an object name such as exampleobject.txt to upload the data to the current bucket. You can also customize a directory named exampledir/exampleobject.txt to upload the data to the specified directory in the bucket.
//     // You can set the data to file objects, Blob data, or OSS buffers.
//     const result = await client.put('exampledir/exampleobject.txt', data);
//     console.log(result);
//   } catch (e) {
//     console.log(e);
//   }
// }
// putObject();

