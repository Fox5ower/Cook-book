export default function (e: React.FormEvent<HTMLInputElement>) {
    e.currentTarget.classList.add("visited")
    if (e.currentTarget.value === "") {
        e.currentTarget.classList.remove("visited");
        e.currentTarget.id = "input-invalid";
    } else {
        e.currentTarget.id = "";
    }
}