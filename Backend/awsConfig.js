const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
require("dotenv").config(); // Cargar variables de entorno desde el archivo .env

// Imprimir las variables de entorno para verificar que se están cargando
console.log("AWS_ACCESS_KEY_ID:", process.env.AWS_ACCESS_KEY_ID);
console.log("AWS_SECRET_ACCESS_KEY:", process.env.AWS_SECRET_ACCESS_KEY);
console.log("AWS_REGION:", process.env.AWS_REGION);
console.log("AWS_BUCKET_NAME:", process.env.AWS_BUCKET_NAME);

// Verificar que las variables de entorno estén definidas
if (
  !process.env.AWS_ACCESS_KEY_ID ||
  !process.env.AWS_SECRET_ACCESS_KEY ||
  !process.env.AWS_REGION ||
  !process.env.AWS_BUCKET_NAME
) {
  throw new Error(
    "Las variables de entorno AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, AWS_REGION y AWS_BUCKET_NAME son requeridas"
  );
}

// Configurar AWS SDK
aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
});

const s3 = new aws.S3();

// Configurar multer-s3 para el almacenamiento de imágenes en S3 con SSE-S3
const upload = multer({
  storage: multerS3({
    s3: s3,
    bucket: process.env.AWS_BUCKET_NAME,
    acl: "public-read",
    key: function (req, file, cb) {
      cb(null, Date.now().toString() + path.extname(file.originalname));
    },
    serverSideEncryption: "AES256",
  }),
});

module.exports = upload;
