import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import {
  AiOutlineInstagram,
  AiOutlineTwitter,
  AiOutlineFacebook,
} from 'react-icons/ai'
import { FaVk } from 'react-icons/fa'
import { FormattedMessage } from 'react-intl'
import localizeRoute from '../services/localize.route'
import '../styles/main-page.scss'
import AuthModal from './userAuthComponents/AuthModal'
import AuthMiniature from './userAuthComponents/AuthMiniature'
import getToken from '../services/getToken'

interface MyProps {

}

interface MyState {
  isOpened: boolean;
  initiator: string;
  userName: string;
}

class MainPage extends Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);

    this.state = {
      isOpened: false,
      initiator: "",
      userName: ""
    }
  }

  update(config: MyState) {
    this.setState(config);
  }

  toggleModal(name: string | null) {
    if (name) {
      this.setState({
        isOpened: !this.state.isOpened,
        initiator: name
      })
    } else {
      this.setState({
        isOpened: !this.state.isOpened,
      })
    }
  }

  UNSAFE_componentWillMount() {
    const userName = localStorage.getItem("user");
    if (userName && localStorage.getItem("token")) {
      this.setState({
        userName: userName
      })
    }
  }

  render() {
    const { isOpened } = this.state
    return (
      <>
        <div className="main-page-container">
          <div className="main__header">
            <div className="empty"></div>

            <span className="main__header-name">
              <FormattedMessage id="main.header" defaultMessage="Cook-Book" />
            </span>

            <AuthMiniature toggleModal={this.toggleModal.bind(this)} name={this.state.userName} />

          </div>
          <div className="main__text">
            <span className="text">
              <FormattedMessage
                id="main.description"
                defaultMessage="Tatur sam in re pra est, sit ea corro eiure dolluptatem
            rerro quod que nuscia voluptate atiam, qui sit evendant alit,
            quunt harchil eos quis cus ma quas et qui
            sinctotatur aliqui rem asperro et minverio."
              />
            </span>
          </div>
          <Link to={`${localizeRoute('dishes')}`} className="main__button">
            <FormattedMessage
              id="main.welcome.button"
              defaultMessage="Welcome"
            />
          </Link>
          <div className="main__page__footer">
            <span>
              COOK-BOOK 2020. ©{' '}
              <FormattedMessage
                id="main.footer"
                defaultMessage="All Rights Reserved"
              />
              .
            </span>
            <div className="socials">
              <AiOutlineInstagram></AiOutlineInstagram>
              <AiOutlineTwitter></AiOutlineTwitter>
              <AiOutlineFacebook></AiOutlineFacebook>
              <FaVk></FaVk>
            </div>
          </div>
        </div>
        <AuthModal isOpened={isOpened} initiator={this.state.initiator} toggleModal={this.toggleModal.bind(this)} update={this.update.bind(this)}>
        </AuthModal>
      </>
    )
  }
}

export default MainPage
