export enum ErrorType {
    AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR'
}

export class Error {
    private type: ErrorType;
    private message: string;

    constructor(type: ErrorType, message: string) {
        this.type = type;
        this.message = message;
    }
}
