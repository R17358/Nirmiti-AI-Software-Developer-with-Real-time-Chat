import { Project } from "../schemas/projectSchema.js";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncError from "../middleware/catchAsyncError.js";
import { User } from "../schemas/userSchema.js";

export const createProject = catchAsyncError(async (req, res, next) => {

    try {

        const name = req.body.projectName;
        const description = req.body.projectDesc;
        const category = req.body.projectType;
        const projectDeadline = req.body.projectDeadline;
        const budget = req.body.budget;
        const { projectImage } = req.body;


        const email = req.user.email;       //get the email from auth.js
        const loggedInUser = await User.findOne({ email });
        const userId = loggedInUser._id;

        if (!userId) {
            return next(new ErrorHandler("Please login first", 401));
        }
        const project = await Project.create({
            name,
            description,
            category,
            budget,
            projectImage,
            projectDeadline,
            users: userId
        });

        res.status(201).json({
            success: true,
            project,
        });
    }
    catch (error) {
        return next(new ErrorHandler(error.message, 400)); // Return only error message
    }

});

export const getMyAllProjects = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return res.status(401).json({ success: false, message: "User not Authenticated" })
    }

    const projects = await Project.find({ users: req.user._id });

    res.status(200).json(
        {
            success: true,
            projects,
        }
    )

});

export const getAllProjects = catchAsyncError(async (req, res, next) => {

    try {
        const projects = await Project.find();

        res.status(200).json({
            success: true,
            projects,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message || "Failed to retrieve projects", 500));
    }
});

export const getAllProjectsByUserId = catchAsyncError(async (req, res, next) => {

    try {

        const requestedUserId = req.params.userId;

        const projects = await Project.find({ users: requestedUserId });

        res.status(200).json({
            success: true,
            projects,
        })
    }
    catch (error) {
        return next(new ErrorHandler(error.message || "Failed to retrieve projects", 500));
    }

});

export const getProjectByProjectId = catchAsyncError(async (req, res, next) => {

    try {
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        res.status(200).json({
            success: true,
            project,
        })

    }
    catch (error) {
        return next(new ErrorHandler(error.message || "Failed to retrieve Project", 500));
    }

});

export const addUsersToProject = catchAsyncError(async (req, res, next) => {
    try {
        const projectId = req.params.projectId;
        const { users } = req.body;
        const userId = req.user._id;

        // console.log("Received users:", users);

        if (!users || !Array.isArray(users) || users.length === 0) {
            return next(new ErrorHandler("No users provided or invalid format", 400));
        }

        const project = await Project.findOne({ _id: projectId, users: userId });

        if (!project) {
            return next(new ErrorHandler("Project not found or unauthorized user", 403));
        }

        const updateProject = await Project.findOneAndUpdate(
            { _id: projectId },
            { $addToSet: { users: { $each: users } } }, 
            { new: true }
        );

        if (!updateProject) {
            return next(new ErrorHandler("Failed to update project", 500));
        }

        return res.status(200).json({
            success: true,
            message: "Users added successfully",
            updateProject
        });
    } catch (error) {
        return next(new ErrorHandler(error.message || "Failed to add users to Project", 500));
    }
});



export const usersInProject = catchAsyncError(async (req, res, next) => {

    try {
        const projectId = req.params.projectId;

        const project = await Project.findById(projectId);

        if (!project)
            return next(new ErrorHandler("Project not found", 404));

        const users = await User.find({ _id: { $in: project.users } });

        res.status(200).json({
            success: true,
            users
        });

    }

    catch (error) {
        return next(new ErrorHandler(error.message || "Failed to retrieve users in Project", 500));
    }

});