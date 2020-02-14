import React from "react";
import IDish from "../interfaces/IDish";

export default ({ term, data, update }) => {

    const dataSearch = (e: any) => {
        const value = e.target.value.toLowerCase();

        const filter = data.filter((dish: IDish) => {
            return dish.name.toLowerCase().includes(value);
        });

        update({
            dishes: filter,
            term: value
        });

    };

    return (
        <div className="search-icon">
            <input
                value={term}
                placeholder="Search by name..."
                onChange={dataSearch}
                type="text" required
            />
        </div>
    );
};