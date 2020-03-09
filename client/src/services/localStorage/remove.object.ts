export default function removeObject(name: string) {
    name = name.trim();
    localStorage.removeItem(name)
}