import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
            //if any field is used for searching field then you can enable it by making it true for optimised search in DB
            index: true  
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true
        },
        fullName: {
            type: String,
            required: true,
            trim: true,
            index: true
        },
        avatar: {
            type: String,  //cloudinary url
            required: true
        },
        coverImage: {
            type: String, //Cloudinary url
        },
         password: {
            type: String,
            required: [true, 'Password is required']
        },
        refreshTooken: {
            type: String
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "Video"
            }
        ]
    }, 
    {
        timestamps: true,
    }
)
//before saving of data we need to run this hook to encrypt
userSchema.pre("save", async function (next) {   //because it is middleware we need to move next with help of next flag!
    if(!this.isModified("password"))return next();
    this.password = await bcrypt.hash(this.password, 10)  //10 is the number of rounds used in the encryption process.
    next()

})

userSchema.methods.isPasswordCorrect = async function (password) {
  return  await bcrypt.compare(password, this.password)
} 

userSchema.methods.generateAccessToken = function(){
   return jwt.sign(
        {
        _id: this._id,
        email: this.email,
        username: this.username,
        fullName: this.fullName
        },
    process.env.ACCESS_TOKEN_SECRET,
    {
       expireIn: process.env.ACCESS_TOKEN_EXPIRY
    }
   )
}
userSchema.methods.generateRefreshToken = function(){
     return jwt.sign(
        {
        _id: this._id
        },
    process.env.REFRESH_TOKEN_SECRET,
    {
       expireIn: process.env.REFRESH_TOKEN_EXPIRY
    }
   )
}

export const User = mongoose.model("User", userSchema)