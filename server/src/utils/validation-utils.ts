import { MIN_USER_NAME_LENGTH, MAX_USER_NAME_LENGTH, MIN_DESC_LENGTH, MAX_DESC_LENGTH } from "./constants";
import HttpStatusCodes from "./HTTP_STATUS_CODES";
import RestError from "./rest-error";





export function validateUserName(name:string, userLabel?: string) {
    if(!name) {
        throw new RestError(HttpStatusCodes.BAD_REQUEST, (userLabel ? userLabel+' ': '')+'Name is required')
    }
    if(name.length < MIN_USER_NAME_LENGTH || name.length > MAX_USER_NAME_LENGTH) {
        throw new RestError(
            HttpStatusCodes.BAD_REQUEST,
            (userLabel ? userLabel + ' ' : '') +
            `Name must be between ${MIN_USER_NAME_LENGTH} and ${MAX_USER_NAME_LENGTH} characters long`
        );
    }
}

export function  validateDescription(description:string, descriptionLabel? : string) {
    if(!description) {
        throw new RestError(HttpStatusCodes.BAD_REQUEST, (descriptionLabel ? descriptionLabel+' ': '')+'Description is required')
    }
    if(description.length < MIN_DESC_LENGTH || description.length >MAX_DESC_LENGTH) {
        throw new RestError(
            HttpStatusCodes.BAD_REQUEST,
            (descriptionLabel ? descriptionLabel+' ': '') +
            `Description must be between ${MIN_DESC_LENGTH} and ${MAX_DESC_LENGTH} characters long`
        )
    }
}