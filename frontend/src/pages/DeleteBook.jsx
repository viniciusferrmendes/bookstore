import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import Spinner from "../components/Spinner";

const DeleteBook = () => {

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();

    const handleDeleteBook = () => {
        setLoading(true);
        axios
            .delete(`http://localhost:5555/books/${id}`)
            .then(() => {
                setLoading(false);
                navigate("/");
            })
            .catch(error => {
                setLoading(false);
                alert("An error happened. Please check the console!");
                console.log(error);
            })
    };

    return (
        <div className="p-4">
            <BackButton />
            <h1 className="text-3x1 my-4">DeleteBook</h1>
            {loading ? <Spinner /> : ""}
            <div className="flex flex-col items-center border-2 border-sky-400 rounded-xl w-[600px] p-8 mx-auto">
                <h3 className="text-2x1" >Are you sure you want to delete this book?</h3>
                <button className="p-4 bg-red-600 text-white m-8 w-full" onClick={handleDeleteBook}>Yes, delete it!</button>
                <button className="p-4 bg-gray-600 text-white m-8 w-full" onClick={() => navigate("/")}>Cancel</button>
            </div>
        </div>
    );
};

export default DeleteBook;
