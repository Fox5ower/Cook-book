import React, { Component } from 'react';
import { Link } from "react-router-dom"

class MainPage extends Component {

  render() {
    return (

      <div className="main-page-container">
        <div className="main__header">
          <span className="main__header-name">Coock-Book</span>
        </div>
        <div className="main__text">
          <span className="text">
            Tatur sam in re pra est, sit ea corro eiure dolluptatem
            rerro quod que nuscia voluptate atiam, qui sit evendant alit,
            quunt harchil eos quis cus ma quas et qui
            sinctotatur aliqui rem asperro et minverio.
          </span>
        </div>
        <Link to="/dishes" className="main__button">Welcome</Link>
      </div>
    )
  }
}


export default MainPage