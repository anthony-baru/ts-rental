import * as AWS from 'aws-sdk';

AWS.config.update({ region: 'eu-west-1', accessKeyId: process.env.AWS_ACCESS_KEY_ID, secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY });

export default AWS;