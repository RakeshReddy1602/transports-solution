import { prisma } from "../prisma";
import { Address } from "../types/address"
import { validateAddress } from "../utils/address-utils";
import ApiResponse from "../utils/api-response";
import HttpStatusCodes from "../utils/HTTP_STATUS_CODES";
import { validateDescription, validateUserName } from "../utils/validation-utils"

const CustomerService = {
    async addNewCustomer(name: string, description:string, address:Address) {
        // @TODO: decide if to create user or not
        validateUserName(name);
        validateDescription(description);
        validateAddress(address);
        // decide if to put address on user level or customer
        let customer = await prisma.customer.create({
            data: {
                name, description,
                uniqueId: name + new Date().getDay()
            }
        })
        return new ApiResponse(HttpStatusCodes.OK, 'Customer Added successfully',customer);
    },

}

export {

}