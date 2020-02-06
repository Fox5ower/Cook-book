import React, { Component } from 'react';
import axios from "axios";
import IDish from "../../../../src/interfaces/IDish"
import MenuItem from '../MenuItem';
import { useTable } from 'react-table'
import Table from "./Table"

interface MyProps {
    dishes: Array<IDish>
}

interface MyState {
    dishes: Array<IDish>,
}

class DishDB extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)
        this.state = {
            dishes: []
        }
    }

    componentWillMount() {
        axios.get("http://localhost:3001/dishes")
            .then((dishes) => {
                this.setState({
                    dishes: dishes.data.dish
                })
            })
    }
    render() {
        const columns = [
            {
                Header: "ID",
                accessor: "_id"
            },
            {
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Category",
                accessor: "category"
            },
            {
                Header: "Edit"
            }
        ]

        const data = this.state.dishes;
        return (

            <Table columns={columns} data={data}></Table>
            // <div>{this.state.dishes.map((dish, i) => (
            //     <MenuItem key={dish._id}
            //         _id={dish._id}
            //         name={dish.name}
            //         category={dish.category}
            //         method={dish.method}
            //         description={dish.description}
            //         engreediants={dish.engreediants}
            //         image={dish.image}
            //         counter={i + 1} />
            // ))}</div>
        )

    }
}


export default DishDB