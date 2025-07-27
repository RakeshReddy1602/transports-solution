import { Address } from "../types/address";
import HttpStatusCodes from "../utils/HTTP_STATUS_CODES";
import { alphabetsAndSpacesRegex, indianMobileNumberRegex } from "../utils/regex";
import RestError from "../utils/rest-error";
import ApiResponse from "../utils/api-response";
import { prisma } from "../prisma";
import { validateDriverDetails } from "../utils/driver-utils";

const DriverService = {

    addNewDriver: async function(name: string, contactNumber: string, baseSalary: number, address: Address, experince?: number ) {
        validateDriverDetails(name,contactNumber,baseSalary,address,experince);
        let driverAddress = await prisma.address.create({
            data:address
        })
        console.log('Address for driver : ', driverAddress);
        let driver = prisma.driver.create({
            data: {
                name, contactNumber,baseSalary,experince,uniqueId:`name`+'123',fk_id_address:driverAddress.id
            }
        })
        return new ApiResponse(HttpStatusCodes.OK, 'Driver Added successfully', {success: true});
    },

    editDriverDetails: async function(uniqueId: string, name: string, contactNumber: string, baseSalary: number,address: Address,experince?:number) {
        validateDriverDetails(name,contactNumber,baseSalary,address,experince);
        let existingDriver = await prisma.driver.findFirst({
            where:{
                isActive: true,
                uniqueId: uniqueId
            },
            include: {
                address: true
            }
        });
        if(!existingDriver) {
            throw new RestError(HttpStatusCodes.BAD_REQUEST,`Driver with unique ID : ${uniqueId} does not exists`);
        }
        if(existingDriver.address) {
            const { addressLine1, addressLine2, addressLine3, pinCode, town } = address;
            await prisma.address.update({
                where: { id: existingDriver.address.id },
                data: {
                    addressLine1,
                    addressLine2: addressLine2 ?? null,
                    addressLine3: addressLine3 ?? null,
                    pinCode,
                    town
                }
            });
        }
        else {
            let driverAddress = await prisma.address.create({
                data: address
            });
            existingDriver.fk_id_address = driverAddress.id;
        }
        let updatedDetails = await prisma.driver.update({
            where: {
                id: existingDriver.id
            },
            data: {
                name,contactNumber,baseSalary,experince
            }
        })
        return new ApiResponse(HttpStatusCodes.OK,'Driver details updated successfully',updatedDetails);
    },

    deleteDriver: async function(uniqueId: string) {
        let existingDriver = await prisma.driver.update({
            where:{ uniqueId },
            data: {
                isActive: false
            }
        });
        if(!existingDriver) {
        throw new RestError(HttpStatusCodes.NOT_FOUND, `Driver with unique ID: ${uniqueId} not found`);
        }
        return new ApiResponse(HttpStatusCodes.OK, 'Driver deleted successfully',{});
    }
}

export default DriverService;