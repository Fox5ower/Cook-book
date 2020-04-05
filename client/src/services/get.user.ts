import isLoggedIn from "./is.logged.in";

export default function getUser() {
    if (isLoggedIn()) {
        const name: string = localStorage.getItem("user");
        const token: string = localStorage.getItem("token");
        return {
            name: name,
            token: token
        };
    }
}