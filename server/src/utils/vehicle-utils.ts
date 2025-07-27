import { MIN_VEHICLE_NAME_LENGTH,MAX_VEHICLE_NAME_LENGTH,MAX_VEHICLE_DESC_LENGTH,FUEL_TYPES } from "./constants";
import RestError from "./rest-error";
import HttpStatusCodes from "./HTTP_STATUS_CODES";

export function validateVehicleDetails(name: string, description: string, registrationNumber: string, capacity: number, fuelType:number) {
    if(!name || name.length < MIN_VEHICLE_NAME_LENGTH) {
        return new RestError(HttpStatusCodes.BAD_REQUEST,`Name is required and must have an atleast ${MIN_VEHICLE_NAME_LENGTH} characters`);
    }
    if(name.length > MAX_VEHICLE_NAME_LENGTH) {
        return new RestError(HttpStatusCodes.BAD_REQUEST,`Vehicle name can have at most ${MAX_VEHICLE_NAME_LENGTH} characters`);
    }
    if(description && description.length > MAX_VEHICLE_DESC_LENGTH) {
        return new RestError(HttpStatusCodes.BAD_REQUEST, `Vehicle description can have at most ${MAX_VEHICLE_DESC_LENGTH} characters`);
    }
    // validate reg number for vehicle

    if(Number.isNaN(Number(capacity))) {
        return new RestError(HttpStatusCodes.BAD_REQUEST, "Capacity must be a valid number");
    }
    // validate fuelType
    const validFuelTypeValues = Object.values(FUEL_TYPES).map(fuel => fuel.value);
    if (!validFuelTypeValues.includes(fuelType)) {
        return new RestError(HttpStatusCodes.BAD_REQUEST, "Invalid fuel type");
    }
}