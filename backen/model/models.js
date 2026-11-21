const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        maxlength: 10,
       required: true
    },
    email: {
        type: String,
        unique: true,
        required:true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "moderator", "user"],
      default: "user"
    },
   
}, { timestamps: true })



const TaskResourceSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
         trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    


},{timestamps:true})


const User= mongoose.model("User", UserSchema)

const Task = mongoose.model("Task", TaskResourceSchema)
module.exports = {
    User,
    Task
}