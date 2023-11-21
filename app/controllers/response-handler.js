//Function to set response
export const setResponse = (data, response) => {
    response.status(200)
        .json(data);
}

//Function to show error message
export const setErrorResponse = (err, response, method) => {
    response.status(500)
        .json({
            code: "ServiceError",
            message: `Error occured while processing your request. ${err}`
        })
}