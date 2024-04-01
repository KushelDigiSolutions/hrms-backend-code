import { Router } from "express";
import {
  ChangeCurrentAdminPassword,
  CreateNewHr,
  CreateNewUser,
  createAdmin,
  getAdminProfile,
  getAdmins,
  loginAdmin,
  updateAdmindetails,
  postIndicator,
  getIndicator,
  deleteIndicator,
  updateIndicator,
  postApprisal,
  getApprisal,
  fetchEmployee,
  deleteApprisal,
  updateApprisal,
  postAssets,
  getAssets,
  deleteAssets,
  updateAssets,
  postTracking,
  getTracking,
  deleteTracking,
  updateTracking,
  postAnnouncement,
  updateAnnouncement,
  getAnnouncement,
  deleteAnnouncement,
  fetchAllEmployee
} from "../controller/adminController.js";
import isAuthenticated from "../middleware/auth.js";
import { upload } from "../middleware/multer.js";
const router = Router();

router.get("/getAdmins", getAdmins);
router.get("/getAdminProfile", isAuthenticated, getAdminProfile);
router.post("/loginAdmin", loginAdmin);
router.post("/changePassword", isAuthenticated, ChangeCurrentAdminPassword);

router.post("/createHr", isAuthenticated, CreateNewHr);

router.post("/createAdmin", createAdmin);

router.get("/topDash", isAuthenticated, async (req, res) => {
  try {
    const data = await topDash({ ...req.query, auth: req.user });
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

router.post("/createUser1", isAuthenticated, CreateNewUser);

router.put("/updateAdmin", isAuthenticated, updateAdmindetails);

router.post('/postIndi',postIndicator);
router.get("/getIndicator", getIndicator);
router.delete("/deleteIndicator/:id", deleteIndicator);
router.put("/updateIndicator/:id", updateIndicator);

router.post("/fetchEmployee" , fetchEmployee);
router.get("/fetchEmployee" , fetchAllEmployee);

router.post('/postapp',postApprisal);
router.get('/getApp',getApprisal);
router.delete("/deleteApp/:id", deleteApprisal);
router.put("/updateApp/:id", updateApprisal);

router.post('/postAsset',postAssets);
router.get('/getAsset',getAssets);
router.delete("/deleteAsset/:id", deleteAssets);
router.put("/updateAsset/:id", updateAssets);

router.post('/postTrack',postTracking);
router.get('/getTrack',getTracking);
router.delete("/deleteTrack/:id", deleteTracking);
router.put("/updateTrack/:id", updateTracking);

router.post('/postAnnouncement',postAnnouncement);
router.get('/getAnnouncement', getAnnouncement);
router.delete("/deleteAnnouncement/:id",deleteAnnouncement);
router.put("/updateAnnouncement/:id", updateAnnouncement);


export default router;
