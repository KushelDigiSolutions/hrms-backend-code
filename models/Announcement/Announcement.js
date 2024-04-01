import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
  title: String,
  Branch: String,
  Department: {
    type: String
  },
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User"
},
  Employee: {
    type: String
  }
  , startDate: {
    type: String
  },
  endDate: {
    type: String
  },
  description:{
    type:String
  }
});

const Announcement = mongoose.model("Announcement", mySchema);

export default Announcement;
