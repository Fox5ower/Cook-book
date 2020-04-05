export default function isLoggedIn() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    if (user && token) {
        return true;
    } else {
        return false;
    }
}