import mongoose from 'mongoose';
const mySchema = new mongoose.Schema({
    Employee: {
        type: String,
    },
    Designation:{
        type:String
    },
    user: {
        type: mongoose.Types.ObjectId, 
        ref: "user"
    },
    title:{
        type:String
    },
    promotionDate:{
        type:String
    },
    description:{
        type:String
    }
});

const Promotion = mongoose.model('Promotion', mySchema);

export default Promotion;
