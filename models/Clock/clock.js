import mongoose from 'mongoose';

const clockSchema = new mongoose.Schema({
    Date: {
        type: Date,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    clockIn: {
        type: String,
    },
    clockOut: {
        type: String,
    }
});

const Clock = mongoose.model('Clock', clockSchema);

export default Clock;
