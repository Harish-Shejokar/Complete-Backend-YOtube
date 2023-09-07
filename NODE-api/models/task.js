import mongoose from "mongoose";

//createing schema first

const Schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:true,
    },
    isCompleted: {
        type: Boolean,
        default:false
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Users",
        required:true
    },
    createdAT: {
        type: Date,
        default:Date.now
    }
});


//creating model or collection
export const Task = new mongoose.model("Task", Schema);