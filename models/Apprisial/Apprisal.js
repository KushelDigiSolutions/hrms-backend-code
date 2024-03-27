import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    Branch: {
        type: String
    },
    user: {
        type:mongoose.Types.ObjectId,
        ref:"user"
    },
    SelectMonth: {
        type: String
    },
  Employee:{
    type: String ,
  },
    remarks:{
        type:String,
    },
    ts: {
        type: String,
    },
});

const Apprisal = mongoose.model('Apprisal', mySchema);

export default Apprisal;
