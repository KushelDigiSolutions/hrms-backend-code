import Leave from "../models/Leave/Leave.js";
import User from "../models/User/User.js";
import { removeUndefined } from "../utils/util.js";
import { mailSender } from "../utils/SendMail2.js";


export const postLeave = async ({ auth, type, from, to, days, reason }) => {
  const newLeave = new Leave({
    user: auth, 
    leaveType: type, 
    from, 
    to, 
    days, 
    reason, 
    status: "", 
    ts: new Date().getTime()
  });



  const saveLeave = await newLeave.save();

  await mailSender("shubham@kusheldigi.com");


  return { success: true, message: "New leave created" };
};

export const updateLeave = async ({ auth,employeeName ,  id, leaveType, from, to, days, reason, status }) => {
  let updateObj=removeUndefined({
    leaveType, from, to, days, reason
  });

  const updateLeave = await Leave.findByIdAndUpdate(
    id,
    { $set: updateObj },
    { new: true }
  );

   const employe = await User.findOne({fullName: employeeName});

   await mailSender(employe.email);
    

  return { success: true, message: "Leave updated" };
};

export const getUserLeaves = async ({ auth }) => {
  const data = await Leave.find({}).populate('user'); // Populate the 'user' field
  return { success: true, data };
};

export const getUserLeaveById = async ({ auth, id }) => {
  if (!auth) {
    return { success: false, message: "Not Authorised" };
  }

  const data = await Leave.findById(id);
  return { success: true, data };
};

export const deleteLeave = async ({ auth, id }) => {
  if (!auth) {
    return { success: false, message: "Not Authorised" };
  }

  const data = await Leave.findByIdAndDelete(id);
  return { success: true, data };
};

export const deleteAllLeaves = async () => {
  const data = await Leave.deleteMany();
  return { success: true, data };
};

export const getTotalLeaveCount = async()=>{
  const data = await Leave.find({});

  const totalLeave = data.length;

   return {
    success:true ,
 totalLeave
   }
}

export const rejectLeaveHandler  = async({fullName})=>{
  const userDetail = await User.findOne({fullName: fullName});

  
  const subject = `Your holidays are cancel by admin`;

await mailSender(userDetail?.email ,subject);

return {
status: true , 
message:"Successfuly send the email"
}
}
export const acceptLeaveHandler  = async({fullName , days})=>{

   const userDetail = await User.findOne({fullName: fullName});

         const subject = `total holiday of ${days} days`;

    await mailSender(userDetail?.email ,subject);

    return {
      status: true , 
      message:"Successfuly send the email"
    }


}