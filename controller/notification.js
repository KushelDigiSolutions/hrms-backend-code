import Notification from "../models/Notification/Notification.js"
import User from "../models/User/User.js"

export const createNotification = async(req ,res)=>{
    try{

         const {title , description , users} = req.body;

         for(let user of users){

             const userDetail = await User.findOne({fullName: user});

         }

    } catch(error){
        return res.status(500).json({
            status:500 , 
            message:"Internal server error "
        })
    }
}
export const getNotification = async(req ,res)=>{
    try{

        const {userId} = req.params;

           // Find notifications where the user ID is in the user array
           const notifications = await Notification.find({ user: { $in: [userId] } });

           console.log('notifion ',notifications);

           return res.status(200).json({
               status: 200,
               message: "Notifications fetched successfully",
               notifications: notifications
           });

         

    } catch(error){
        return res.status(500).json({
            status:500 , 
            message:"Internal server error "
        })
    }
}
export const deleteNotification = async(req ,res)=>{
    try{

        const {userId  , notId} = req.params;

        const updatedNotification = await Notification.findOneAndUpdate(
            { _id: notId },
            { $pull: { user: userId } },
            { new: true }
        );

        if (!updatedNotification) {
            return res.status(404).json({
                status: 404,
                message: "Notification not found"
            });
        }

        return res.status(200).json({
            status: 200,
            message: "User removed from notification successfully",
            notification: updatedNotification
        });

    } catch(error){
        return res.status(500).json({
            status:500 , 
            message:"Internal server error "
        })
    }
}