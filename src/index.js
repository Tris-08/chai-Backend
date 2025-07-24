//require('dotenv').config({path:'./env'}) //we don't prefer to write this because of inconsistency in code
import dotenv from "dotenv"
import connectDB from "./db/index.js";


dotenv.config({
    path: './env'
})


connectDB()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(` Server is running at port: ${process.env.PORT}`);
    })
})
.catch((err) => {
    console.log("MONGO db connection failed !!!", err);
})


/*
//connecting database using IIFE method (professional approach)
//semicolon is put before for the cleaning process



import express from "express"
const app = express()
;(asyn () => {
    try{
        mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)
        application.on("error",(error) => {
            console.log("ERROR: ",error);
            throw error
        })

        application.listen(process.env.PORT, () => {
            console.log(`App is listening on port ${process.env.PORT}`);
        })

    }catch (error) {
        console.log("ERROR: ",error)
        throw err
    }
})()
    */