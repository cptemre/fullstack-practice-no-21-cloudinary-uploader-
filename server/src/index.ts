import express from "express";
import dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
// CLOUDINARY
import cloudinary from "cloudinary";
interface Cloudinary {
  cloud_name: string;
  api_key: string;
  api_secret: string;
}
cloudinary.v2.config(<Cloudinary>{
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});
// MULTER
import multer from "multer";

const storage = multer.memoryStorage();
const upload = multer({ storage });

const app = express();
const port = Number(process.env.PORT) || 5000;
// DB
import { connectDB } from "./db/connectDB";
// Router
import { router as imageRouter } from "./routers/imageRouter";
import { router as productRouter } from "./routers/productRouter";

// MIDDLEWARE
app.use(express.json());

app.use("/api/v1/upload", upload.single("image"), imageRouter);
app.use("/api/v1/product", productRouter);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI as string);
    app.listen(port, () => console.log(`Server is listening on port: ${port}`));
  } catch (error) {
    console.log(error);
  }
};
start();
