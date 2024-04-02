import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    complainFrom: {
        type: String,
    },
    complainAgain: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    title: {
       type:String
    },
    complainDate:{
        type:String
    },
    description:{
        type:String
    }
});

const Complain = mongoose.model('Complain', mySchema);

export default Complain;
