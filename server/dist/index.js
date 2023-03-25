"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
require("express-async-errors");
// CLOUDINARY
const cloudinary_1 = __importDefault(require("cloudinary"));
cloudinary_1.default.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
});
// MULTER
const multer_1 = __importDefault(require("multer"));
const storage = multer_1.default.memoryStorage();
const upload = (0, multer_1.default)({ storage });
const app = (0, express_1.default)();
const port = Number(process.env.PORT) || 5000;
// DB
const connectDB_1 = require("./db/connectDB");
// Router
const imageRouter_1 = require("./routers/imageRouter");
const productRouter_1 = require("./routers/productRouter");
// MIDDLEWARE
app.use(express_1.default.json());
app.use("/api/v1/upload", upload.single("image"), imageRouter_1.router);
app.use("/api/v1/product", productRouter_1.router);
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield (0, connectDB_1.connectDB)(process.env.MONGO_URI);
        app.listen(port, () => console.log(`Server is listening on port: ${port}`));
    }
    catch (error) {
        console.log(error);
    }
});
start();
