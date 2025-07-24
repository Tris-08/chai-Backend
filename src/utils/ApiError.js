class ApiError extends Error{
    //we are here overwriting the constructor
    constructor(
        statusCode,
        message= "Something went wrong",
        errors = [],         //for showing multiple error array is passed to error
        stack = ""

    ){
        //overwriting the constructor method
        super(message)
        this.statusCode = statusCode
        this.data = null
        this.message = message
        this.success = false
        this.errors = errors

        if(stack){
            this.stack = stack
        }else{
            Error.captureStackTrace(this, this.constructor)
        }
    }
}

export {ApiError}