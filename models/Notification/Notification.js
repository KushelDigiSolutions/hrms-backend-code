import mongoose from 'mongoose';

const notificationSchema = new mongoose.Schema({
    title: {
        type: String
    },
    description: {
        type: String,
    },
    date: {
        type: String,
        default: Date.now()
    },
    user:[{
        type: mongoose.Types.ObjectId,
        ref: "User" 
    }] 
 
});

const notification = mongoose.model('Notification', notificationSchema);

export default notification;
