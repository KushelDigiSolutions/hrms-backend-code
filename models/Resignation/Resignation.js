import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    Employee: {
        type: String,
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    noticeDate: {
       type:String
    },
    resignationDate:{
        type:String
    },
    description:{
        type:String
    }
});

const Resignation = mongoose.model('Resignation', mySchema);

export default Resignation;
