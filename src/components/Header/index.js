import {Component} from 'react'
import Cookies from 'js-cookie'
import {withRouter, Link} from 'react-router-dom'
import './index.css'

class Header extends Component {
  logoutBtn = () => {
    const jwtTokn = Cookies.get('jwt_token')
    if (jwtTokn !== undefined) {
      Cookies.remove('jwt_token')
      const {history} = this.props
      history.replace('/login')
    }
  }

  render() {
    return (
      <nav className="nav-conatiner">
        <ul>
          <li className="img-list">
            <Link to="/" className="link-nav">
              <img
                src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
                alt="website logo"
                className="website-logo-nav"
              />
            </Link>
          </li>
        </ul>

        <ul className="nav-items">
          <li>
            <Link to="/" className="link-nav">
              {' '}
              Home
            </Link>
          </li>
          <li>
            <Link to="/jobs" className="link-nav">
              Jobs
            </Link>
          </li>
          <li />
        </ul>
        <button className="logout-btn" type="button" onClick={this.logoutBtn}>
          Logout
        </button>
      </nav>
    )
  }
}
export default withRouter(Header)
