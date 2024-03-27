import mongoose from "mongoose";
import Announcement from "../models/Announcement/Announcement.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { uploadToCloudinary } from "../utils/cloudinary.js";
import { removeUndefined } from "../utils/util.js";

export const postAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { message, date } = req.body;
    const admin = req.user.role === "HR" ? req.user.adminId : req.user._id;
    const Hr = req.user.role === "HR" ? req.user._id : null;

    const AnnouncementImage = req.file?.path;

    if (!AnnouncementImage) {
      throw new ApiError(400, "Avatar local path is required");
    }

    const announcementImage = await uploadToCloudinary(AnnouncementImage);

    if (!announcementImage) {
      throw new ApiError(400, "Error uploading avatar to Cloudinary");
    }

    const newAnnouncement = await Announcement.create({
      admin,
      Hr,
      image: announcementImage?.url,
      message,
      date,
    });

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          newAnnouncement,
          "Successfully posted the announcement"
        )
      );
  } catch (error) {
    console.error("Error posting announcement:", error);
    return res
      .status(500)
      .json(
        new ApiResponse(
          500,
          null,
          "Internal Server Error: Failed to post the announcement"
        )
      );
  }
});

export const updateAnnouncement = asyncHandler(async (req, res) => {
  const { message, date } = req.body;
  const { id } = req.params;
  const AnnouncementImage = req.file?.path;

  if (!AnnouncementImage) {
    throw new ApiError(400, "Avatar local path is required");
  }

  const announcementImage = await uploadToCloudinary(AnnouncementImage);

  if (!announcementImage) {
    throw new ApiError(400, "Error uploading avatar to Cloudinary");
  }
  const updateObj = removeUndefined({
    message,
    date,
    image: announcementImage?.url,
  });

  const data = await Announcement.findByIdAndUpdate(id, updateObj, {
    new: true,
  });
  return res
    .status(200)
    .json(new ApiResponse(200, data, "Updated the announcement successfully"));
});

export const getAnnouncements = asyncHandler(async (req, res) => {
  const { page, perPage, date } = req.query;
  const and = [];

  if (date) {
    and.push({ date });
  }

  const admin = req.user.role === "ADMIN" ? req.user.adminId : req.user._id;
  const Hr = req.user.role === "EMPLOYEE" ? req.user.hr : req.user._id;

  and.push({
    $or: [{ admin, Hr: { $in: [null, undefined] } }, { Hr }],
  });

  const data = await Announcement.find({ $and: and }).skip(page).limit(perPage);

  return res
    .status(200)
    .json(new ApiResponse(200, data, "Announcements Fetched successfully"));
});

export const getAnnouncementDates = asyncHandler(async (req, res) => {
  const admin = req.user.role === "ADMIN" ? req.user._id : req.user.adminId;
  const Hr = req.user.role === "EMPLOYEE" ? req.user.hr : req.user._id;

  const conditions = {
    $or: [{ admin, Hr: { $in: [null, undefined] } }, { Hr }],
  };

  const data = await Announcement.distinct("date", conditions);

  return res
    .status(200)
    .json(
      new ApiResponse(200, data, "Announcements by Dates Fetched successfully")
    );
});

export const deleteAnnouncement = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Invalid ObjectId format for id",
      });
    }

    const ans = await Announcement.findByIdAndDelete(id);
    return res
      .status(200)
      .json(new ApiResponse(200, ans, "Successfully deleted the Announcement"));
  } catch (error) {
    console.log("error is :", error.message);
  }
});

export const deleteAllAnnouncements = asyncHandler(async (req, res) => {
  const data = await Announcement.deleteMany();
  return res.status(200).json(
    new ApiResponse(
      200,
      {
        data,
      },
      "Successfully deleted all  announcements"
    )
  );
});
