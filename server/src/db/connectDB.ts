import mongoose from "mongoose";

export const connectDB = (URI: string) => {
  mongoose.set("strictQuery", true);
  console.log(`Database is connected`);
  return mongoose.connect(URI);
};
