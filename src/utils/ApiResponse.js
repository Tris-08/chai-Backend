//here we are not overwriting the file because no file of node js is extending here
class ApiResponse{
    constructor(statusCode, data, message = "Success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
        //this statuscode are standard values that can be learn on server status code
    }
}