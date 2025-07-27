import { Address } from "../types/address";
import { MIN_ADDRESS_LINE_LENGTH } from "./constants";
import HttpStatusCodes from "./HTTP_STATUS_CODES";
import RestError from "./rest-error";

export function validateAddress(address: Address) {

    if(!address.addressLine1 || address.addressLine1.length < MIN_ADDRESS_LINE_LENGTH) {
        throw new RestError(HttpStatusCodes.BAD_REQUEST, `Address Line 1 must have atleaset ${MIN_ADDRESS_LINE_LENGTH} characters`);
    }
    if(!address.pinCode) {
        throw new RestError(HttpStatusCodes.BAD_REQUEST, "Pin Code is required");
    }
    if(!address.town || address.town.length < 3) { // remove hard coding by declaring it in constants
        throw new RestError(HttpStatusCodes.BAD_REQUEST, "Town is required and must be at least 3 characters long");
    }
}