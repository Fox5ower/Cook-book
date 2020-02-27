import React, { Component } from 'react';
import { Link } from "react-router-dom"
import { AiOutlineInstagram, AiOutlineTwitter, AiOutlineFacebook } from 'react-icons/ai';
import { FaVk } from 'react-icons/fa';
import { FormattedMessage } from 'react-intl';

class MainPage extends Component {

  render() {
    return (
      <div className="main-page-container">
        <div className="main__header">
          <span className="main__header-name"><FormattedMessage id="main.header" defaultMessage="Cook-Book" /></span>
        </div>
        <div className="main__text">
          <span className="text">
          <FormattedMessage id="main.description" defaultMessage="Tatur sam in re pra est, sit ea corro eiure dolluptatem
            rerro quod que nuscia voluptate atiam, qui sit evendant alit,
            quunt harchil eos quis cus ma quas et qui
            sinctotatur aliqui rem asperro et minverio." />
            
          </span>
        </div>
        <Link to="/dishes" className="main__button"><FormattedMessage id="main.welcome.button" defaultMessage="Welcome"/></Link>
        <div className="main__page__footer">
          <span>COOK-BOOK 2020. © <FormattedMessage id="main.footer" defaultMessage="All Rights Reserved"/>.</span>
          <div className="socials">
            <AiOutlineInstagram></AiOutlineInstagram>
            <AiOutlineTwitter></AiOutlineTwitter>
            <AiOutlineFacebook></AiOutlineFacebook>
            <FaVk></FaVk>
          </div>

        </div>
      </div>
    )
  }
}


export default MainPage