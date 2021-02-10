import axios from "axios";

const API_URL = "http://localhost:8000/api/reservation/";

const getAllReservations = async () => {
    if (localStorage.getItem("token")) {
        const response = await axios
            .get(API_URL + "all", { headers: { "x-access-token": localStorage.getItem("token") } });
        console.log(response.data);
        return response.data;
    }
};

const addReservation = async (bookId, userId) => {
    if (localStorage.getItem("token")) {
        return axios
            .post(API_URL + "add", {
                bookId, userId
            }, {headers: {"x-access-token": localStorage.getItem("token")}});
    }
}

const getReservation = async (id) => {
    if (localStorage.getItem("token")) {
        const response = await axios
            .get(API_URL + id, { headers: { "x-access-token": localStorage.getItem("token") } });
        console.log(response.data);
        return response.data;
    }
}


const deleteReservation = async (id) => {
    if (localStorage.getItem("token")) {
        return axios
            .delete(API_URL + "delete/" + id, {headers: {"x-access-token": localStorage.getItem("token")}});
    }
}
const reservationService = {
    getAllReservations,
    addReservation,
    getReservation,
    deleteReservation,
};

export default reservationService;