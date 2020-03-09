import validateLoginInput from "./login.validation";

interface IValidity {
    errors: object,
    isValid: boolean
}

interface IFakeData {
    email: string,
    password: string
}

it("Should correctly validate incoming data", () => {
    const validFakeData: IFakeData = {
        email: "fake@mail.com",
        password: "12345678"
    };

    const invalidFakeData: IFakeData = {
        email: "12345",
        password: ""
    }

    const validatedData: IValidity = validateLoginInput(validFakeData);
    const invalidatedData: IValidity = validateLoginInput(invalidFakeData);

    expect(validatedData["isValid"]).toBe(true);
    expect(invalidatedData["isValid"]).toBe(false);
})