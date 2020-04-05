export default function logout() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        return true;
    }
}