import axios from "axios";

export default function tokenInterceptor() {
    axios.interceptors.request.use(config => {
        config.headers = {
            "Access-Control-Allow-Headers": "access-token",
            "access-token": getToken(),
        }
        return config;
    })
}


function getToken(): string | undefined {
    const token: string = localStorage.getItem("token");
    if (token) {
        return token;
    } else {
        return undefined;
    }
}