import { Router } from "express";
import {createClock , getClockByUserDate} from "../controller/clockController.js"

const router = Router();

router.post('/createClock/:userId',createClock);
router.post('/getClock/:userId',getClockByUserDate);

export default router;
