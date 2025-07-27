import express  from "express";
import VehicleService from "../services/vehicle.service";
import { Request, Response } from "express";

const VehicleController = {

    addNewVehicle : async function (req:Request, res: Response) {
        console.log('Body : ', req.body);
        const { name, description, registrationNumber, capacity, fuelType }  = req.body;
        return VehicleService.addNewVehicle(name, description,registrationNumber, capacity, fuelType);
    },

    updateVehicleDetails: async function(req: Request, res: Response) {
        const { name, description, registrationNumber, capacity, fuelType }  = req.body;
        return VehicleService.updateVehicle(name,description,registrationNumber,capacity,fuelType);
    },

    deleteVehicle: async function(req: Request, res: Response) {
        const { registrationNumber } = req.body;
        return VehicleService.deleteVehicle(registrationNumber);
    }

};



export default VehicleController;