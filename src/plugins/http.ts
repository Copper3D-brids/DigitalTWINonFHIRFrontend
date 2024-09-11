import axios, {type AxiosRequestConfig} from "axios";

const Base_URL = import.meta.env.VITE_API_URL;

const maxRetries = 3
const retryDelay = 1000;
axios.defaults.baseURL = Base_URL;
axios.interceptors.request.use((config: AxiosRequestConfig | any) => config);
axios.interceptors.response.use(
    (res) => {
        return res;
    },
    (err) => {
        return Promise.reject(err);
    }
)

interface IHttp {
    get<T>(url:string, params?: unknown): Promise<T>;
    post<T>(url:string, body?: unknown): Promise<T>;
    getBlob<T>(url:string, params?: unknown): Promise<T>;
}

const http: IHttp = {
    get(url, params) {
        return new Promise((resolve, reject)=>{
            axios
                .get(url, { params })
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    getBlob(url, params) {
        return new Promise((resolve, reject) =>{
            axios
                .get(url, { params, responseType: "blob"})
                .then((res) => {
                    // const x_header_str = res.headers["x-header"];
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    },
    post(url, body) {
        return new Promise((resolve, reject) => {
            axios
                .post(url, body)
                .then((res) => {
                    resolve(res.data);
                })
                .catch((err) => {
                    reject(err);
                })
        })
    }
}

export default http;