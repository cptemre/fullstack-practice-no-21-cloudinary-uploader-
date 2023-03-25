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
exports.deleteImage = exports.uploadImage = void 0;
const Image_1 = require("../models/Image");
const cloudinary_1 = __importDefault(require("cloudinary"));
const streamifier_1 = __importDefault(require("streamifier"));
const uploadImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.file) {
        return res.status(400).json({ message: "No file uploaded" });
    }
    const buffer = req.file.buffer;
    const result = cloudinary_1.default.v2.uploader.upload_stream({
        use_filename: true,
        folder: "file-upload",
    }, function (error, result) {
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
    });
    streamifier_1.default.createReadStream(buffer).pipe(result);
});
exports.uploadImage = uploadImage;
const deleteImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const public_id = req.params.public_id;
    console.log(public_id);
    try {
        yield cloudinary_1.default.v2.uploader.destroy("file-upload/" + public_id);
        yield Image_1.ImageModel.deleteOne({
            public_id: "file-upload/" + public_id,
        });
        res.json({ message: "Image deleted successfully" });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to delete image" });
    }
});
exports.deleteImage = deleteImage;
