import mongoose from "mongoose";
import { IResume } from "../types/resume.types"

const resumeSchema = new mongoose.Schema<IResume>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    title: {
        type: String,
        default: "Untitled Resume",
    },
    jobTitle: {
        type: String,
        default: "",
    },
    level: {
        type: String,
        enum: ["FRESHER", "MID_LEVEL", "EXPERIENCED"],
        default: "FRESHER",
    },
    summary: {
        type: String,
        default: "",
    },
    personalInfo: {
        type: {
            fullname: String,
            email: String,
            mobile: String,
            location: String,
            github: String,
            linkedIn: String,
            portfolio: String,
        },
        default: {
            fullname: "",
            email: "",
            mobile: "",
            location: "",
            github: "",
            linkedIn: "",
            portfolio: ""
        },
    },
    education: {
        type: [
            {
                _id: false,
                institute: String,
                degree: String,
                startDate: String,
                endDate: String,
            },
        ],
        default: [],
    },
    workExperience: {
        type: [
            {
                _id: false,
                company: String,
                position: String,
                startDate: String,
                endDate: String,
                description: String,
            },
        ],
        default: [],
    },
    projects: {
        type: [
            {
                _id: false,
                title: String,
                description: String,
                techStack: [String],
                githubUrl: String,
                liveUrl: String,
            },
        ],
        default: [],
    },
    skills: {
        type: [String],
        default: [],
    },
    certifications: {
        type: [String],
        default: [],
    },
    completionPercentage: {
        type: Number,
        default: 0
    },
    status: {
        type: String,
        enum: ["DRAFT", "COMPLETED"],
        default: "DRAFT"
    }
},
    {
        timestamps: true,
    })

const resumeModel = mongoose.models.resumes || mongoose.model("resumes", resumeSchema)
export default resumeModel