import React, { Component } from 'react';
import axios from "axios";
import IDish from "../../interfaces/IDish"
import Table from "./Table"

interface MyProps {

}

interface MyState {
    dishes: Array<IDish>,
}

class DishTable extends Component<MyProps, MyState> {

    constructor(props: MyProps) {
        super(props)
        this.onDeleteClick = this.onDeleteClick.bind(this)
        this.state = {
            dishes: []
        }
    }

    onDeleteClick(dishName: string) {
        axios.delete(`http://localhost:3001/api/panel/remove/${dishName}`)
            .then(() => axios.get("http://localhost:3001/dishes")
                .then((dishes) => {
                    this.setState({
                        dishes: dishes.data.dish
                    })
                }))
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
                Header: "Name",
                accessor: "name"
            },
            {
                Header: "Category",
                accessor: "category"
            }
        ]

        const data = this.state.dishes;
        return (
            <Table columns={columns} data={data} onDeleteClick={this.onDeleteClick}></Table>
        )

    }
}


export default DishTable