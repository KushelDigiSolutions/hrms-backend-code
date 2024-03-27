import mongoose from "mongoose";
import ActivityTracker from "../models/ActivityTracker/ActivityTracker.js";
import Holiday from "../models/Holiday/Holiday.js";
import User from "../models/User/User.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const startOfWeek = (date) => {
  var diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
};

export const postActivity = asyncHandler(async (req, res) => {
  const { clockIn, clockOut, late, overtime, total, message, date1 } = req.body;
  try {
    if(clockOut===0 || clockOut==='0')
    {
      let newActivity=new ActivityTracker({
        user: req.user, date: new Date().getTime(), date1, clockIn, clockOut, late, overtime, total, message
      });
      await newActivity.save();
      return res.json({
        success: true,
        message: "Activity saved",
        data: [],
      });
    }
    else
    {
      let id=await ActivityTracker.findOne({"user._id": req.user._id, date1 });
      console.log(id);
      await ActivityTracker.findByIdAndDelete(id._id);
      return res.json({
        success: true,
        message: "Activity updated",
        data: [],
      });
    }
  } catch (error) {
    console.error("Error in postActivity:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

export const postActivityHr = asyncHandler(async (req, res) => {
  const { status, hours, overtime, breaks, activity, date } = req.body;

  try {
    let updateActivity;

    const checkActivity = await ActivityTracker.findOne({
      user: req.user._id,
      date,
    });

    if (checkActivity) {
      const updatedActivities = [...checkActivity.activity, ...activity];
      const updateObj = {
        activity: updatedActivities,
        breaks,
        overtime,
        hours,
      };

      updateActivity = await ActivityTracker.findByIdAndUpdate(
        checkActivity._id,
        { $set: updateObj },
        { new: true }
      );
    } else {
      const newActivity = new ActivityTracker({
        user: req.user._id,
        date,
        activity,
        breaks,
        overtime,
        hours,
      });

      updateActivity = await newActivity.save();
    }

    return res.json({
      success: true,
      message: "Activity updated or saved",
      data: updateActivity,
    });
  } catch (error) {
    console.error("Error in postActivityHr:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
});

export const getActivitiesByUser = asyncHandler(async (req, res) => {
  const { userId, page, perPage, year, month, date } = req.query;
  let and;

  if (!userId || userId === "" || userId === "undefined") {
    and = [{ user: req.user._id }];
  } 
  else {
    and = [{ user: userId }];
  }

  if (date && date !== "undefined" && date !== "") {
    and.push({ date });
    console.log(and);
    const data = await ActivityTracker.find({ $and: and })
      .skip(Number(perPage) * Number(page))
      .limit(Number(perPage));

    return res.json({ success: true, data });
  }

  if (
    month &&
    month !== "undefined" &&
    month !== "" &&
    year &&
    year !== "undefined" &&
    year !== ""
  ) {
    const data = (await ActivityTracker.find({ $and: and }))
      .filter(
        (e) => e.date.split("/")[1] === month && e.date.split("/")[2] === year
      )
      .slice(
        Number(perPage) * Number(page),
        Number(perPage) * (Number(page) + 1)
      )
      .concat(perPage) * Number(page) + Number(perPage)


    return res.json({ success: true, data });
  }

  if (month && month !== "undefined" && month !== "") {
    const data = (await ActivityTracker.find({ $and: and }))
      .filter((e) => e.date.split("/")[1] === month)
      .slice(
        Number(perPage) * Number(page),
        Number(perPage) * (Number(page) + 1)
      );

    return res.json({ success: true, data });
  }

  if (year && year !== "undefined" && year !== "") {
    const data = (await ActivityTracker.find({ user: req.user._id }))
      .filter((e) => e.date.split("/")[2] === year)
      .slice(
        Number(perPage) * Number(page),
        Number(perPage) * (Number(page) + 1)
      );

    return res.json({ success: true, data });
  }

  console.log(and);

  const data = await ActivityTracker.find({ $and: and })
    .skip(Number(perPage) * Number(page))
    .limit(Number(perPage));

  return res.json({ success: true, data });
});

export const getStatisticsByUser = asyncHandler(async (req, res) => {
  const { userId } = req.query;

  if (!userId || userId === "" || userId === "undefined") {
    userId = req.user._id;
  }

  const data = await ActivityTracker.find({ user: userId });
  const curr = new Date();
  const first = startOfWeek(curr);

  let weekHours = 0;
  let monthHours = 0;

  data.forEach((entry) => {
    const [day, month, year] = entry.date.split("/").map(Number);

    if (
      day >= first.getDate() ||
      month >= first.getMonth() + 1 ||
      year >= first.getFullYear()
    ) {
      weekHours += Number(entry.hours);
    }

    if (month >= first.getMonth() + 1 && year >= first.getFullYear()) {
      monthHours += Number(entry.hours);
    }
  });

  return res.json({ success: true, data: { weekHours, monthHours } });
});

function getLastDateOfMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

function getTotalWorkingDaysInMonth() {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  let totalWorkingDays = 0;

  for (let i = 1; i <= daysInMonth; i++) {
      const currentDate = new Date(year, month, i);
      if (currentDate.getDay() !== 0) { // Sunday has index 0
          totalWorkingDays++;
      }
  }

  return totalWorkingDays;
}

export const getAllActivities = asyncHandler(async (req, res) => {
  let {type, date, userId, month} = req.query;

  let and=[];

  if(type && type!=="" && type!=="undefined")
  {
    if(type==='daily')
    {
      if(date && date!=="" && date!=="undefined")
      {
        and.push({date1: `${date.split('-')[2]}/${date.split('-')[1]}/${date.split('-')[0]}`});
      }
      else
      {
        const formattedDate = new Date().toLocaleDateString('en-GB');
        and.push({date1: formattedDate});
      }
    }
    else if(type==='monthly')
    {
      if(userId && userId!=="" && userId!=="undefined")
      {
        let objectId=(mongoose.Types.ObjectId(userId));
        and.push({'user._id': objectId});
      }

      if(month && month!=="" && month!=="undefined")
      {
        // console.log(month);
        let thisMonth=new Date(`${month}-${1}`).getTime();
        let lastDate=getLastDateOfMonth(Number(month.split('-')[0]), Number(month.split('-')[1]));
        let thisMonth1=new Date(`${month}-${lastDate}`).getTime();
        and.push({date: {$gte: thisMonth, $lte: thisMonth1}});
      }
      else
      {
        let d=new Date();
        let now=d.getTime();
        let thisMonth=new Date(`${d.getFullYear()}-${d.getMonth()+1}-${1}`).getTime();
  
        and.push({date: {$gte: thisMonth, $lte: now}});
      }
    }
    else if(type==='all')
    {
      let obj={};
      let workingDays=getTotalWorkingDaysInMonth();

      if(userId && userId!=="" && userId!=="undefined")
      {
        let objectId=(mongoose.Types.ObjectId(userId));
        and.push({'user._id': objectId});
      }
      else
      {
        and.push({});
      }
      const data = await ActivityTracker.find({$and: and});
      for(let i of data)
      {
        if(!obj[i.user_id])
        {
          let userId=i.user._id;
          let users=data.filter(x=>x.user._id===userId);
          // Number(item.total) > 21600
          let presentCount=users.filter(x=>Number(x.total)>0).length;
          let absentCount=workingDays-presentCount;
          obj[i.user._id]={
            user: i.user,
            workingDays,
            presentCount,
            absentCount
          }
        }
      }

      return res.status(200).json(new ApiResponse(200, obj, "successfully fetched all activities"));
    }
  }
  else
  {
    const formattedDate = new Date().toLocaleDateString('en-GB');
    and.push({date1: formattedDate});
  }

  if(and.length===0)
  {
    and.push({});
  }

  console.log(and);

  const data = await ActivityTracker.find({$and: and});
  return res.status(200).json(new ApiResponse(200, data, "successfully fetched all activities"));
});

export const deleteAllActivities = asyncHandler(async (req, res) => {
  await ActivityTracker.deleteMany({});
  return res
    .status(200)
    .json(new ApiResponse(200, {}, "successfully deleted all Activities"));
});
