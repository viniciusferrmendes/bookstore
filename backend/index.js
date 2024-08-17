import express, { response } from "express";
import mongoose from "mongoose";
import { PORT, mongoDBURL } from "./config.js";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json());

// --------------- HOME ---------------
app.get("/", (req, res) => {
    console.log(req);
    return res.send("Hello World!");

});

// --------------- CREATE ---------------
app.post("/books", async (req, res) => {
    try {
        if (!req.body.title || !req.body.author || !req.body.publishYear) {
            return res.status(400).send({
                message: "Send all required fields: title, author and publish year."
            });
        }

        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear
        };

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch (error) {
        console.log(error);
    }
});

// --------------- READ ---------------
app.get("/books", async (req, res) => {
    try {
        const books = await Book.find({});

        return res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
});

mongoose.connect(mongoDBURL)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`App is listening to PORT ${PORT}.`);
        });
        console.log("App connected to database!");
    })
    .catch(error => console.log(error));
