import { Request, Response } from "express";
import DriverService from "../services/driver.service";

const DriverController = {

    addNewDriver: async function(req: Request, res: Response) {
        const { name, contactNumber, baseSalary, address, experince } = req.body;
        return DriverService.addNewDriver(name,contactNumber,baseSalary,address,experince); 
    }
}

export default DriverController;