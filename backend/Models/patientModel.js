const mongoose = require("mongoose");

const patientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true
        },
        password:{
        type: String, 
        required: true 
        },
        role:{
                type:String,
                default:"patient",
        },
    phoneNo: { 
        type: String, 
        required: true 
        },
    // age: { 
    //     type: Number,
    //     // required:true,
    //     },
    // dateOfBirth: { 
    //     type: Date 
    //     },
    // gender: { 
    //     type: String, 
    //     enum: ["Male", "Female", "Other"] 
    //     },
    // medicalHistory: [
    //     { type: String }
    //     ], // List of past conditions
    // lastVisited: { type: Date },
}, { timestamps: true });


const patient = mongoose.model("patient",patientSchema);

module.exports = patient;