import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect, Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

class Home extends Component {
  render() {
    const getJwtToken = Cookies.get('jwt_token')
    console.log(`${getJwtToken}`)
    if (getJwtToken === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <>
        <Header />
        <div className="home-container">
          <div className="home-content">
            <h1 className="home-heading">Find The Job That Fits Your Life</h1>
            <p className="home-description">
              Millions of people are searching for jobs, salary information,
              company reviews. Find the job that fits your abilities and
              potential.
            </p>
            <Link to="/jobs">
              <button className="find-btn" type="button">
                Find Jobs
              </button>
            </Link>
          </div>
        </div>
      </>
    )
  }
}
export default Home
