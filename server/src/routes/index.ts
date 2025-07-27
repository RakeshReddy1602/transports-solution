import { Router } from "express";
import VehicleRoutes from './vehicle.routes';
import DriverRoutes from './driver.routes';
const router = Router();


router.use('/vehicle',VehicleRoutes);
router.use('/driver',DriverRoutes);

export default router