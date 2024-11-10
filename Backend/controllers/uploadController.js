const AwsConfig = require("../awsConfig");
const { DeleteObjectCommand } = require("@aws-sdk/client-s3");

class UploadController {
  async uploadImage(req, res) {
    try {
      res
        .status(200)
        .json({ message: "Imagen subida exitosamente", file: req.file });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getImage(req, res) {
    try {
      const url = await AwsConfig.getImageUrl(req.params.key);
      res.status(200).json({ url });
    } catch (error) {
      res.status(500).json({ error: error.message });
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

  async updateImage(req, res) {
    const deleteParams = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: req.params.key,
    };
    try {
      await AwsConfig.s3.send(new DeleteObjectCommand(deleteParams));
      AwsConfig.getUploadMiddleware().single("file")(req, res, (err) => {
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
}

module.exports = UploadController;
