import React, { Component } from "react";
import IDish from "../interfaces/IDish";
import ICategory from "../interfaces/ICategory"
import SearchBar from "./SearchBar";
import axios from "axios";

interface MyProps {
    term: string,
    data: Array<IDish>,
    update: Function,
    initialState: Array<IDish>
}

interface MyState {
    categories: Array<ICategory>
}

class ToolBar extends Component<MyProps, MyState>{
    constructor(props: MyProps) {
        super(props)

        this.state = {
            categories: []
        }
    }

    componentWillMount() {
        axios.get("http://localhost:3001/categories")
            .then((category) => {
                this.setState({
                    categories: category.data.category
                })
            })
    }

    resetData(e: any) {
        e.preventDefault();
        console.log(this.props.initialState)
        this.props.update({
            dishes: this.props.initialState
        })
    }

    dataSort = (e: any) => {
        e.preventDefault();
        const value = e.target.name;
        const filter = this.props.data.filter((dish: IDish) => {
            return dish.category.includes(value);
        });

        this.props.update({
            dishes: filter,
        });
    };

    render() {
        return (
            <div className="nav-container">
                <div className="search">
                    <div className="bar-container">

                        {this.state.categories.map((category: ICategory, i: number) => {
                            while (i < 3) {
                                return (
                                    <button key={category.key} className="category" onClick={this.dataSort} name={category.key}>{category.name}</button>
                                )
                            }
                        })}

                        <SearchBar
                            term={this.props.term}
                            data={this.props.data}
                            update={this.props.update}
                        />

                        {this.state.categories.map((category: ICategory, i: number) => {
                            while (i >= 3) {
                                return (
                                    <button key={category.key} className="category" onClick={this.dataSort} name={category.key}>{category.name}</button>
                                )
                            }
                        })}
                    </div>
                </div>
                <button className="reset-button" onClick={(e: any) => this.resetData(e)}>
                    Reset Filters
                </button>
            </div>
        )
    }
}

export default ToolBar