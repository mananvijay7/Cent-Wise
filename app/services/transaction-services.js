//Importing TransactionModel
import Transaction from "../models/transaction.js";


export const search = async (params = {}) => {
    const transaction = await Transaction.find(params).exec(); //exec() returns promise
    return transaction;
}


// method for save
export const save = async (newTransaction) => {
    const transaction = new Transaction(newTransaction);
    return await transaction.save();
}


// method for find
export const find = async (id) => {
    const transaction = await Transaction.findById(id).exec();
    return transaction;
}


// method for update
export const update = async (id, updatedTransaction) => {
    const transaction = await Transaction.findByIdAndUpdate(id, updatedTransaction).exec();
    return transaction;
}


// method for partial update
export const patch = async (id, updatedTransaction) => {
    const transaction = await Transaction.findByIdAndUpdate(id, updatedTransaction).exec();
    return transaction;
}

// method for remove
export const remove = async (id) => {
    return await Transaction.findByIdAndDelete(id).exec();;
}
