import { Router } from "express";
import {
  UserProfile,
  DeleteUserProfile,
  RegisterUser,
  getUserByid,
  forgetPassword,
  resetPassword,
  UpdateUser,
  updateProfile,
  updateProfileImage,
  changePassword,
  deleteUsers,
  getActiveUsers,
  getActiveUsersCount,
  login,
  getUsers,
  getEmployeesByEmployee,
  DeleteUser , 
  uploadDocuments
} from "../controller/userController.js";
import isAuthenticated from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
const router = Router();

router.route("/register").post(RegisterUser);

router.route("/login").post(login);

router.route("/user-profile").get(isAuthenticated, UserProfile);

router.post("/changePassword", isAuthenticated, changePassword);

router.route("/delete-profile").delete(isAuthenticated, DeleteUserProfile);

router.route("/getUsers").get(isAuthenticated, getUsers);

router.route("/users/:userId").get(isAuthenticated, getUserByid);

router.route("/updateProfile").put(isAuthenticated, updateProfile);

router.route("/updateProfile/:id").post( updateProfileImage);

router.route("/updateUser/:userId").put(isAuthenticated, UpdateUser);

router.route("/forgetPassword").post(forgetPassword);

router.route("/resetPassword/:token").put(resetPassword);

router.route("/deleteprofile").delete(isAuthenticated, DeleteUserProfile);

router.route("/deleteUsers").delete(deleteUsers);

router.delete("/deleteUser/:id", DeleteUser);

router.route("/getActiveUsers").get(isAuthenticated, getActiveUsers);

router.route("/getActiveUsersCount").get(isAuthenticated, getActiveUsersCount);

router.route("/getEmployeesByEmployee").get(isAuthenticated, getEmployeesByEmployee);

// for upload doucments 
router.route("/uploadDocument/:id").post(  uploadDocuments);

export default router;
