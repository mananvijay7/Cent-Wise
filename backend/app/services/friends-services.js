import User from '../models/UserSchema.js';

export const findUser = async (email) => {
      const user = await User.findOne({email: email});
      return user;
}

export const findUserById = async (id) => {
      const user = await User.findById(id).exec();
      return user;
}