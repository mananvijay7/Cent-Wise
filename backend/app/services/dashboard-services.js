import User from '../models/UserSchema';
import Expense from '../models/ExpenseSchema';
import Group from '../models/GroupSchema';
import participantSchema from '../models/ParticipantsSchema';


export const fetchUserData = async (id) => {
      const users = await User.findById(id).exec();
      return users;
  }
