import * as AWS from 'aws-sdk';

AWS.config.update({ region: process.env.AWS_REGION, accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });
console.log("AWS_REGION-->>>", process.env.AWS_REGION);
export default AWS;