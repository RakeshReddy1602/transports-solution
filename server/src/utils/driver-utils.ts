import { Address } from "../types/address";
import { validateAddress } from "./address-utils";
import HttpStatusCodes from "./HTTP_STATUS_CODES";
import { alphabetsAndSpacesRegex, indianMobileNumberRegex } from "./regex";
import RestError from "./rest-error";

export function validateDriverDetails(name: string, contactNumber: string, baseSalary: number, address: Address, experince?: number ) {
    if(!name || !alphabetsAndSpacesRegex.test(name)) {
        throw new RestError(HttpStatusCodes.BAD_REQUEST,"Driver Name is required and can have only alphabets and spaces");
    }
    
    if(!indianMobileNumberRegex.test(contactNumber)) {
        throw new RestError(HttpStatusCodes.BAD_REQUEST, "Invalid contact number");
    }
    if (baseSalary < 0) {
        throw new RestError(HttpStatusCodes.BAD_REQUEST, "Base salary must be at least 0");
    }
    if (experince && experince < 0) {
        throw new RestError(HttpStatusCodes.BAD_REQUEST, "Experince must be at least 0");
    }
    validateAddress(address)
}