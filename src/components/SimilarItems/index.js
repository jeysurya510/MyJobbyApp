import {Component} from 'react'
import {FaStar, FaMapMarkerAlt, FaBriefcase} from 'react-icons/fa'
import './index.css'

class SimilarItems extends Component {
  render() {
    const {listvalue} = this.props
    const {
      companyLogoUrl,
      employmentType,
      jobDescription,
      location,
      rating,
      title,
    } = listvalue
    return (
      <li className="similar-job-li">
        <div className="logo-conatiner2">
          <img
            src={companyLogoUrl}
            className="companyLogo2"
            alt="similar job company logo"
          />
          <div className="star-rating-conatiner2">
            <h1 className="job-details-heading2">{title}</h1>
            <div className="rating-conatiner2">
              <FaStar className="star-icon2" />
              <p className="rating-des2">{rating}</p>
            </div>
          </div>
        </div>
        <p className="similar-Description">Description</p>
        <p className="para-similar">{jobDescription}</p>
        <div className="icons-conatiner1">
          <div className="icon-child-conatiner1">
            <div className="location-icon-container1">
              <FaMapMarkerAlt />
              <p className="location-p1">{location}</p>
            </div>
            <div className="location-icon-container1">
              <FaBriefcase />
              <p className="location-p1">{employmentType}</p>
            </div>
          </div>
        </div>
      </li>
    )
  }
}
export default SimilarItems
