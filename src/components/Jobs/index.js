import {Component} from 'react'
import {BsSearch} from 'react-icons/bs'
import Loader from 'react-loader-spinner'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import JobCard from '../JobCard'
import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    profileUser: {},
    profileSuccessFetch: false,
    profileFailreFetch: false,
    profileisLoading: true,
    jobitemsisLoading: true,
    jobcardItem: null,
    jobItemsSuccess: false,
    jobItemsFailure: false,
    searchUserInput: '',
    typeEmplyemt: [],
    uservalueRadio: '',
  }

  componentDidMount() {
    this.getProfile()
    this.jobitems()
  }

  componentDidUpdate(prevProps, prevState) {
    const {typeEmplyemt, uservalueRadio} = this.state
    if (
      prevState.typeEmplyemt !== typeEmplyemt ||
      prevState.uservalueRadio !== uservalueRadio
    ) {
      this.jobitems()
    }
  }

  getProfile = async () => {
    this.setState({
      profileisLoading: true,
      profileSuccessFetch: false,
      profileFailreFetch: false,
    })
    const token = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      method: 'GET',
    }

    try {
      const response = await fetch(apiUrl, options)
      const data = await response.json()
      const updateData = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }
      if (response.ok === true) {
        this.setState({
          profileUser: updateData,
          profileSuccessFetch: true,
          profileisLoading: false,
        })
      } else {
        this.setState({profileFailreFetch: true, profileisLoading: false})
      }
    } catch (error) {
      console.error('Error:', error)
    }
  }

  jobitems = async () => {
    const {searchUserInput, typeEmplyemt, uservalueRadio} = this.state
    this.setState({
      jobitemsisLoading: true,
      jobItemsFailure: false,
      jobItemsSuccess: false,
    })
    const sparedCommaInEmployemt = typeEmplyemt.join(',')
    const getToken = Cookies.get('jwt_token')
    const option = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken}`,
      },
    }
    const apiJobDetailsUrl = `https://apis.ccbp.in/jobs?search=${searchUserInput}&employment_type=${sparedCommaInEmployemt}&minimum_package=${uservalueRadio}`
    try {
      const response = await fetch(apiJobDetailsUrl, option)
      const data = await response.json()
      const jobItems = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        location: eachItem.location,
        title: eachItem.title,
      }))
      const updateItems = {
        job: jobItems,
        total: data.total,
      }
      if (response.ok === true) {
        this.setState({
          jobcardItem: updateItems,
          jobItemsSuccess: true,
          jobitemsisLoading: false,
        })
      } else {
        this.setState({jobItemsFailure: true, jobitemsisLoading: false})
      }
    } catch (error) {
      console.log(error)
    }
  }

  onSubmitEvent = event => {
    event.preventDefault()
    this.jobitems()
  }

  onClickvalue = () => {
    this.jobitems()
  }

  searchOnChange = event => {
    this.setState({searchUserInput: event.target.value})
  }

  onChnageInput = event => {
    const {typeEmplyemt} = this.state
    const {value, checked} = event.target

    let updatedTypeEmplyemt
    if (checked) {
      updatedTypeEmplyemt = [...typeEmplyemt, value]
    } else {
      updatedTypeEmplyemt = typeEmplyemt.filter(data => data !== value)
    }

    this.setState({typeEmplyemt: updatedTypeEmplyemt})
  }

  onChangeRadio = event => {
    this.setState({uservalueRadio: event.target.value}, () => {
      this.jobitems()
    })
  }

  onkeyDownvalue = e => {
    if (e.key === 'Enter') {
      this.jobitems()
    }
  }

  jobItemsFailure = () => (
    <div className="failure-conatiner">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="failure"
      />
      <h1 className="oops-h1">Oops! Something Went Wrong</h1>
      <p className="oops-para">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        className="retry-btn"
        type="button"
        onClick={this.jobitems}
        data-testid="retryButton"
      >
        Retry
      </button>
    </div>
  )

  jobItemsSuccess = () => {
    const {jobcardItem} = this.state
    return (
      <>
        {jobcardItem.job && jobcardItem.job.length > 0 ? (
          <ul className="jobcard-ul">
            {jobcardItem.job.map(data => (
              <JobCard key={data.id} list={data} />
            ))}
          </ul>
        ) : (
          <div className="no-job-found-conatiner">
            <img
              src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
              alt="no jobs"
              className="no-job"
            />
            <h1 className="no-job-header">No Jobs Found</h1>
            <p className="no-job-des">
              We could not find any jobs. Try other filters
            </p>
          </div>
        )}
      </>
    )
  }

  jobCardItemFun = () => {
    const {jobitemsisLoading, jobItemsFailure, jobItemsSuccess} = this.state
    switch (true) {
      case jobitemsisLoading:
        return this.isLoadingFunctionJob()
      case jobItemsFailure:
        return this.jobItemsFailure()
      case jobItemsSuccess:
        return this.jobItemsSuccess()
      default:
        return null
    }
  }

  isLoadingFunctionJob = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  isLoadingFunctionProfile = () => (
    <div className="profile-container1" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  profileFailure = () => (
    <div className="profile-container1">
      <button
        className="retry-btn"
        type="button"
        onClick={this.getProfile}
        data-testid="retryButton"
      >
        Retry
      </button>
    </div>
  )

  profileSuccess = () => {
    const {profileUser} = this.state
    return (
      <div className="profile-container">
        <img
          src={profileUser.profileImageUrl}
          alt="profile"
          className="profile-logo"
        />
        <h1 className="profile-name-des">{profileUser.name}</h1>
        <p className="profile-bio-des">{profileUser.shortBio}</p>
      </div>
    )
  }

  profileswitch = () => {
    const {
      profileisLoading,
      profileFailreFetch,
      profileSuccessFetch,
    } = this.state
    switch (true) {
      case profileisLoading:
        return this.isLoadingFunctionProfile()
      case profileFailreFetch:
        return this.profileFailure()
      case profileSuccessFetch:
        return this.profileSuccess()
      default:
        return null
    }
  }

  render() {
    const {searchUserInput, uservalueRadio, typeEmplyemt} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken === undefined) {
      return <Redirect to="/login" />
    }
    return (
      <>
        <Header />
        <div className="job-container">
          <div className="job-search-container">
            {this.profileswitch()}
            <hr />
            <div className="type-Employment-checkbox">
              <h1 className="type-Employment-header">Type of Employment</h1>
              {employmentTypesList.map(data => (
                <div key={data.employmentTypeId} className="check-conatiner">
                  <input
                    type="checkbox"
                    id={data.employmentTypeId}
                    value={data.employmentTypeId}
                    onClick={this.onChnageInput}
                    checked={typeEmplyemt.includes(data.employmentTypeId)}
                  />
                  <label htmlFor={data.employmentTypeId}>{data.label}</label>
                </div>
              ))}
            </div>
            <hr className="hr-line-one" />
            <div className="salary-conatiner">
              <h1 className="type-Employment-header">Salary Range</h1>
              <ul>
                {salaryRangesList.map(item => (
                  <li key={item.salaryRangeId} className="check-conatiner">
                    <input
                      type="radio"
                      id={item.salaryRangeId}
                      name="salaryRange"
                      value={item.salaryRangeId}
                      onClick={this.onChangeRadio}
                      checked={uservalueRadio === item.salaryRangeId}
                    />
                    <label htmlFor={item.salaryRangeId}>{item.label}</label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="job-item-conatiner">
            <form onSubmit={this.onSubmitEvent}>
              <input
                type="search"
                className="search-input"
                placeholder="Search"
                value={searchUserInput}
                onChange={this.searchOnChange}
                onKeyDown={this.onkeyDownvalue}
              />
              <button
                type="button"
                data-testid="searchButton"
                className="search-btn"
                onClick={this.onClickvalue}
              >
                <BsSearch className="search-icon" />
              </button>
            </form>
            {this.jobCardItemFun()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
