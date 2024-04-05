import { Router } from "express";
import {createAward , getAllAward,deleteAward,updateAward} from "../controller/awardController.js"

const router = Router();

router.post("/postAward", createAward);
router.get("/getAllAward", getAllAward);
router.delete("/deleteAward/:id",deleteAward);
router.put("/updateAward/:id",updateAward);

export default router;
