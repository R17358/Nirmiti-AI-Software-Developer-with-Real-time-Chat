import jwt from "jsonwebtoken";

const sendToken = (user, statusCode, res)=>{
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET);

    const options = {
        expires: new Date(
            Date.now() + (process.env.JWT_EXPIRE *24*60*60*1000)
        ),
        httpOnly:true,
    };

    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        user,
        token
    });
};

export default sendToken;