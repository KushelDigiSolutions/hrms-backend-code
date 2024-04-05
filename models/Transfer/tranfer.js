import mongoose from 'mongoose';

const transferSchema = new mongoose.Schema({
    branch: {
        type: String,
    },
    Employee: {
        type: mongoose.Types.ObjectId,
        ref: "User"
    },
    Department: {
        type: String,
    },
    TransferDate: {
        type: Date,
    } , 
    Description:{
        type:String,
    }
});

const transfer = mongoose.model('Transfer', transferSchema);

export default transfer;
