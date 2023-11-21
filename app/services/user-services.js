//Importing UserModel 
import User from "../models/user.js";


//Method to get user from database
export const search = async (params = {}) => {
    const users = await User.find(params).exec(); //exec() returns promise
    return users;
}

//Method to save user to database
export const save = async (newUser) => {
    const user = new User(newUser);
    return await user.save();
}

//Method to get user from database on the basis of ID
export const find = async (id) => {
    const users = await User.findById(id).exec();
    return users;
}

//Method to update user in the database
export const update = async (id, updatedUser) => {
    const users = await User.findByIdAndUpdate(id, updatedUser).exec();
    return users;
}

//Method to partially update user in the database
export const patch = async (id, updatedUser) => {
    const user = await User.findByIdAndUpdate(id, updatedUser).exec();
    return user;
}

//Method to delete user in the database
export const remove = async (id) => {
    return await User.findByIdAndDelete(id).exec();;
}
