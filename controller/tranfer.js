import Transfer from "../models/Transfer/tranfer.js"
import User from "../models/User/User.js"
import { mailSender } from "../utils/SendMail2.js";


export const createTransfer = async(req ,res)=>{
    try{

         const {branch , Employee , Department ,TransferDate , Description } = req.body;

         const userDetail = await User.findOne({fullName: Employee});
         
         await mailSender(userDetail.email, `Regarding Create Tranfer`, `<div>
         <div>Branch By: ${branch}</div>
         <div>Department: ${Department}</div>
         <div>Employee: ${Employee}</div>
         <div>TransferDate: ${TransferDate}</div>
         <div>Description: ${Description}</div>
         </div>`);


          const tranferDetail = await Transfer.create({Employee:userDetail?._id , branch :branch , Department:Department , TransferDate:TransferDate , Description:Description});

      
        return res.status(200).json({
            status: true,
            message: 'Notification created successfully',
            data: tranferDetail,
        });



    } catch(error){
          console.log("error ",error);

        return res.status(500).json({
            status:500 , 
            message:"Internal server error "
        })
    }
}


export const getTransfer = async(req ,res)=>{
    try{

           // Find notifications where the user ID is in the user array
           const transfer = await Transfer.find({}).populate("Employee");


           return res.status(200).json({
               status: 200,
               message: "tranfer fetched successfully",
               data: transfer
           });

         

    } catch(error){
        return res.status(500).json({
            status:500 , 
            message:"Internal server error "
        })
    }
}

