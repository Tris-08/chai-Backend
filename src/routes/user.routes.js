import {Router} from "express";
import { registerUser } from "../controllers/user.controller.js";
import {upload} from "../middlewares/multer.middleware.js"

const router = Router()
//here userRouter will come

router.route("/register").post(upload.fields([
    {
    name: "avatar",
    maxCount: 1 //1 file is only accepted
    },
    {
        name: "coverImage",
        maxCount: 1

    }
]),
registerUser
)


export default router