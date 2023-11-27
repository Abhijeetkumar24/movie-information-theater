export enum MSG {
    VERIFICATION_OTP = "Otp Verification",
    USER_REGISTER = "Your account registration otp: ",
    THEATER_MICROSERVICE = "Theater Microservice",
    THEATER_DESCRIPTION = "The theater API description",
    SET_VERSION = "1.0",
    ADD_TAG = "APIs",
    API = "api"
}


export enum HttpStatusCode {
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NO_CONTENT = 204,
    AMBIGUOUS = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    
}
export enum HttpStatusMessage {

    OK = "OK",
    CREATED = "CREATED",
    ACCEPTED = "ACCEPTED",
    NO_CONTENT = "NO_CONTENT",
    AMBIGUOUS = "AMBIGUOUS",
    MOVED_PERMANENTLY = "MOVED_PERMANENTLY",
    FOUND = "FOUND",
    BAD_REQUEST = "BAD_REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    CONFLICT = "CONFLICT",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    BAD_GATEWAY = "BAD_GATEWAY",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
    
}


export enum ExceptionMessage {

    NOT_FOUND = "NOT_FOUND",
    UNAUTHORIZED = "UNAUTHORIZED",
    ERROR_IN_THEATERS_FETCH = "Error in theaters fetch",
    ERROR_IN_THEATER_FETCHING = "Error in theater fetching",
    ERROR_IN_THEATER_ADDING = "Error in theater adding",
    THEATER_ALREADY_EXIST = "Theater already exist",
    NO_THEATERS_FOUND = "NO_THEATERS_FOUND",
    INVALID_THEATER_ID = "INVALID_THEATER_ID",
    THEATER_NOT_FOUND = "THEATER_NOT_FOUND",
    WRONG_ROLE = "WRONG_ROLE",
    SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG"
}


export enum SuccessMessage {
    THEATERS_FETCH_SUCCESSFULLY = "Theaters fetch successfully",
    THEATER_FETCH_SUCCESSFULLY = "Theater fetch successfully",
    ADD_THEATER_SUCCESSFULLY = "Theater added successfully",
}


export enum Role {
    User = 'user',
    Admin = 'admin',
}

