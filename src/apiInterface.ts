import axios from "axios";

 const apiInterface = axios.create({
    baseURL: "https://localhost:5000",
    headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET,PUT,POST,DELETE,PATCH,OPTIONS',
        "Content-Type": "application/json",
        "accept": "/"
    }
  })

  export default apiInterface;