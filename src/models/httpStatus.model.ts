export enum HttpStatusCode {
    Ok = 200,
    Created = 201,
    Accepted = 202,
    NoContent = 204,

    Conflict = 409,
    NotFound = 404,
    Forbidden = 403,
    BadRequest = 400,
    UnprocessableEntity = 422,

    NotImplemented = 501,
    RequestTimedOut = 503,
    InternalServerError = 500
}
