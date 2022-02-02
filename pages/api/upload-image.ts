import aws from 'aws-sdk';

export default async function handler(req, res) {
  try {
    const s3 = new aws.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
      endpoint: 'https://storage.yandexcloud.net',
    });

    aws.config.update({
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_KEY,
      region: process.env.AWS_REGION,
      signatureVersion: 'v4',
    });

    const post = await s3.getSignedUrlPromise('putObject', {
      // Expires: 60, // seconds
      Bucket: process.env.AWS_S3_BUCKET_NAME,
      // Fields: {
      //   key: req.query.file,
      // },
      Key: req.query.file,
      // Conditions: [
      //   ['content-length-range', 0, 5048576], // up to 1 MB
      // ],
    });
    console.log(encodeURIComponent(req.query.file));

    console.log(post);

    return res.status(200).json(post);
  } catch (error) {
    console.log(error);
  }
}
