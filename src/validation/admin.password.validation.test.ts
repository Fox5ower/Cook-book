import validatePasswordInputData from "./admin.password.validation";

interface IValidity {
    errors: object,
    isValid: boolean
}

interface IFakeData {
    password: string,
    password2: string
}

it("Should correctly validate incoming data", () => {
    const validFakeData: IFakeData = {
        password: "12345678",
        password2: "12345678"
    };

    const invalidFakeData: IFakeData = {
        password: "12345678",
        password2: "12345"
    }

    const invalidFakeDataToo: IFakeData = {
        password: "",
        password2: ""
    };

    const validatedData: IValidity = validatePasswordInputData(validFakeData);
    const invalidatedData: IValidity = validatePasswordInputData(invalidFakeData);
    const invalidatedDataToo: IValidity = validatePasswordInputData(invalidFakeDataToo);

    expect(validatedData["isValid"]).toBe(true);
    expect(invalidatedData["isValid"]).toBe(false);
    expect(invalidatedDataToo["isValid"]).toBe(false);
})