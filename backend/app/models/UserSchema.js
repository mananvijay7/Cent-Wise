import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const UserSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  ph_no: {
    type: String,
    //required: true,
    //unique: true,
  },
  created_date:{
    type: Date,
    default: Date.now,
},
verified:{
 type:Boolean
},
totalOweAmount: {
  type: Number,
  default: 0
},
totalOweToSelf: {
  type: Number,
  default: 0
},
totalBalance: {
  type: Number,
  default: 0
},
  friends: [
    {
    friend: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    amountInDeal: {
      type: Number,
      default: 0
    }
  }
  ],
  expenses: [
    {
      expense: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Expense',
      },
    }
  ],
});

const User = mongoose.model('User', UserSchema);

export default User;