import { Router } from "express";
import VehicleController from "../controllers/vehicle.controller";
import asyncHandler from "../utils/async-handler";

const router = Router();

router.post('/add-new',asyncHandler(VehicleController.addNewVehicle));
router.put('/update-details',asyncHandler(VehicleController.updateVehicleDetails));
router.delete('/:registrationNumber', asyncHandler(VehicleController.deleteVehicle));

export default router;