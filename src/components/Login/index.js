import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    usernameInput: '',
    passwordInput: '',
    errormsg: '',
  }

  successLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 230})
    const {history} = this.props
    history.replace('/')
  }

  failureLogin = errormsg => {
    this.setState({errormsg})
  }

  submitForm = async e => {
    e.preventDefault()
    const {usernameInput, passwordInput} = this.state
    const apiUrl = 'https://apis.ccbp.in/login'
    const userDetails = {username: usernameInput, password: passwordInput}
    const option = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    try {
      const response = await fetch(apiUrl, option)
      const data = await response.json()
      if (response.ok === true) {
        this.successLogin(data.jwt_token)
      } else {
        this.failureLogin(data.error_msg)
      }
    } catch (error) {
      console.log(error)
    }
  }

  changeUsername = e => {
    this.setState({usernameInput: e.target.value})
  }

  changePassword = e => {
    this.setState({passwordInput: e.target.value})
  }

  render() {
    const {usernameInput, passwordInput, errormsg} = this.state
    const checkToken = Cookies.get('jwt_token')
    if (checkToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-continer">
        <div className="login-form">
          <div className="website-logo-conatiner">
            <img
              src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
              alt="website logo"
              className="website-logo"
            />
          </div>

          <form className="form-conatiner" onSubmit={this.submitForm}>
            <label htmlFor="username" className="username-label">
              USERNAME
            </label>
            <br />
            <input
              type="text"
              id="username"
              className="input-conatiner"
              placeholder="Username"
              onChange={this.changeUsername}
              value={usernameInput}
            />
            <br />
            <label htmlFor="password" className="username-label">
              PASSWORD
            </label>
            <br />
            <input
              type="password"
              className="input-conatiner1"
              id="password"
              placeholder="Password"
              onChange={this.changePassword}
              value={passwordInput}
            />
            <br />
            <button type="submit" className="login-btn">
              Login
            </button>
            <p className="error-msg">{errormsg}</p>
          </form>
        </div>
      </div>
    )
  }
}
export default Login
