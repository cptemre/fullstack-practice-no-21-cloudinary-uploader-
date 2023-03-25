import { ImageModel } from "../models/Image";
import { Request, Response } from "express";
import cloudinary, {
  UploadApiResponse,
  UploadApiErrorResponse,
} from "cloudinary";
import streamifier from "streamifier";

const uploadImage = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ message: "No file uploaded" });
  }
  const buffer = req.file.buffer;

  const result = cloudinary.v2.uploader.upload_stream(
    {
      use_filename: true,
      folder: "file-upload",
    },
    function (error?: UploadApiErrorResponse, result?: UploadApiResponse) {
      if (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to upload image" });
      }
      if (result) {
        console.log(result);
        res.json({
          secure_url: result.secure_url,
          public_id: result.public_id,
        });
      }
    }
  );
  streamifier.createReadStream(buffer).pipe(result);
};

const deleteImage = async (req: Request, res: Response) => {
  const public_id = req.params.public_id;
  console.log(public_id);

  interface Delete {
    public_id: string;
  }
  try {
    await cloudinary.v2.uploader.destroy("file-upload/" + public_id);
    await ImageModel.deleteOne(<Delete>{
      public_id: "file-upload/" + public_id,
    });
    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete image" });
  }
};

export { uploadImage, deleteImage };
