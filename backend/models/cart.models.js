import e from "express";
import mongoose from "mongoose";

const cartItemSchema=mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    item:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true
    },

    quantity:{
        type: Number,
        required: true,
        min: 1,
        default: 1
    },

    
},{timestamps:true});


export const CartItem = mongoose.model("CartItem", cartItemSchema);