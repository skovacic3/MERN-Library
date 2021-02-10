import axios from "axios";

const API_URL = "http://localhost:8000/api/auth/";

const register = (username, email, password) => {
    return axios.post(API_URL + "signup", {
        username,
        email,
        password,
    });
};

const login = (username, password) => {
    return axios
        .post(API_URL + "signin", {
            username,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("token", response.data.accessToken);
            }
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("token");
};

const getCurrentUser = async () => {
    if (localStorage.getItem("token")) {
        const response = await axios
            .get(API_URL + "me", { headers: { "x-access-token": localStorage.getItem("token") } });
        return response.data;
    }
};

const isAdmin = async () => {
    if (localStorage.getItem("token")) {
        const response = await axios
            .get(API_URL + "isAdmin", { headers: { "x-access-token": localStorage.getItem("token") } });
        console.log(response.data.valid);
        return response.data.valid;
    }
};

const AuthService = {
    register,
    login,
    logout,
    getCurrentUser,
    isAdmin
};

export default AuthService;