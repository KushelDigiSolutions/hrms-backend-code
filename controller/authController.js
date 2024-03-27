import bcrypt from "bcryptjs";
import User from "../models/User/User.js";
import Hr from "../models/Hr/Hr.js";
import Admin from "../models/Admin/Admin.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

const generateRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    const token = user.generateAuthToken();
    return token;
  } catch (error) {
    // Log the actual error for debugging purposes
    console.error("Error in generateRefreshToken:", error.message);

    throw new ApiError(500, "Something went wrong");
  }
};

export const login = asyncHandler(async (req, res) => {
  const { email, password, employeeCode } = req.body;
  const user = email
    ? await User.findOne({ email })
    : await User.findOne({ employeeCode: employeeCode.slice(3) });
    
  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = await generateRefreshToken(user._id);

  return res.status(200).json({
    success: true,
    message: "Login success",
    token,
    user,
  });
});

export const changePassword = asyncHandler(async (req, res) => {
  const { oldpassword, newpassword, confirmpassword } = req.body;

  if (newpassword !== confirmpassword) {
    throw new ApiError(401, "New passwords do not match");
  }

  const userRole = req.user.role;
  let Unit;

  switch (userRole) {
    case "USER":
      Unit = User;
      break;
    case "HR":
      Unit = Hr;
      break;
    case "ADMIN":
      Unit = Admin;
      break;
    default:
      throw new ApiError(401, "Invalid user role");
  }

  const user = await Unit.findById(req.user._id);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const check = await bcrypt.compare(oldpassword, user.password);

  if (!check) {
    throw new ApiError(401, "Invalid old password");
  }

  const genpass = await bcrypt.hash(newpassword, 10);

  await Unit.findByIdAndUpdate(
    req.user._id,
    {
      $set: {
        password: genpass,
      },
    },
    {
      new: true,
    }
  );

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Successfully Password Changed"));
});
