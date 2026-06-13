import { UserDocumnet } from "@/types/user.interface";
import mongoose from "mongoose";
import bcrypt from "bcrypt"

const userSchema = new mongoose.Schema<UserDocumnet>({
    name: {
        type: String,
        required: [true, "name is required"],
        trim: true
    },
    email: {
        type: String,
        required: [true, "email is required"],
        trim: true
    },
    password: {
        type: String,
        required: [true, "password is required"],
        minLength: [6, "Atleast 6 character requires"]
    },
    mobile: {
        type: String,
        required: [true, "mobile is required"],
        minLength: [10, "minimum 10 charactors required"],
        maxLength: [10, "maximum 10 charactors required"]
    }
}, { timestamps: true })


userSchema.pre("save", function () {
    if (!this.isModified("password")) return
    this.password = bcrypt.hashSync(this.password, 10)
})

userSchema.methods.comparePassword =  function (candidtePassword:string) {
    return  bcrypt.compareSync(candidtePassword , this.password)
}
const userModal = mongoose.models.users || mongoose.model("users", userSchema)
export default userModal