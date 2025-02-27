import ErrorHandler from "../utils/errorHandler.js";
import {User} from "../schemas/userSchema.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import sendToken from "../utils/jwtToken.js";

export const registerUser = catchAsyncError( async (req, res) => {

    const { name, email, password } = req.body;

    let user = await User.findOne({ email });
    
    if (user) {
        return next(new ErrorHandler("Email already exists", 400));
    }

    user = await User.create({
        name,
        email,
        password,
    });

    sendToken(user, 201, res);

});


export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return next(new ErrorHandler("Please Enter Email & Password", 400));
    }
  
    const user = await User.findOne({ email }).select("+password");
  
    if (!user) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    const isPasswordMatched = await user.comparePassword(password);
  
    if (!isPasswordMatched) {
      return next(new ErrorHandler("Invalid email or password", 401));
    }
  
    sendToken(user, 200, res);
  });

  export const logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
  });

  export const getAllUsers = catchAsyncError(async(req,res,next)=>{

    try{  
      const users = await User.find();
      res.status(200).json({
        success:true,
        users
    })
    }
    catch(error)
    {
      return next(new ErrorHandler(error.message||"Failed to retrieve users", 500));
    }
    
  });

  export const getUserById = catchAsyncError(async(req,res,next)=>{
    
   try{
      const user = await User.findById(req.user._id);

      res.status(200).json({
        success: true,
        user
      });
   }
   catch(error)
   {
    return next(new ErrorHandler(error.message||"Failed to retrieve user", 500));
   }
   
  })