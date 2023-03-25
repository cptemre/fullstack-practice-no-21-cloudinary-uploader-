"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const connectDB = (URI) => {
    mongoose_1.default.set("strictQuery", true);
    console.log(`Database is connected`);
    return mongoose_1.default.connect(URI);
};
exports.connectDB = connectDB;
