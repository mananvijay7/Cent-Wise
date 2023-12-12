import Expense from '../models/ExpenseSchema.js';
import User from '../models/UserSchema.js';
import Group from '../models/GroupSchema.js';

export const addExpense = async (request) => {
            try {
                  //console.log(request.body);
                  const { payer, description, usersInvolved, groupInvolved, amount, created_by, partition, expenseType } = request.body; 
                  let currUser;
                  if(payer === 'You'){
                     currUser = await User.findById(request.user._id).exec();
                  }
                  else{
                    currUser = await await User.findOne({ first_name: payer });
                  }
                  const expenseData = {
                    Payer: currUser._id,  // Assuming created_by is the user who pays
                    description,
                    usersInvolved: [],
                    groupInvolved: [],
                    amount,
                    created_by,
                    partition,
                    expenseType,
                  };

                  if (groupInvolved === '' && usersInvolved.length > 0) {
                    const usersInfo = await User.find({ first_name: { $in: usersInvolved } });
                    
                    // console.log('usersInfo');
                    // console.log(usersInfo);

                    if (usersInfo && usersInfo.length > 0) {
                      usersInfo.forEach(user => {
                        // console.log('user');
                        // console.log(user);
                        expenseData.usersInvolved.push({
                          user: user._id,
                          user_first_name: user.first_name,
                          user_last_name: user.last_name,
                          paidShare: 0, //algo left part
                          owedShare: 0, //algo left part
                        });
                      });
                    } else {
                      console.log('No users found.');
                    }
                    

                    //console.log(usersInfo);
                  } else {
                    const groupInfo = await Group.findOne({ description: groupInvolved });

                    console.log('groupInfo');
                    console.log(groupInfo);

                    if (groupInfo) {
                      // console.log("Group found:");
                      // console.log("Description:", groupInfo.description);
                      // console.log("Users:");
                  
                      groupInfo.users.forEach(user => {
                          console.log("User ID:", user.user._id);
                          console.log("User First Name:", user.user.first_name);
                          // Add any other user properties you want to display
                          expenseData.usersInvolved.push({
                            user: user._id,
                            user_first_name: user.first_name,
                            user_last_name: user.last_name,
                            paidShare: 0, //algo left part
                            owedShare: 0, //algo left part
                          });
                      });
                  } else {
                      console.log("Group not found.");
                  }
                    // Handle other cases or return an empty array if needed
                    console.log([]);
                  }

                  const expense = new Expense(expenseData);
                  

                  console.log('expense Data');
                  //console.log(peopleInvolved);

                  console.log(expenseData);
              
                  
              
                  // Use Mongoose to create a new expense
                  //const createdExpense = await Expense.create(expenseData);
              
                  // console.log('Expense added successfully:', createdExpense);
                  //response.status(201).json(createdExpense);
                } catch (error) {
                  // Handle errors
                  console.error('Error adding expense:', error.message);
                  //response.status(500).json({ error: 'Internal Server Error' });
                }  
      
};