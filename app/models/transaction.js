//Creating Group Schema

import mongoose, { trusted } from "mongoose";

const Schema = mongoose.Schema;

const TransactionSchema = new Schema({
    payer_id: {
        type: String,
        required: true,
        unique: true
    },
    payee_id: {
        type: String,
        required: true,
        unique: true
    },
    t_amount: {
        type: Number,
        required: true,
       
    },
    t_date: {
        type: Date,
        required: true,
    
    },
    
    expense: {
        type: String,
        required: true,
        unique: true,
    }
     
},
{
    versionKey: false
});

const TransactionModel = mongoose.model('transaction', TransactionSchema);

export default TransactionModel;