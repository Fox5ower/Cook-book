import React, { Component } from "react";
import IDish from "../interfaces/IDish";
import ICategory from "../interfaces/ICategory"
import SearchBar from "./SearchBar";
import axios from "axios";
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from "react-icons/ai";
import { FaVk, FaTwitter } from "react-icons/fa"

interface MyProps {
    term: string,
    data: Array<IDish>,
    update: Function,
    initialState: Array<IDish>
}

interface MyState {
    categories: Array<ICategory>,
    value: string
}

class ToolBar extends Component<MyProps, MyState>{
    constructor(props: MyProps) {
        super(props)

        this.state = {
            categories: [],
            value: ""
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
        this.props.update({
            dishes: this.props.initialState
        })
        let unchoosedArr = document.querySelectorAll(".category");
        if (unchoosedArr) {
            unchoosedArr.forEach(el => {
                el.classList.remove("choosedCategory");
            })
        }
    }

    dataSort = (e: any) => {
        e.preventDefault();
        const value = e.target.name;
        this.setState({
            value: value
        })
        const filter = this.props.data.filter((dish: IDish) => {
            return dish.category.includes(value);
        });

        this.props.update({
            dishes: filter,
        });
        let choosedCategory = document.querySelector(`#${e.target.name}`);

        if (choosedCategory) {
            let unchoosedArr = document.querySelectorAll(".category");
            unchoosedArr.forEach(el => {
                el.classList.remove("choosedCategory");
            })
            choosedCategory.classList.add("choosedCategory");
        }
    };

    render() {
        return (
            <>
                <div className="navbar__header">
                    Dish List
                    </div>
                <div className="nav-container">
                    <div className="search">
                        <SearchBar
                            term={this.props.term}
                            data={this.props.data}
                            update={this.props.update}
                        />
                        <div className="line-divider"></div>
                    </div>


                    <div className="category-container">
                        {this.state.categories.map((category: ICategory, i: number) => {
                            return (
                                <button key={category.key} className="category" onClick={this.dataSort} id={category.key} name={category.key}>{category.name}</button>
                            )
                        })}
                        <button className="reset-button" onClick={(e: any) => this.resetData(e)}>
                            Reset Filters
                    </button>
                    </div>
                    <div className="line-divider"></div>

                </div>
                <div className="socials-container">
                    <AiOutlineInstagram></AiOutlineInstagram>
                    <AiOutlineTwitter></AiOutlineTwitter>
                    <AiOutlineFacebook></AiOutlineFacebook>
                    <FaVk></FaVk>
                </div>
            </>
        )
    }
}

export default ToolBar