import axios from "axios";

const httpService = {
    get: axios.get,
    post: axios.post,
    put: axios.put,
    delete: axios.delete,
};

export default httpService;

// export const base_url = "http://localhost:9002";
export const base_url = "https://cipher-school-assignment-backend.vercel.app";