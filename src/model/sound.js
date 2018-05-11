import mongoose from 'mongoose';

const soundSchema=mongoose.Schema({
    title:{
        type:String,
        required: true,
    },
    createdOn:{
        type: Date,
        default:()=>new Date(),
    },
    
})