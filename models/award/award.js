import mongoose from 'mongoose';
const awardSchema = new mongoose.Schema({

    employee: {
        type: String
    },
    awardType: {
        type: String, 
    },
    date: {
        type: String , 
        
    },
    gift:{
    type: String ,
  },
  description:{
        type:String,
    },
    rating: {
        type: String,
    },
    
});

const award = mongoose.model('Award', awardSchema);

export default award;
