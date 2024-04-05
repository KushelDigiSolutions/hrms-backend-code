import { Router } from "express";
import {createTransfer , getTransfer} from "../controller/tranfer.js"

const router = Router();

router.post('/createTransfer',createTransfer);
router.get('/getTransfer',getTransfer);

export default router;
