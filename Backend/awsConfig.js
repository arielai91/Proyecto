const {
  S3Client,
  DeleteObjectCommand,
  GetObjectCommand,
} = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require("dotenv").config();

class AwsConfig {
  constructor() {
    this.s3 = new S3Client({
      region: process.env.AWS_REGION,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    });

    this.upload = multer({
      storage: multerS3({
        s3: this.s3,
        bucket: process.env.AWS_BUCKET_NAME,
        acl: "public-read",
        key: function (req, file, cb) {
          cb(null, Date.now().toString() + path.extname(file.originalname));
        },
        serverSideEncryption: "AES256",
      }),
      limits: { fileSize: 5 * 1024 * 1024 },
    });
  }

  getUploadMiddleware() {
    return this.upload;
  }

  async getImageUrl(key) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
    };
    const command = new GetObjectCommand(params);
    const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
    return url;
  }
}

module.exports = new AwsConfig();
