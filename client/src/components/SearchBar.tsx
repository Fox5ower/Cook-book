import React from "react";
import IDish from "../interfaces/IDish";

interface MyProps {
    term: string,
    data: Array<IDish>,
    filteredDish: Array<IDish>,
    update: Function
}

const Searchbar: React.SFC<MyProps> = ({ term, data, filteredDish, update }) => {

    const dataSearch = (e: any) => {
        const value = e.target.value.toLowerCase();
        if (filteredDish.length >= 1) {
            const filter = filteredDish.filter((dish: IDish) => {
                return dish.name.toLowerCase().includes(value);
            });
            update({
                dishes: filter,
                term: value
            });
        } else {
            const filter = data.filter((dish: IDish) => {
                return dish.name.toLowerCase().includes(value);
            });
            update({
                dishes: filter,
                term: value
            });
        }



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

export default Searchbar