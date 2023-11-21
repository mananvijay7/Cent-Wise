import mongoose, { trusted } from "mongoose"; //importing mongoose

const Schema = mongoose.Schema;               //Decalaring Schema

const ExpenseSchema = new Schema({            //Initializing Schema
      e_description: {
            type: String,
            required: true
      },
      e_amount: {
            type: Number,
            required: true
      },
      currency: {
            type: String,
            required: true
      },
      e_createdBy: {
            type: String,
            required: true
      },
      group: {
            type: String
      },
      user: {
            type: String,
            required: true
      },
      e_date: {
            type: Date,
            required: true
      },
      e_partition: {
            type: String,
            required: true
      }
},
{
      versionKey: false
});

const ExpenseModel = mongoose.model('expense', ExpenseSchema);          //creating model in mongoose

export default ExpenseModel;              //exporting model