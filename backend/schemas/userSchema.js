import mongoose from "mongoose";
import validator from "validator";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: [true, "Please enter your name"],
        maxLength: [30, "Your name cannot exceed 30 characters"],
        minLength: [2, "Your name must be at least 2 characters"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email address"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minLength: [2, "Your password must be at least 2 characters"],
        select: false,
    },
    avatar: {
        public_id: {
            type: String,
        },
        url: {
            type: String,
        },
    },
    role:{
        type: String,
        default: "admin",
    },
    createdAt:{
        type: Date,
        default: Date.now,
    },
});


userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
  };

export const User =  mongoose.model("User", userSchema);