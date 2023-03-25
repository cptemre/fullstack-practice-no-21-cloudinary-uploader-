"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImageModel = void 0;
const mongoose_1 = require("mongoose");
const ImageSchema = new mongoose_1.Schema({
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
exports.ImageModel = (0, mongoose_1.model)("Image", ImageSchema);
