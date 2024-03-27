import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    Employee: {
        type: String,
    },
    Name: {
        type: String
    },
    user: {
        type: mongoose.Types.ObjectId,
        ref: "user"
    },
    amount:{
        type:Number
    },
    purchaseDate: {
        type: String,
    },
    supportedDate:{
        type:String
    },
    description:{
        type:String
    }
});

const Assets = mongoose.model('Assets', mySchema);

export default Assets;
