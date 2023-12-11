import mongoose from 'mongoose';
import participant from './ParticipantsSchema';

const Schema = mongoose.Schema;

const ExpenseSchema = new Schema({
      Payer:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        usersInvolved: [
            {
            user: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'User',
            },
            paidShare: {
              type: Number,
              default: 0
            },
            owedShare: {
                type: Number,
                default: 0
              },
            user_first_name: {
              type: String,
            },
            user_last_name: {
              type: String,
            },
          }
          ],
          groupInvolved: [
            {
            group: {
              type: mongoose.Schema.Types.ObjectId,
              ref: 'Group',
            },
            group_name: {
              type: Number,
              default: 0
            },
          }
          ],
        amount: {
            type: Number,
            required: true
        },
        currency: {
            type: String,
            required: true
        },
        created_by:{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        created_date:{
            type: Date,
            default: Date.now,
        },
        partition: [
            {
                type: String,
                required: true
            }
        ],

});

const Expense = mongoose.model('Expense', ExpenseSchema);

export default ExpenseSchema;
