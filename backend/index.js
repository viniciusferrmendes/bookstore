import express from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

app.get("/", (req, res) => res.send("Hello World!"));

app.use("/books", booksRoute);

mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to PORT ${PORT}.`);
        });
        console.log("App connected to database!");
    })
    .catch(error => console.log(error));
