let badRequest = {"code": 400, "message": "Bad Request: CustomerID is required in parameter"};
let notFound = {"code": 404, "message": "Not Found: no user found with given CustomerID"};
let internalServerError = {"code": 500, "message": "Internal Server Error"};

module.exports = { badRequest, notFound, internalServerError };
