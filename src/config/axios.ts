import axios, {AxiosRequestConfig} from "axios";
const API_URL = process.env.REACT_APP_API_URL;
const clienteAxios = axios.create({
    baseURL: API_URL
});

// esto es para tomar un token si lo hay en el localstorage, para este ejemplo no lo requiere, igual dejo el codigo que puede ser util mas adelante
clienteAxios.interceptors.request.use(function (config: AxiosRequestConfig) {
    const token = localStorage.getItem('token') || null;
    if (token) {
        config.headers = {
            'x-token': token
        }
    } else{
        config.headers = {}
    }
    return config;
});

clienteAxios.interceptors.response.use(response => response,
    error => {
        // alert('hay un error');
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.log(error.response.data);
            console.log(error.response.status);
            console.log(error.response.headers);
            
          } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
            // http.ClientRequest in node.js
            console.log(error.request);
            console.log(error.request.status);
            if (error.request.status === 0) {
                alert('servidor no encontrado');
            }

          } else {
            // Algo sucedió al configurar la solicitud que provocó un error
            console.log('Error', error.message);
          }
        console.log(error.config);
        if (error.response.status === 400) {
            return Promise.reject(error.response.data);
        }
            
    }
);

export default clienteAxios;