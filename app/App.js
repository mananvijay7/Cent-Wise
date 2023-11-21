import cors from "cors"; //Cross origin resource sharing
import express from "express";
import registerRouter from "./routes/index.js";
import mongoose from "mongoose";
import models from "./models/index.js";

//Initailizing app
const initialize = (app) => {

    //Middlemen
    app.use(cors()); //Enable services to use in different domain
    app.use(express.json()); //^
    app.use(express.urlencoded());
    

    //mongoDB connection
    console.log("Before");
    mongoose.connect("mongodb+srv://centwise:centwise12345@cluster0.fopmn2v.mongodb.net/centwise?retryWrites=true&w=majority");
    //mongoose.connect("mongodb+srv://yashlimbodiya:<password>@info-6150-yashvardhan.en7z368.mongodb.net/?retryWrites=true&w=majority");
    console.log("After");

    //Initialize routes
    registerRouter(app);     


}


export default initialize;