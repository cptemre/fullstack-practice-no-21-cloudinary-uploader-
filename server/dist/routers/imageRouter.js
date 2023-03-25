"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
exports.router = router;
const imageController_1 = require("../controls/imageController");
router.route("/").post(imageController_1.uploadImage);
router.route("/:public_id").delete(imageController_1.deleteImage);
