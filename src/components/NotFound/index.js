import {Component} from 'react'
import './index.css'

class NotFound extends Component {
  render() {
    return (
      <div className="no-found-conatiner">
        <img
          src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
          alt="not found"
          className="notFound"
        />
        <h1 className="notFound-h1">Page Not Found</h1>
        <p className="notFound-p">
          We are sorry, the page you requested could not be found
        </p>
      </div>
    )
  }
}
export default NotFound
