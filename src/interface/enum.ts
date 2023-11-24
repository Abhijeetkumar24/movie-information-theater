export enum MSG {
    VERIFICATION_OTP = "Otp Verification",
    USER_REGISTER = "Your account registration otp: "
}


export enum HttpStatusCode {
    CONTINUE = 100,
    SWITCHING_PROTOCOLS = 101,
    PROCESSING = 102,
    OK = 200,
    CREATED = 201,
    ACCEPTED = 202,
    NON_AUTHORITATIVE_INFORMATION = 203,
    NO_CONTENT = 204,
    RESET_CONTENT = 205,
    PARTIAL_CONTENT = 206,
    AMBIGUOUS = 300,
    MOVED_PERMANENTLY = 301,
    FOUND = 302,
    SEE_OTHER = 303,
    NOT_MODIFIED = 304,
    BAD_REQUEST = 400,
    UNAUTHORIZED = 401,
    FORBIDDEN = 403,
    NOT_FOUND = 404,
    METHOD_NOT_ALLOWED = 405,
    NOT_ACCEPTABLE = 406,
    REQUEST_TIMEOUT = 408,
    CONFLICT = 409,
    INTERNAL_SERVER_ERROR = 500,
    NOT_IMPLEMENTED = 501,
    BAD_GATEWAY = 502,
    SERVICE_UNAVAILABLE = 503,
    GATEWAY_TIMEOUT = 504,
}
export enum HttpStatusMessage {

    OK = "OK",
    CREATED = "CREATED",
    ACCEPTED = "ACCEPTED",
    NON_AUTHORITATIVE_INFORMATION = "NON_AUTHORITATIVE_INFORMATION",
    NO_CONTENT = "NO_CONTENT",
    RESET_CONTENT = "RESET_CONTENT",
    PARTIAL_CONTENT = "PARTIAL_CONTENT",
    AMBIGUOUS = "AMBIGUOUS",
    MOVED_PERMANENTLY = "MOVED_PERMANENTLY",
    FOUND = "FOUND",
    SEE_OTHER = "SEE_OTHER",
    NOT_MODIFIED = "NOT_MODIFIED",
    BAD_REQUEST = "BAD_REQUEST",
    UNAUTHORIZED = "UNAUTHORIZED",
    FORBIDDEN = "FORBIDDEN",
    NOT_FOUND = "NOT_FOUND",
    METHOD_NOT_ALLOWED = "METHOD_NOT_ALLOWED",
    NOT_ACCEPTABLE = "NOT_ACCEPTABLE",
    REQUEST_TIMEOUT = "REQUEST_TIMEOUT",
    CONFLICT = "CONFLICT",
    INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
    NOT_IMPLEMENTED = "NOT_IMPLEMENTED",
    BAD_GATEWAY = "BAD_GATEWAY",
    SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
    GATEWAY_TIMEOUT = "GATEWAY_TIMEOUT",
    HTTP_VERSION_NOT_SUPPORTED = "HTTP_VERSION_NOT_SUPPORTED",
    ACCOUNT_DELETED = "ACCOUNT_DELETED",
    ACCOUNT_INACTIVE = "ACCOUNT_INACTIVE",
    ACCOUNT_LOCKED = "ACCOUNT_LOCKED",
    DEFAULT_MESSAGE = "DEFAULT_MESSAGE",
}
















export enum ExceptionMessage {


