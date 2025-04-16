import {Component} from 'react'
import {FaStar, FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

class JobCard extends Component {
  render() {
    const {list} = this.props
    const {
      id,
      companyLogoUrl,
      employmentType,
      title,
      rating,
      location,
      packagePerAnnum,
      jobDescription,
    } = list
    return (
      <Link to={`/jobs/${id}`} className="link-class">
        <li className="jobcard-li">
          <div className="logo-conatiner">
            <img
              src={companyLogoUrl}
              className="companyLogo"
              alt="company logo"
            />
            <div className="star-rating-conatiner">
              <h1 className="job-details-heading">{title}</h1>
              <div className="rating-conatiner">
                <FaStar className="star-icon" />
                <p className="rating-des">{rating}</p>
              </div>
            </div>
          </div>
          <div className="icons-conatiner">
            <div className="icon-child-conatiner">
              <div className="location-icon-container">
                <FaMapMarkerAlt />
                <p className="location-p">{location}</p>
              </div>
              <div className="location-icon-container">
                <FaBriefcase />
                <p className="location-p">{employmentType}</p>
              </div>
            </div>
            <div>
              <p className="packagePerAnnum-p">{packagePerAnnum}</p>
            </div>
          </div>
          <hr className="hr-line" />
          <div>
            <h1 className="description-heading">Description</h1>
            <p className="description-para">{jobDescription}</p>
          </div>
        </li>
      </Link>
    )
  }
}
export default JobCard
