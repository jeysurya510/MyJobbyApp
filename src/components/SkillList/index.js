import {Component} from 'react'
import './index.css'

class SkillList extends Component {
  render() {
    const {skillItem} = this.props
    const {imageUrl, name} = skillItem
    return (
      <li className="skill-li">
        <img src={imageUrl} alt={name} className="skill-img" />
        <p className="name-skill">{name}</p>
      </li>
    )
  }
}
export default SkillList
