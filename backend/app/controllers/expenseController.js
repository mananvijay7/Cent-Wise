import * as expenseService from '../services/expense-services.js';
import Expense from '../models/ExpenseSchema.js';

export const addExpense = async function(request, response){
      try {

            const expenseDocuments = await expenseService.addExpense(request); 
        
            //console.log(userDocuments);
            // Respond with a success message
            // console.log("Friends");
            // console.log(expenseDocument);
            return response.json({ message: 'Expense created successfully', expenseDocuments });
          } catch (error) {
            // Handle errors
            console.error('Error creating Expense:', error);
            return response.json({ message: 'Internal Server Error' });
          }
}

export const fetchFriend = async function(request, response){
  try {
    const { expenseType } = request.query;
    const userId = request.user._id;
    const expenses = await Expense.find({ expenseType: 'Individual', 'usersInvolved.user': userId, });

            // console.log("Groups");
            // console.log(expenses);

    return response.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error.message);
    return response.status(500).json({ error: 'Internal Server Error' });
  }
}

export const fetchGroup = async function(request, response){
  try {
    const { expenseType } = request.query;
    const userId = request.user._id;
    const expenses = await Expense.find({ expenseType: 'Group', 'usersInvolved.user': userId, });

    response.json(expenses);
  } catch (error) {
    console.error('Error fetching expenses:', error.message);
    response.status(500).json({ error: 'Internal Server Error' });
  }
}
