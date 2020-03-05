import React from "react";
import { render } from "@testing-library/react";
import Input from "./Input";


it("Should render Recipes preview", () => {
    const fakeProps = {
        name: "Test name",
        placeholder: "Test Placeholder",
        maxLength: 12,
        value: "Test Value"
    }
    const { getByLabelText } = render(
        <Input
            name={fakeProps.name}
            placeholder={fakeProps.placeholder}
            maxLength={fakeProps.maxLength}
            value={fakeProps.value}
        />)

    const placeholderText = getByLabelText(/Test Placeholder/i);
    expect(placeholderText).toBeInTheDocument();
})

