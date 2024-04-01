import { Router } from "express";
import {createNotification , getNotification , deleteNotification} from "../controller/notification.js"

const router = Router();

router.post('/createNotification',createNotification);
router.get('/getNotification/:userId',getNotification);
router.delete('/deleteNotification/:userId/:notId',deleteNotification);

export default router;
