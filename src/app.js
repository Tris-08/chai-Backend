import express from "express"
import cors from "cors"
import cookieParser  from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

//json form of data is accepted
app.use(express.json({limit: "16kb"}))
//config for accepting data that is coming from url
app.use(express.urlencoded({extended: true, limit: "16kb"}))
//static stores the files, folders, pdf, images
app.use(express.static("public"))
app.use(cookieParser())

export { app }