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

interface MyProps {

}

interface MyState {
  isOpened: boolean;
  initiator: string
}

class MainPage extends Component<MyProps, MyState> {

  constructor(props: MyProps) {
    super(props);

    this.state = {
      isOpened: false,
      initiator: ""
    }
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

            <div className="main__header__auth">
              <div className="header__admin-actions">
                <div className="miniature">
                  Login
                  <div className="actions">
                    You can login if you already have an account
                    <div className="main__button auth-button" onClick={() => this.toggleModal("login")}>
                      Login
                    </div>
                    Or register a new account
                    <div className="main__button auth-button" onClick={() => this.toggleModal("register")}>
                      Register
                    </div>
                  </div>
                </div>
              </div>
              <div className="empty__half"></div>
            </div>

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
        <AuthModal isOpened={isOpened} initiator={this.state.initiator} toggleModal={this.toggleModal.bind(this)}>
        </AuthModal>
      </>
    )
  }
}

export default MainPage
