import Expense from '../models/ExpenseSchema.js';
import User from '../models/UserSchema.js';
import Group from '../models/GroupSchema.js';

export const addExpense = async (request) => {
            try {
                  const { description, amount, selectedFriend, selectedPeople } = request.body;
              
                  // Create an expenseData object to send in the request
                  const expenseData = {
                    Payer: selectedFriend,
                    description: description,
                    amount: amount,
                    peopleInvolved: selectedPeople,
                  };

                  console.log('selectedPeople');
                  console.log(selectedPeople);
              
                  // Determine if it's a group or individual expense
                  // if (selectedPeople.length === 1) {
                  //   // Individual expense
                    
                  //   expenseData.usersInvolved = selectedPeople.map((user) => ({
                  //     user,
                  //     paidShare: 0,
                  //     owedShare: 0,
                  //     user_first_name: '', // You may need to fetch user details here
                  //     user_last_name: '',
                  //   }));
                  // } else {
                  //   // Group expense
                  //   expenseData.groupInvolved = selectedPeople.map((group) => ({
                  //     group,
                  //     group_name: '', // You may need to fetch group details here
                  //   }));
                  // }
              
                  // Use Mongoose to create a new expense
                  const createdExpense = await Expense.create(expenseData);
              
                  console.log('Expense added successfully:', createdExpense);
                  res.status(201).json(createdExpense);
                } catch (error) {
                  // Handle errors
                  console.error('Error adding expense:', error.message);
                  res.status(500).json({ error: 'Internal Server Error' });
                }  
      
};