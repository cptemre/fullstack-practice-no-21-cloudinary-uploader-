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
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProducts = exports.createProduct = void 0;
const Image_1 = require("../models/Image");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, image, public_id } = req.body;
    console.log(name, image, public_id);
    const products = yield Image_1.ImageModel.create({ name, image, public_id });
    res.status(201).json({ products });
});
exports.createProduct = createProduct;
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Image_1.ImageModel.find({});
    res.status(201).json({ products });
});
exports.getProducts = getProducts;
