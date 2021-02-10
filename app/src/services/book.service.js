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

const getBook = async (id) => {
    if (localStorage.getItem("token")) {
        const response = await axios
            .get(API_URL + id, { headers: { "x-access-token": localStorage.getItem("token") } });
        console.log(response.data);
        return response.data;
    }
}

const addBook = async (name, author, description) => {
    if (localStorage.getItem("token")) {
        return axios
            .post(API_URL + "add", {
                name,
                author,
                description
            }, {headers: {"x-access-token": localStorage.getItem("token")}});
    }
}

const editBook = async (id, name, author, description) => {
    if (localStorage.getItem("token")) {
        return axios
            .post(API_URL + "edit/" + id, {
                name,
                author,
                description
            }, {headers: {"x-access-token": localStorage.getItem("token")}});
    }
}

const deleteBook = async (id) => {
    if (localStorage.getItem("token")) {
        return axios
            .delete(API_URL + "delete/" + id, {headers: {"x-access-token": localStorage.getItem("token")}});
    }
}

const bookService = {
    getAllBooks,
    addBook,
    getBook,
    editBook,
    deleteBook
};

export default bookService;