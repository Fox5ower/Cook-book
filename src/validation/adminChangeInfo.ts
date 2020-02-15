const Validator = require("validator");
const isEmpty = require("is-empty");
import IErrors from "../interfaces/IErrors";

module.exports = function validateInformationInputData(data: any) {
    let errors: IErrors = {};

    data.name = !isEmpty(data.name) ? data.name : "";
    data.email = !isEmpty(data.email) ? data.email : "";

    if (Validator.isEmpty(data.name) && Validator.isEmpty(data.email)) {
        errors.information = "At least 1 field is required"
    }

    if (Validator.isEmpty(data.name) && !Validator.isEmail(data.email)) {
        errors.information = "Email is invalid"
    } else if (!Validator.isEmpty(data.name)
        && !Validator.isEmail(data.email)
        && !Validator.isEmpty(data.email)) {
        errors.information = "Email is invalid"
    }

    return {
        errors,
        isValid: isEmpty(errors)
    }

}