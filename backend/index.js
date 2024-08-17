import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongoDBURL } from "./config.js";
import booksRoute from "./routes/booksRoute.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// Middleware for handling CORS Policy

// Option 1: Allow ALL Origins with Default of CORS
// app.use(cors());

// Option 2: Allow Custom Origins
app.use(cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type"]
}));

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
