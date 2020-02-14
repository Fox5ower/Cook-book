import React from "react";
import IDish from "../interfaces/IDish";
import ICategory from "../interfaces/ICategory"
import SearchBar from "./SearchBar";

export default ({ term, data, update }) => {

    const dataSort = (e: any) => {
        e.preventDefault();
        const value = e.target.name;
        const filter = data.filter((dish: IDish) => {
            return dish.category.includes(value);
        });

        update({
            dishes: filter,
        });
    };

    const categories: Array<ICategory> = [
        { key: "deserts", name: "Deserts" },
        { key: "salads", name: "Salads" },
        { key: "meatDishes", name: "Meat Dishes" },
        { key: "fastfood", name: "FastFood" },
        { key: "fishDishes", name: "Fish Dishes" },
        { key: "cocktails", name: "Cocktails" }
    ];

    return (

        <div className="search">
            <div className="bar-container">

                {categories.map((category: ICategory, i: number) => {
                    while (i < 3) {
                        return (
                            <button className="category" onClick={dataSort} name={category.key}>{category.name}</button>
                        )
                    }
                })}

                <SearchBar
                    term={term}
                    data={data}
                    update={update}
                />

                {categories.map((category: ICategory, i: number) => {
                    while (i >= 3) {
                        return (
                            <button className="category" onClick={dataSort} name={category.key}>{category.name}</button>
                        )
                    }
                })}
            </div>
        </div>
    );
};