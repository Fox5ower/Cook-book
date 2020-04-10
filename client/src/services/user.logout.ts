export default function logout() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");
    const user_id = localStorage.getItem("user_id");

    if (user && token && user_id) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        localStorage.removeItem("user_id");
        return true;
    }
}