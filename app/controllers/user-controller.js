import * as userServices from "../services/user-services.js";
import { setResponse, setErrorResponse } from "./response-handler.js";


export const findByParams = async (request, response) => {
    try {
        const params = {...request.query}; 
        const users = await userServices.search(params);
        setResponse(users, response);

    } catch (error) {
        setErrorResponse(error, response, "find");
    }
}

export const post = async (request, response) => {
    try {
       const newUser = {...request.body};
       console.log(newUser);
       const user = await userServices.save(newUser);
       console.log(user);
       setResponse(user, response);

    } catch (error) {
        setErrorResponse(error, response, "post");
    }
}

export const findById = async(request, response) => {
    try {
        const id = request.params.id;
        console.log(id);
        const user = await userServices.find(id);
        setResponse(user, response);
    } catch (error) {
        setErrorResponse(error, response, "get");
    }
}

export const put = async(request, response) => {
    try {
        const id = request.params.id;
        const updatedUser = {...request.body};
        const user = await userServices.update(id, updatedUser);
        setResponse(user, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const patch = async(request, response) => {
    try {
        const id = request.params.id;
        const updatedUser = {...request.body};
    
        const user = await userServices.patch(id, updatedUser);
        setResponse(user, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}

export const remove = async(request, response) => {
    try {
        const id = request.params.id;
        const user = await userServices.remove(id);
        setResponse({"userDeleted":true}, response);
    } catch (error) {
        setErrorResponse(error, response);
    }
}