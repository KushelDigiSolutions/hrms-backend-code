import mongoose from "mongoose";

export const connectDb = async () => {
  await mongoose
    .connect(process.env.DB, {
      dbName: process.env.DB_NAME,
    })
    .then(() => console.log("DATABASE CONNECTED"))
    .catch((e) => console.log("database connection failed", e.message));
};
