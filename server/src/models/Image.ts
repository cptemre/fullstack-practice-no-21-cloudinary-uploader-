import { Schema, model } from "mongoose";

interface ImgInterface {
  name: string;
  image: string;
  public_id: string;
}

const ImageSchema = new Schema<ImgInterface>({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  public_id: { type: String, required: true },
});

export const ImageModel = model<ImgInterface>("Image", ImageSchema);
