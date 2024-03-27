import mongoose from "mongoose";

const mySchema = new mongoose.Schema({
  user: {
    type: Object,
    default: {}
  },
  date: String, // in timestamp
  date1: String, // in date format
  clockIn: String,
  clockOut: String,
  late: String,
  overtime: String,
  total: String,
  message: String
});

const ActivityTracker = mongoose.model("ActivityTracker", mySchema);

export default ActivityTracker;
