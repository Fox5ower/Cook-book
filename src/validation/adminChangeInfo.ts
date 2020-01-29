const Validator = require("validator");
const isEmpty = require("is-empty");
import IErrors from "../interfaces/IErrors";

module.exports = function validateInformationInputData(data: any) {
    let errors: IErrors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.name)) {
        errors.name = "Name field is required"
    }

    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}