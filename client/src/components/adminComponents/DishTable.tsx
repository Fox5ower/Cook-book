import React, { Component } from 'react';
import axios from "axios";
import IDish from "../../interfaces/IDish"
import Table from "./Table"

interface MyProps {
    dishes: Array<IDish>
}

interface MyState {
    dishes: Array<IDish>,
}

class DishTable extends Component<MyProps, MyState> {

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
        )

    }
}


export default DishTable