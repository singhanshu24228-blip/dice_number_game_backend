import mongoose from "mongoose";
const modalSchema = new mongoose.Schema({
    item: {
        type: String},
    price:{
        type: String},
    totalScore:{
        type: Number
    },
    no:{
        type: Number},
    })
    export const Modal= mongoose.model('Modal',modalSchema);
