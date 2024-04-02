import Notification from "../models/Notification/Notification.js"
import User from "../models/User/User.js"

export const createNotification = async(req ,res)=>{
    try{

         const {title , description , users} = req.body
         
        // Find user details for each user in the users array
        const userPromises = users.map(async (userName) => {
            const userDetail = await User.findOne({ fullName: userName });
            console.log('userdetail ',userDetail);
            return userDetail;
        });

        console.log("userpromice ",userPromises);
        
        // Resolve all userPromises
        const userDetails = await Promise.all(userPromises);
        console.log("userDetails ",userDetails);

             // Create a new notification
        const newNotification = new Notification({
            title,
            description,
            user: userDetails.map(user => user._id), // Add userIds to the user array
        });

        // Save the new notification
        const savedNotification = await newNotification.save();

        return res.status(200).json({
            status: true,
            message: 'Notification created successfully',
            data: savedNotification,
        });



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
           const notifications = await Notification.find({ user: { $in: [userId] } }).populate("user");


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

        console.log('uod ',userId , notId);

        const updatedNotification = await Notification.findOneAndUpdate(
            { _id: notId },
            { $pull: { user: userId } },
            { new: true }
        );

        console.log("upte ",updatedNotification);

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