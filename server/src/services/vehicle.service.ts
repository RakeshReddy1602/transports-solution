import {prisma} from '../prisma';
import RestError from "../utils/rest-error";
import HttpStatusCodes from "../utils/HTTP_STATUS_CODES";
import { validateVehicleDetails } from '../utils/vehicle-utils';
import ApiResponse from '../utils/api-response';



const VehicleService = {

    addNewVehicle: async function(name: string, description: string, registrationNumber: string, capacity: number, fuelType:number, userId: number){
        validateVehicleDetails(name,description,registrationNumber,capacity,fuelType);
        // check if reg number is already there for this user 
        let existingVehicleWithRegNumber = await prisma.vehicle.count({
            where: {
                registrationNumber: registrationNumber,
                isActive: true
            }
        });
        if(existingVehicleWithRegNumber > 0) {
        throw new RestError(HttpStatusCodes.CONFLICT, "A vehicle with the same registration number already exists");
        }
        // prisma.
        let owner = await prisma.vehicle.findFirst({
            where:{
                fk_id_owner : userId
            }
        })
        if(!owner) {
            throw new RestError(HttpStatusCodes.BAD_REQUEST, 'Vendor Profile not created for this user. Register as owner to add vehicles');
        }
        await prisma.vehicle.create({
            data: {name,description,capacity,registrationNumber:registrationNumber,fuelType:fuelType, fk_id_owner:owner.id}
        })
        // use Apiresponse class here for success response for all APIs
        return new ApiResponse(HttpStatusCodes.OK,'Requested vehicle added successfully',[]);
    },

    updateVehicle :  async function(name: string, description: string, registrationNumber: string, capacity: number, fuelType:number, userId: number) {
        validateVehicleDetails(name,description,registrationNumber,capacity,fuelType);
        let updateCondition  = { isActive : true, registration_number : registrationNumber, fk_id_owner: userId };
        let {count : updateCount} = await prisma.vehicle.updateMany({
            where : updateCondition,
            data:  {
                name: name,
                description: description,
                registrationNumber : registrationNumber,
                capacity: capacity,
                fuelType: fuelType
            }
        })
        if(updateCount === 0) {
            return new RestError(HttpStatusCodes.BAD_REQUEST, 'Vehicle with given Reg. Number is not found');
        }
        return new ApiResponse(HttpStatusCodes.OK,'Vehicle Details updated successfully', {name,description,registrationNumber,capacity,fuelType});

    },

    deleteVehicle: async function(registrationNumber:string) {
        const existingVehiclesCount = await prisma.vehicle.update({
            where:{
                isActive : true,
                registrationNumber : registrationNumber
            },
            data: {
                isActive: false
            }
        });
        if(!existingVehiclesCount) {
        throw new RestError(HttpStatusCodes.NOT_FOUND, "No vehicle exists with the given registration number");
        }
        let updateCondition = { isActive : true, registration_number : registrationNumber };
        // use Apiresponse class here for success response for all APIs
        return new ApiResponse(HttpStatusCodes.OK,'Requested vehicle deleted successfully',[]);
    }

}


export default VehicleService;