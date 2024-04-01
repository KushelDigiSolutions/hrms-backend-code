import { Router } from "express";
import {
  postLeaveType,
  updateLeaveType,
  getLeaveTypes,
  deleteLeaveType,
  getDesignation,
  deleteDesignation,
  getDesignations,
  postDesignation,
  updateDesignation,

  deleteDepartment,
  getDepartments,
  postDepartment,
  updateDepartment,

  deleteBranch,
  getBranchs,
  postBranch,
  updateBranch,
  getEmployess
} from "../controller/systemController.js";

const router = Router();

router.post("/postLeaveType", postLeaveType);

router.put("/updateLeaveType/:id", updateLeaveType);

router.get("/getLeaveTypes", getLeaveTypes);

router.delete("/deleteLeaveType/:id", deleteLeaveType);

router.post("/postBranch", postBranch);

router.put("/updateBranch/:id", updateBranch);

router.get("/getBranchs", getBranchs);

router.delete("/deleteBranch/:id", deleteBranch);

router.post("/postDepartment", postDepartment);

router.put("/updateDepartment/:id", updateDepartment);

router.get("/getDepartments", getDepartments);

router.delete("/deleteDepartment/:id", deleteDepartment);

router.post("/postDesignation", postDesignation);

router.put("/updateDesignation/:id", updateDesignation);

router.get("/getDesignations/:id", getDesignations);
router.get("/getEmployeess/:id",getEmployess);
router.get("/getDesignation", getDesignation);

router.delete("/deleteDesignation/:id", deleteDesignation);

export default router;
