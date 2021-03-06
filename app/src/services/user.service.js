import axios from "axios";
import authHeader from "./auth.header";

const API_URL = "http://localhost:8000/api/user/";

const getAllUsers = async () => {
    if (localStorage.getItem("token")) {
        const response = await axios
            .get(API_URL + "all", { headers: { "x-access-token": localStorage.getItem("token") } });
        console.log(response.data);
        return response.data;
    }
};

const getUser = async (id) => {
    if (localStorage.getItem("token")) {
        const response = await axios
            .get(API_URL + id, { headers: { "x-access-token": localStorage.getItem("token") } });
        console.log(response.data);
        return response.data;
    }
}


const deleteUser = async (id) => {
    if (localStorage.getItem("token")) {
        return axios
            .delete(API_URL + "delete/" + id, {headers: {"x-access-token": localStorage.getItem("token")}});
    }
}
const userService = {
    getAllUsers,
    getUser,
    deleteUser,
};

export default userService;