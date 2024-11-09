const { GetObjectCommand, DeleteObjectCommand } = require("@aws-sdk/client-s3");
const AwsConfig = require("../awsConfig");

class UploadController {
  async uploadImage(req, res) {
    AwsConfig.getUploadMiddleware().single("image")(req, res, (err) => {
      if (err) {
        return res.status(500).json({ error: err.message });
      }
      res.status(200).json({
        message: "Imagen cargada exitosamente",
        location: req.file.location,
      });
    });
  }

  async getImage(req, res) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    };
    try {
      const data = await AwsConfig.s3.send(new GetObjectCommand(params));
      res.writeHead(200, { "Content-Type": data.ContentType });
      data.Body.pipe(res);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async updateImage(req, res) {
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    };
    try {
      await AwsConfig.s3.send(new DeleteObjectCommand(deleteParams));
      AwsConfig.getUploadMiddleware().single("image")(req, res, (err) => {
        if (err) {
          return res.status(500).json({ error: err.message });
        }
        res.status(200).json({
          message: "Imagen actualizada exitosamente",
          location: req.file.location,
        });
      });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }

  async deleteImage(req, res) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    };
    try {
      await AwsConfig.s3.send(new DeleteObjectCommand(params));
      res.status(200).json({ message: "Imagen eliminada exitosamente" });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
}

module.exports = UploadController;
