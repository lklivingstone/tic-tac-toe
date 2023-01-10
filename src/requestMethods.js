import axios from "axios";

// const BASE_URL= "http://tic-tac-toe-pxgs.onrender.com/api/";
const BASE_URL= "http://localhost:5000/api/";


export const publicRequest= axios.create({
    baseURL: BASE_URL,
});

