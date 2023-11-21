import * as expenseServices from "../services/expense-services.js";           //importing all expense services
import { setResponse, setErrorResponse } from "./response-handler.js";        //exporting response handler for success and failure scenario


export const post = async (request, response) => {                            //Post method to create new data
      try{
            const newExpense = {...request.body};
            const expense = await expenseServices.save(newExpense);
            setResponse(expense, response);
      }catch(error){
            setErrorResponse(error, response, "post");
      }
}

export const get = async (request, response) => {                             //Get method to get data from the database
      try{
            const id = request.params.id;
            const expense = await expenseServices.find(id);
            setResponse(expense, response);
      }catch(error){
            setErrorResponse(error, response, "get");
      }
}

export const updateAll = async (request, response) => {                       //Update method to update all the fields of choosen specific data
      try{
           const id = request.params.id;
           const updatedExpense = {...request.body};

           const expense = await expenseServices.update(id, updatedExpense);
           setResponse(expense, response);
      }catch(error){
            setErrorResponse(error, response);
      }
}

export const update = async(request, response) => {                           //Partially update the selected field of the choosen specific data
      try{
            const id = request.params.id;
            const updatedExpense = {...request.body};

            const expense = await expenseServices.patch(id, updatedExpense);
            setResponse(expense, response);
      }catch(error){
            setErrorResponse(error, response);
      }
}

export const deleteExpense = async (request, response) => {                   //Delete the data specific to ID
      try{
            const id = request.params.id;
            const expense = await expenseServices.remove(id);
            setResponse({"Delete": true}, response);
      }catch(error){
            setErrorResponse(error, response);
      }
}