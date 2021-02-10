import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8000/api/book/";

const getAllBooks = async () => {
    if (localStorage.getItem("token")) {
        const response = await axios
            .get(API_URL + "all", { headers: { "x-access-token": localStorage.getItem("token") } });
        console.log(response.data);
        return response.data;
    }
};

const bookService = {
    getAllBooks,
};

export default bookService;