import mongoose from "mongoose";

let ResturantSchema = mongoose.Schema({
    resturentname:String,
    imagelink:String,
    location:String,
    rating:Number,
    userid:String
    
   
})

if( mongoose.models["resturents"]){
    delete  mongoose.models["resturents"]

}

export const ResturantModel = mongoose.model("resturents",ResturantSchema)