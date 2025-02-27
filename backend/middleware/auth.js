import {User} from "../schemas/userSchema.js";
import jwt from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";


export const isAuthenticatedUser = async (req, res, next) => {
    
    const authHeader = req.headers.authorization;
    if(!authHeader || !authHeader.startsWith("Bearer "))
    {
        return next(new ErrorHandler("Please Login To access this Resource ", 401));
    }
    const token = authHeader.split(" ")[1];

    if(!token)
    {
        return next(new ErrorHandler("Please Login To access this Resource", 401));
    }

    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decodedData.id.toString();
    const user = await User.findById(userId);

    if(!user)
    {
        return next(new ErrorHandler("User not Found ", 404));
    }

    req.user = user;

    next();
};

export const authorizeRoles = (...roles)=>{

    return (req, res, next) =>{
        if(!roles.includes(req.user.role))
        {
            return next(
                new ErrorHandler(
                    `Role: ${req.user.role} is not allowed to access this resource `, 403
                )
            );
        }
        next();
    }
}