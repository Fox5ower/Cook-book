export default function setUser(name: string, id: string) {
    localStorage.setItem("user", name);
    localStorage.setItem("user_id", id);
}