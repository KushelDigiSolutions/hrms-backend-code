import mongoose from 'mongoose';

const mySchema = new mongoose.Schema({
    name: String,
    ts: {
        type: String,
        default: new Date().getTime()
    },
    status: {
        type: String,
        default: 'true'
    }
});

const Branch = mongoose.model('Branch', mySchema);

export default Branch;
