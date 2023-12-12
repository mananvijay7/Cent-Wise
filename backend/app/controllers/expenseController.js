import * as expenseService from '../services/expense-services.js';

export const addExpense = async function(request, response){
      try {

            console.log("In expense controller");
            const userDocuments = await expenseService.addExpense(request);
        
            //console.log(userDocuments);
            // Respond with a success message
            response.status(200).json({ message: 'Group created successfully', group: userDocuments });
          } catch (error) {
            // Handle errors
            console.error('Error creating group:', error);
            response.status(500).json({ message: 'Internal Server Error' });
          }
}
