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

const getPublicContent = () => {
    return axios.get(API_URL + "all");
};

const getUserBoard = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
    return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};

const userService = {
    getAllUsers
};

export default userService;