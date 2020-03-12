import React, { Component } from 'react'
import { DEV_URL } from '../../App'
import axios from 'axios'
import IDish from '../../../interfaces/IDish'
import Table from './Table'

interface MyProps {}

interface MyState {
  dishes: Array<IDish>
}

class DishTable extends Component<MyProps, MyState> {
  constructor(props: MyProps) {
    super(props)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.state = {
      dishes: [],
    }
  }

  onDeleteClick(dishName: string) {
    axios.delete(`${DEV_URL}/api/panel/remove/${dishName}`).then(() =>
      axios.get(`${DEV_URL}/getdishes`).then(dishes => {
        this.setState({
          dishes: dishes.data.dish,
        })
      })
    )
  }

  UNSAFE_componentWillMount() {
    axios.get(`${DEV_URL}/getdishes`).then(dishes => {
      this.setState({
        dishes: dishes.data.dish,
      })
    })
  }
  render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'name',
      },
      {
        Header: 'Category',
        accessor: 'category',
      },
    ]

    const data = this.state.dishes
    return (
      <Table
        columns={columns}
        data={data}
        onDeleteClick={this.onDeleteClick}
      ></Table>
    )
  }
}

export default DishTable
