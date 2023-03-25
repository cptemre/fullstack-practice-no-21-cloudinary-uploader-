import { Request, Response } from "express";
import { ImageModel } from "../models/Image";

const createProduct = async (req: Request, res: Response) => {
  interface Body {
    name: string;
    image: string;
    public_id: string;
  }
  const { name, image, public_id }: Body = req.body;
  console.log(name, image, public_id);

  const products = await ImageModel.create({ name, image, public_id });
  res.status(201).json({ products });
};

const getProducts = async (req: Request, res: Response) => {
  const products = await ImageModel.find({});

  res.status(201).json({ products });
};

export { createProduct, getProducts };
