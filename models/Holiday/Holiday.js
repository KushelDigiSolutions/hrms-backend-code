import mongoose from 'mongoose';

const mySchema = new mongoose.Schema({
    admin: String,
    holidayName: String,
    holidayDate: String
});

const Holiday = mongoose.model('Holiday', mySchema);

export default Holiday;
