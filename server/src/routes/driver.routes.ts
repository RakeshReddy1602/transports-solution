import { Router } from "express";
import DriverController from "../controllers/driver.controller";
import asyncHandler from "../utils/async-handler";

const router = Router();

router.post('/add-new', asyncHandler(DriverController.addNewDriver));

export default router;