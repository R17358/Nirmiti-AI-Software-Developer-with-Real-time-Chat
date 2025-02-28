import mongoose from "mongoose";
import trim from "validator";

const projectSchema = new mongoose.Schema({

    name: {
        type: String,
        // lowercase:true,
        trim: true,
        unique: true,
        required: [true, "Please enter project name"],
        maxLength: [100, "Your project name cannot exceed 100 characters"],
    },
    description: {
        type: String,
        //required: [true, "Please enter project description"],
    },
    category: {
        type: String,
        //required: [true, "Please enter project category"],
        enum: {
            values: [
                "Web Development",
                "Mobile Development",
                "Desktop Development",
                "Game Development",
                "Data Science",
                "Machine Learning",
                "Artificial Intelligence",
                "Cyber Security",
            ],
            message: "Please select correct category for project",
        },
    },
    budget: {
        type: Number,
       // required: [true, "Please enter project budget"],
        maxLength: [5, "Your project budget cannot exceed 5 characters"],
    },
    projectImage: [
        {
            public_id: {
                type: String,
            },
            url: {
                type: String,
            },
        },
    ],
    projectDeadline:{
        type:Date,
    },
    users:[ 
        {
        type: mongoose.Schema.ObjectId,
        ref: "User",
       // required: true,
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now,
    },
    fileTree: {
        type: Object,
        default: {},
    },

});

export const Project = mongoose.model("Project", projectSchema);