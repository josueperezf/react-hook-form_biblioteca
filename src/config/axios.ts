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

// el interceptor de response esta en un hook que cree llamado useInterceptorAxios, alli manejo los errores de autenticacion y demas

export default clienteAxios;