// constants.ts
export const MIN_VEHICLE_NAME_LENGTH = 5;
export const MAX_VEHICLE_NAME_LENGTH = 50;
export const MAX_VEHICLE_DESC_LENGTH = 100;
export const MIN_USER_NAME_LENGTH = 3;
export const MAX_USER_NAME_LENGTH = 50;
export const MIN_ADDRESS_LINE_LENGTH = 5;
export const MIN_DESC_LENGTH = 5;
export const MAX_DESC_LENGTH = 300;
export const FUEL_TYPES = {
    petrol: {
        value: 1,
        label: 'Petrol'
    },
    diesel: {
        value: 2,
        label: 'Diesel'
    },
    electric: {
        value: 3,
        label: 'Electric'
    },
    hybrid: {
        value: 4,
        label: 'Hybrid'
    },
    cng: {
        value: 5,
        label: 'CNG'
    },
    others: {
        value: 6,
        label: 'Others'
    }
}