    NOT_FOUND = "NOT_FOUND",
    EMAIL_ALREADY_EXIST = "EMAIL_ALREADY_EXIST",
    ERROR_IN_REGISTRATION = "Error in signup",
    VERIFICATION_FAILED = "VERIFICATION_FAILED",
    EMAIL_NOT_EXISTS = "EMAIL_NOT_EXISTS",
    LOGIN_FAILED = "LOGIN_FAILED",
    SOMETHING_WENT_WRONG = "SOMETHING_WENT_WRONG",
    WRONG_ROLE = "wrong role",
    ERROR_IN_MOVIE_ADDING = 'Error in adding the movie',
    ERROR_IN_COMMENT_ADDING = 'Error in adding the comment',
    // ADD_PROPERTY_FAIL= "Error in adding the property",
    MOVIE_ALREADY_EXIST = "Movie already exist",
    TOKEN_NOT_FOUND = "Token not found",
    ERROR_IN_MOVIE_FETCHING = "Error in fetching movie",
    ERROR_IN_MOVIE_UPDATING = "Error in updating movie",
    MOVIE_NOT_FOUND = "Movie not found",
    ERROR_IN_MOVIE_UPDATE = "Error in movie update",
    ERROR_IN_MOVIE_DELETE = "Error in movie delete",
    ERROR_IN_COMMENTS_RETRIEVAL = "Error in comment retrieval",
    COMMENTS_NOT_FOUND = "Comments not found",
    ERROR_IN_COMMENT_UPDATE = "Error in comment update",
    COMMENT_NOT_FOUND = "Comment not found",
    ERROR_IN_COMMENT_DELETE = "Error in comment delete",
    ERROR_IN_MOVIE_SEARCH = "Error in movie search",
    // ACTIVE_CONSTRUCTION_ERROR = "Error in Active construction",
    // HIRE_WORKER_ERROR = "Error in hiring worker",
    // ADD_WORKER_FAIL = "Error in adding the worker",
    // WORKER_ALREADY_EXIST = "Worker already exists",
    // PROPERTY_NOT_FOUND = "Property not found",
    // WORKER_NOT_FOUND = "Worker not found",
    // WORKER_NOT_AVAILABLE = "worker not available",
    // SKILLS_NOT_FOUND = "Skills not found",
    MOVIE_LIST_ERROR = "Error in fetching movies list",
    // MANAGE_EXPENSE_ERROR = "Error in Expenses added",
    // GET_ALL_PROPERTY_ERROR = "Error in all property fetching",
    // ATTENDANCE_FETCH_ERROR = "Error in Attendance added ",
    // ATTENDANCE_ALREADY_EXIST = "Attendance already exists",
    // ADMIN_SIGNUP_ERROR = "Error in Admin signup ",
    USER_NOT_EXISTS = "USER_NOT_EXISTS",
    USER_ALREADY_EXIST = "USER_ALREADY_EXIST",
    OTP_EXPIRED = "OTP_EXPIRED",
    SESSION_NOT_FOUND = "SESSION_NOT_FOUND",
    INVALID_REQUEST = "INVALID_REQUEST",
    INCORRECT_OTP = "INCORRECT_OTP",
    // INVALID_APIKEY = "INVALID_APIKEY",
    INVALID_OTP = "INVALID_OTP",
    INVALID_PASSWORD = "INVALID_PASSWORD",
    UNAUTHORIZED = "UNAUTHORIZED",
    ERROR_IN_THEATERS_FETCH = "Error in theaters fetch",
    ERROR_IN_THEATER_FETCHING = "Error in theater fetching",
    ERROR_IN_THEATER_ADDING = "Error in theater adding",
    THEATER_ALREADY_EXIST = "Theater already exist",
    NO_THEATERS_FOUND = "NO_THEATERS_FOUND",
    INVALID_THEATER_ID = "INVALID_THEATER_ID",
    THEATER_NOT_FOUND = "THEATER_NOT_FOUND"
}


export enum SuccessMessage {
    USER_REGISTRATION_MAIL = "OTP Send to entered email address",
    USER_SIGNUP_SUCCESS = "User signup successfully",
    // ADMIN_LOGIN_SUCCESS = "Admin login successfully",
    ADD_MOVIE_SUCCESSFULLY = "Movie added successfully",
    ADD_COMMENT_SUCCESSFULLY = "Comment added successfully",
    MOVIE_FETCH_SUCCESSFULLY = "Movie fetch successfully",
    MOVIE_UPDATE_SUCCESSFULLY = "Movie udpate successfully",
    MOVIE_DELETE_SUCCESSFULLY = "Movie delete successfully",
    COMMENTS_RETRIEVED_SUCCESSFULLY = "Comments retrieved successfully",
    COMMENT_UPDATED_SUCCESSFULLY = "Comment update successfully",
    COMMENT_DELETE_SUCCESSFULLY = "Comment delete successfully",
    MOVIE_SEARCH_SUCCESSFULLY = "Movie search successfully",
    // HIRE_WORKER_SUCCESSFUL = "Woker hire successfully",
    // WORKER_ADDED_SUCCESS = "Property added successfully",
    // WORKER_LIST_SUCCESS = "Woker list found successfully",
    // MANAGE_EXPENSE_SUCCESS = "Expenses added successfully",
    GET_MOVIES_SUCCESS = "Movies fetch successfully",
    // ATTENDANCE_FETCH_SUCCESS = "Attendance added successfully",

    THEATERS_FETCH_SUCCESSFULLY = "Theaters fetch successfully",
    THEATER_FETCH_SUCCESSFULLY = "Theater fetch successfully",
    ADD_THEATER_SUCCESSFULLY = "Theater added successfully",
}


export enum Role {
    User = 'user',
    Admin = 'admin',
}

