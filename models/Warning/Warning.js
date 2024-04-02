import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    warningBy: {
        type: String,
    },
    warningTo: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    subject: {
       type:String
    },
    warningDate:{
        type:String
    },
    description:{
        type:String
    }
});

const Warning = mongoose.model('Warning', mySchema);

export default Warning;
