import {asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js";
import {User} from "../models/user.model.js"
import {uploadOnCloudinary} from "../utils/cloudinary.js"
import { ApiResponse } from "../utils/ApiResponse.js";

//we are making method for generatetoken and accessstoken

const generateAccessAndRefreshTokens = async(userId) => {
    try{
        const user = await User.findById(userId)
        const accesssToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        user.refreshToken = refreshToken  //we have saved the refreshToken in the database 
        await user.save({ ValidateBeforeSave: false })

        return {accesssToken, refreshToken}

    }catch(error){
        throw new ApiError(500, "Something went wrong while generating refresh and access token ")
    }
}

const registerUser = asyncHandler( async (req,res) => {
    // res.status(200).json({
    //     message: "ok"
    // })
    // get user details from frontend
    //validation - not empty
    //check if user already exists: username, email
    //check for images, check for avatar
    //upload them to cloudinary, avatar
    //create user object - create entry in db
    //remove password and refresh token field from response
    //check for user creation
    //return res


    const {fullName, email, username, password} = req.body
    console.log("email: ", email);

    // if(fullNmae === ""){
    //     throw new ApiError(400, "fullname is required")
    // }

    if(
        [fullName, email, username, password].some((field) => 
        field?.trim() === "")
    ){
        throw new ApiError(400, "All fields are required")
    }
//check user already exist
  const existedUser = await User.findOne({
    $or: [{ username }, { email }]
  })
  if(existedUser){
    throw new ApiError(409, "User with email or username already exist")
  } 
//multer is giving req.files
 const avatarLocalPath =  req.files?.avatar[0]?.path;
 const coverImageLocalPath = req.files?.coverImage[0]?.path;

 if(!avatarLocalPath){
    throw new ApiError(404, "Avatar file is required")
 }

 const avatar = await uploadOnCloudinary(avatarLocalPath)
 const coverImage = await uploadOnCloudinary(coverImageLocalPath)

 if(!avatar){
      throw new ApiError(404, "Avatar file is required")
 }

 const user = await User.create({
    fullName,
    avatar: avatar.url,
    coverImage: coverImage?.url || "",
    email,
    password,
    username: username.tolowerCase()

 })
//mongoDB itself also create this _id uniqely 
 const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"  //this two selected fields will not be considered in checking this 
 )

 if(!createdUser){
    throw new ApiError(500, "Something went wrong while registering the user")
 }

return res.status(201).json(
    new ApiResponse(200, createdUser, "User registered successfully")
)

})

const loginUser = asyncHandler(async (req,res) => {
    //req body -> data
    //username or email
    //find the user
    //password check
    //access and refresh token generated and sent to user
    //send cookie

    const {email, username, password} = req.body

    if(!username || !email){
        throw new ApiError(400, "username or email is not found")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(404, "user not exist")
    }

   const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user credentials")
    }

   const {accesssToken, refreshToken} =  await generateAccessAndRefreshTokens(user._id)

   const loggedInUser = await User.findById(user._id).select("-password -refreshToken")
//to send cookies
   const options = {
       httpOnly: true,   //by making this both true the cookies are only modifiable through server not by frontend
       secure: true,

   }

   return res.status(200).cookie("accessToken", accesssToken, options).cookie("refreshToken", refreshToken, options)
   .json(
    new ApiResponse(200, {user: loggedInUser, accesssToken, refreshToken} , "User loggged in successfully")
   )    
})

const logoutUser = asyncHandler(async(req, res) => {
    User.findById
})



export {
    registerUser,
    loginUser
}