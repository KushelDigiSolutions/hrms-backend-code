import mongoose from 'mongoose';

const mySchema = new mongoose.Schema({
    name: {
        type: String
    },
    days: {
        type: String,
    },
    ts: {
        type: String,
        default: new Date().getTime()
    },
    status: {
        type: String,
        default: 'true'
    }
});

const LeaveType = mongoose.model('LeaveType', mySchema);

export default LeaveType;
