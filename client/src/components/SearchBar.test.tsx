import React from "react";
import ReactDOM from "react-dom";
import SearchBar from "./SearchBar";
import renderer from "react-test-renderer";
import { render, cleanup } from "@testing-library/react";
import { IntlProvider } from "react-intl";
import English from "../languages/en.json";

afterEach(cleanup)

const update = (): void => { }


it("Should renders without crashing", () => {
    const div = document.createElement("div");
    ReactDOM.render(<IntlProvider locale="en" messages={English}><SearchBar
        term="Test"
        data={[]}
        filteredDish={[]}
        update={update}
    /></IntlProvider>, div);
})

it("Should renders searchBar correctly", () => {
    const { getByTestId } = render(<IntlProvider locale="en" messages={English}><SearchBar
        term="Test"
        data={[]}
        filteredDish={[]}
        update={update}
    /></IntlProvider>)

    expect(getByTestId("search-bar")).toHaveValue("Test");
})

it("Should match the Snapshot", () => {
    const tree = renderer.create(<IntlProvider locale="en" messages={English}><SearchBar
        term="Test"
        data={[]}
        filteredDish={[]}
        update={update}
    /></IntlProvider>).toJSON();

    expect(tree).toMatchSnapshot();
})