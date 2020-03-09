import IEstimation from "../../interfaces/IEstimation";

export default function updateObject(name: string, object: IEstimation) {
    name = name.trim();
    if (localStorage.getItem(name)) {
        if ((object[0] && !object[1]) || (!object[0] && object[1])) {
            console.log("oneoftwo");
            if (object[0]) {
                console.log("obj0");
                let tempObject = JSON.parse(localStorage.getItem(name));
                tempObject[0] = object[0];
                localStorage.setItem(name, JSON.stringify(tempObject));
            } else if (object[1]) {
                console.log("obj1");
                let tempObject = JSON.parse(localStorage.getItem(name));
                tempObject[1] = object[1];
                localStorage.setItem(name, JSON.stringify(tempObject));
            }
        } else if (object[0] && object[1]) {
            console.log("both");

            localStorage.setItem(name, JSON.stringify(object));
        }
    }
}