import jwt from "jsonwebtoken";
import User from "../models/User/User.js";
import { asyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";

const isAuthenticated = asyncHandler(async (req, res, next) => {
  try {
    req.user = null;

    const token = req.headers.jwt;
    // console.log(token);
    if (!token) {
      throw new ApiError(401, "UnAuthorized Request");
    }
    const decodedToken = jwt.verify(token, process.env.SK);
    const user = await User.findById(decodedToken._id).select("-password");

    if (!user) {
      throw new ApiError(401, "Invalid Token");
    }

    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid User Token");
  }
});

export default isAuthenticated;
