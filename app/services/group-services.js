//Importing GroupModel 
import Group from "../models/group.js";


export const search = async (params = {}) => {
    const group = await Group.find(params).exec(); //exec() returns promise
    return group;
}

// method for save
export const save = async (newGroup) => {
    const group = new Group(newGroup);
    return await group.save();
}

// method for find
export const find = async (id) => {
    const group = await Group.findById(id).exec();
    return group;
}

// method for update
export const update = async (id, updatedGroup) => {
    const group = await Group.findByIdAndUpdate(id, updatedGroup).exec();
    return group;
}

// method for partial update
export const patch = async (id, updatedGroup) => {
    const group = await Group.findByIdAndUpdate(id, updatedGroup).exec();
    return group;
}

// method for remove
export const remove = async (id) => {
    return await Group.findByIdAndDelete(id).exec();
}