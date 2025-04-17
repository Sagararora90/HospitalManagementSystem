const mongoose = require("mongoose");

const doctorSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
        },
    email: { 
        type: String, 
        required: true, 
        unique: true 
        },
         password: { 
        type: String, 
        required: true, 
        },
    phoneNo: { 
        type: String, 
        required: true 
        },
    specialization: { 
        type: String, 
        required: true 
        },
        age:{
            type:Number,
            required:true,
        },
    experience: { type: Number },
    gender:{
        type:String,
        required:true,
    } ,
      role:{
                type:String,
                default:"doctor",
        }// In years
    // availability: { 
    //     type: Boolean, 
    //     default: true 
    //     },
    // patients: [
    //     { type: mongoose.Schema.Types.ObjectId,
    //      ref: "Patient" 
    //      }
    //      ], // List of patient IDs
}, { timestamps: true });


const doctor = mongoose.model("doctor",doctorSchema);

module.exports = doctor;