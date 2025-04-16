import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import {
  FaStar,
  FaMapMarkerAlt,
  FaBriefcase,
  FaExternalLinkAlt,
} from 'react-icons/fa'
import Header from '../Header'
import SkillList from '../SkillList'
import SimilarItems from '../SimilarItems'
import './index.css'

class JobItems extends Component {
  state = {
    singleJobItem: {},
    isLoading: true,
    singleJobItemSuccess: false,
    singleJobItemFailure: false,
  }

  componentDidMount() {
    this.singleJobItem()
  }

  singleJobItem = async () => {
    this.setState({
      isLoading: true,
      singleJobItemSuccess: false,
      singleJobItemFailure: false,
    })
    const {match} = this.props
    const {params} = match
    const {jobid} = params
    const token = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${jobid}`
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }
    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      if (response.ok === true) {
        const updateDatajobDeatils = {
          companyLogoUrl: data.job_details.company_logo_url,
          companyWebsiteUrl: data.job_details.company_website_url,
          employmentType: data.job_details.employment_type,
          id: data.job_details.id,
          jobDescription: data.job_details.job_description,
          lifeAtCompany: {
            description: data.job_details.life_at_company.description,
            imageUrl: data.job_details.life_at_company.image_url,
          },
          location: data.job_details.location,
          packagePerAnnum: data.job_details.package_per_annum,
          rating: data.job_details.rating,
          skills: data.job_details.skills.map(skill => ({
            imageUrl: skill.image_url,
            name: skill.name,
          })),
          title: data.job_details.title,
        }
        const similarJobs = data.similar_jobs.map(jobs => ({
          id: jobs.id,
          companyLogoUrl: jobs.company_logo_url,
          employmentType: jobs.employment_type,
          jobDescription: jobs.job_description,
          location: jobs.location,
          rating: jobs.rating,
          title: jobs.title,
        }))

        const finalUpdateJobs = {
          updateDatajobDeatils,
          similarJobs,
        }
        this.setState({
          singleJobItem: finalUpdateJobs,
          singleJobItemSuccess: true,
          isLoading: false,
        })
      } else {
        this.setState({singleJobItemFailure: true, isLoading: false})
      }
    } catch (error) {
      console.log(error)
    }
  }

  sucessJob = () => {
    const {singleJobItem} = this.state
    console.log(singleJobItem)
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      packagePerAnnum,
      jobDescription,
      companyWebsiteUrl,
    } = singleJobItem.updateDatajobDeatils

    return (
      <>
        <Header />
        <div className="main-conatiner1">
          <div className="jobcard-li1">
            <div className="logo-conatiner1">
              <img
                src={companyLogoUrl}
                alt="job details company logo"
                className="companyLogo1"
              />
              <div className="star-rating-conatiner1">
                <h1 className="job-details-heading1">{title}</h1>
                <div className="rating-conatiner1">
                  <FaStar className="star-icon1" />
                  <p className="rating-des1">{rating}</p>
                </div>
              </div>
            </div>
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
              <div>
                <p className="packagePerAnnum-p1">{packagePerAnnum}</p>
              </div>
            </div>
            <hr className="hr-line1" />
            <div className="description-container">
              <h1 className="description-heading1">Description</h1>
              <a
                href={companyWebsiteUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="a-class"
              >
                Visit
                <FaExternalLinkAlt className="link-share-icon" />
              </a>
            </div>
            <p className="description-para1">{jobDescription}</p>
            <h1 className="skill-des">Skills</h1>
            <ul className="skill-ul">
              {singleJobItem.updateDatajobDeatils.skills.map(item => (
                <SkillList key={item.name} skillItem={item} />
              ))}
            </ul>
            <h1 className="lifeAt-headers">Life at Company</h1>
            <div className="lifeAt-conatiner">
              <div className="lifeAt-des-conatiner">
                <p className="lifeAt-des">
                  {singleJobItem.updateDatajobDeatils.lifeAtCompany.description}
                </p>
              </div>
              <div className="lifeAt-img-conatiner">
                <img
                  src={
                    singleJobItem.updateDatajobDeatils.lifeAtCompany.imageUrl
                  }
                  className="lifeAt-img"
                  alt="life at company"
                />
              </div>
            </div>
          </div>

          <div className="similar-conatiner">
            <h1 className="sim-h2">Similar Jobs</h1>
            <ul className="similarJobs-conatiner">
              {singleJobItem.similarJobs.map(value => (
                <SimilarItems key={value.id} listvalue={value} />
              ))}
            </ul>
          </div>
        </div>
      </>
    )
  }

  isLoadingFunction = () => (
    <div className="loader-container-single" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  failureJob = () => (
    <>
      <Header />
      <div className="failure-conatiner1">
        <img
          src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
          alt="failure view"
        />
        <h1 className="oops-h1">OOps! something Went Wrong</h1>
        <p className="oops-para">
          We cannot seem to find the page you are looking for.
        </p>
        <button
          className="retry-btn"
          type="button"
          onClick={this.singleJobItem}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderSwitch = () => {
    const {isLoading, singleJobItemSuccess, singleJobItemFailure} = this.state

    if (isLoading) {
      return this.isLoadingFunction()
    }
    if (singleJobItemSuccess) {
      return this.sucessJob()
    }
    if (singleJobItemFailure) {
      return this.failureJob()
    }
    return null
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return this.renderSwitch()
  }
}

export default JobItems
