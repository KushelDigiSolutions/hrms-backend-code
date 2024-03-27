import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
  admin: String,
  Hr: String,
  date: String,
  message: String,
  image: String,
});

const Announcement = mongoose.model("Announcement", mySchema);

export default Announcement;
