import express from "express";
import initialize from "./app/App.js";

//Creating express framework instance
const app = express();

//Setting up port
const port = 3000;

//Initializing app
initialize(app);


app.get("/", (request, response) => response.send("Hello World"));

app.listen(port, () => console.log(`Server is listening at port ${port}`)); //Port number and callback function