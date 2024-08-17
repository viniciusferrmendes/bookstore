import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";

const app = express();

app.get("/", (req, res) => {
    console.log(req);
    return res.send("Hello World!");

});


mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to PORT ${PORT}.`);
        });
        console.log("App connected to database!");
    })
    .catch(error => console.log(error));
