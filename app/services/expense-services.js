import Expense from "../models/expense.js";    //importing expense schema

export const save = async (newExpense) => {    //API to save new expense in the database
      const expense = new Expense(newExpense);
      return await expense.save();
}

export const find = async (id) => {             //API to get expense by ID
      const expense = await Expense.findById(id).exec();
      return expense;
}

export const update = async (id, updatedExpense) => {       //API to update existing expense data
      const expense = await Expense.findByIdAndUpdate(id, updatedExpense).exec();
      return expense;
}

export const patch = async (id, updatedExpense) =>  {       //API to partially update existing expense data
      const expense = await Expense.findByIdAndUpdate(id, updatedExpense).exec();
      return expense;
}

export const remove = async (id) => {           //API to delete an expense from database
      return await Expense.findByIdAndDelete(id).exec();
}



