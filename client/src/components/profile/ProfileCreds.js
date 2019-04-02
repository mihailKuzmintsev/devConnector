import React, { Component } from 'react';
import Moment from 'react-moment';
import isEmpty from '../../validation/is-empty';

class ProfileCreds extends Component {
  render() {
    const { experience, education } = this.props;

    // Get experience list
    const experienceList = experience.map((exp) => (
      <li className="list-group-item" key={exp._id}>
        <h4>{exp.company}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{exp.from}</Moment> -{' '}
          {exp.current ? ' Now' : <Moment format="YYYY/MM/DD">{exp.to}</Moment>}
        </p>
        <p>
          <strong>Position: </strong>
          {exp.title}
        </p>
        <p>
          {isEmpty(exp.location) ? null : (
            <span>
              <strong>Location: </strong>
              {exp.location}
            </span>
          )}
        </p>
        <p>
          {isEmpty(exp.description) ? null : (
            <span>
              <strong>Description: </strong>
              {exp.description}
            </span>
          )}
        </p>
      </li>
    ));

    // Get education list
    const educationList = education.map((edu) => (
      <li className="list-group-item" key={edu._id}>
        <h4>{edu.school}</h4>
        <p>
          <Moment format="YYYY/MM/DD">{edu.from}</Moment> -{' '}
          {edu.current ? ' Now' : <Moment format="YYYY/MM/DD">{edu.to}</Moment>}
        </p>
        <p>
          <strong>Position: </strong>
          {edu.degree}
        </p>
        <p>
          <strong>Field of Study: </strong>
          {edu.fieldofstudy}
        </p>
        <p>
          {isEmpty(edu.description) ? null : (
            <span>
              <strong>Description: </strong>
              {edu.description}
            </span>
          )}
        </p>
      </li>
    ));

    return (
      <div className="row">
        <div className="col-md-6">
          <h3 className="text-center text-info">Experience</h3>
          {isEmpty(experienceList) ? (
            <p className="text-center">No experience listed</p>
          ) : (
            <ul className="list-group">{experienceList}</ul>
          )}
        </div>
        <div className="col-md-6">
          <h3 className="text-center text-info">Education</h3>
          {isEmpty(educationList) ? (
            <p className="text-center">No education listed</p>
          ) : (
            <ul className="list-group">{educationList}</ul>
          )}
        </div>
      </div>
    );
  }
}

export default ProfileCreds;
