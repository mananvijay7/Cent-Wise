import * as transactionServices from "../services/transaction-services.js";
import { setResponse, setErrorResponse } from "./response-handler.js";

//getting transaction records by parameters
export const findByParams = async (request, response) => {
    try {
        const params = {...request.query}; 
        const transaction = await transactionServices.search(params);
        setResponse(transaction, response);

    } catch (error) {
        setErrorResponse(error, response, "find");
    }
}

//post method: for creating transaction records
export const post = async (request, response) => {
    try {
       const newTransaction = {...request.body};
       console.log(newTransaction);
       const transaction = await transactionServices.save(newTransaction);
       console.log(transaction);
       setResponse(transaction, response);

    } catch (error) {
        setErrorResponse(error, response, "post");
    }
}

// fetching transaction record using id
export const findById = async(request, response) => {
    try {
        const id = request.params.id;
        console.log(id);
        const transaction = await transactionServices.find(id);
        setResponse(transaction, response);
    } catch (error) {
        setErrorResponse(error, response, "get");
    }
}

// put method:  to update data for a transaction
export const put = async(request, response) => {
    try {
        const id = request.params.id;
        const updatedTransaction = {...request.body};
        const transaction = await transactionServices.update(id, updatedTransaction);
        setResponse(transaction, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}


// patch method: to update transaction data partially
export const patch = async(request, response) => {
    try {
        const id = request.params.id;
        const updatedTransaction = {...request.body};
    
        const transaction = await transactionServices.patch(id, updatedTransaction);
        setResponse(transaction, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

//  delete method: to delete transaction data
export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const transaction = await userServices.remove(id);
        setResponse({"transactionDeleted":true}, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}


 
