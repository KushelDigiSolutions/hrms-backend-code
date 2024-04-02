import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    Employee: {
        type: String,
    },
    type: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    noticeDate:{
        type:String
    },
    terminationDate: {
        type: String,
    },
    description:{
        type:String
    }
});

const Termination = mongoose.model('Termination', mySchema);

export default Termination;
