import mongoose from "mongoose";
import { IResume } from "../types/resume.types"

const resumeSchema = new mongoose.Schema<IResume>({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true,
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
            portfolio: String,
        },
        default: {},
    },
    education: {
        type: [
            {
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
},
    {
        timestamps: true,
    })

const resumeModel = mongoose.models.resumes || mongoose.model("resumes", resumeSchema)
export default resumeModel