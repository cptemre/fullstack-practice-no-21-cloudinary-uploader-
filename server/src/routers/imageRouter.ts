import express from 'express';
const router = express.Router()

import { uploadImage,deleteImage } from '../controls/imageController';

router.route("/").post(uploadImage);
router.route("/:public_id").delete(deleteImage);

export {router}