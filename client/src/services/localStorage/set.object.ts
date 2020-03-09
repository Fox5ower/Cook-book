import IEstimation from "../../interfaces/IEstimation";

export default function setObject(name: string, object: IEstimation) {
    name = name.trim();
    let existingObj = JSON.parse(localStorage.getItem(name));
    console.log(existingObj)
    if (existingObj) {
        if (existingObj["stars"] !== null && object["stars"] !== null) {
            existingObj["stars"] = object["stars"];
            localStorage.setItem(name, JSON.stringify(existingObj));
        } else if (existingObj["stars"] !== null && object["stars"] === null) {
            object["stars"] = existingObj["stars"];
            localStorage.setItem(name, JSON.stringify(object))
        } else {
            localStorage.setItem(name, JSON.stringify(object))
        }
    } else {
        console.log(object);
        localStorage.setItem(name, JSON.stringify(object))
    }
}