import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import TextFieldGroup from '../../components/common/TextFieldGroup';
import TextAreaFieldGroup from '../../components/common/TextAreaFieldGroup';
import InputGroup from '../../components/common/InputGroup';
import SelectFieldGroup from '../../components/common/SelectFieldGroup';
import { createProfile, getCurrentProfile } from '../../actions/profileActions';
import { withRouter, Link } from 'react-router-dom';
import isEmpty from '../../validation/is-empty';

class CreateProfile extends Component {
  state = {
    displaySocialInput: false,
    errors: {},
    handle: '',
    company: '',
    website: '',
    location: '',
    status: '',
    githubusername: '',
    bio: '',
    skills: '',
    twitter: '',
    youtube: '',
    vk: '',
    facebook: '',
    instagram: '',
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };

  componentDidMount = () => {
    this.props.getCurrentProfile();
  };

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }

    if (nextProps.profile.profile) {
      const profile = nextProps.profile.profile;

      const skillsCSV = profile.skills.join(',');

      // If profile field doesnt exist, make empty string
      profile.company = !isEmpty(profile.company) ? profile.company : '';
      profile.website = !isEmpty(profile.website) ? profile.website : '';
      profile.location = !isEmpty(profile.location) ? profile.location : '';
      profile.githubusername = !isEmpty(profile.githubusername)
        ? profile.githubusername
        : '';
      profile.bio = !isEmpty(profile.bio) ? profile.bio : '';
      profile.social = !isEmpty(profile.social) ? profile.social : {};
      profile.twitter = !isEmpty(profile.social.twitter)
        ? profile.social.twitter
        : '';
      profile.facebook = !isEmpty(profile.social.facebook)
        ? profile.social.facebook
        : '';
      profile.vk = !isEmpty(profile.social.vk) ? profile.social.vk : '';
      profile.youtube = !isEmpty(profile.social.youtube)
        ? profile.social.youtube
        : '';
      profile.instagram = !isEmpty(profile.social.instagram)
        ? profile.social.instagram
        : '';

      // Set component fields state
      this.setState({
        handle: profile.handle,
        company: profile.company,
        website: profile.website,
        location: profile.location,
        status: profile.status,
        skills: skillsCSV,
        githubusername: profile.githubusername,
        bio: profile.bio,
        twitter: profile.twitter,
        facebook: profile.facebook,
        instagram: profile.instagram,
        vk: profile.vk,
        youtube: profile.youtube,
      });
    }
  };

  onSubmit = (e) => {
    e.preventDefault();

    const profileData = {
      handle: this.state.handle,
      company: this.state.company,
      website: this.state.website,
      location: this.state.location,
      status: this.state.status,
      githubusername: this.state.githubusername,
      bio: this.state.bio,
      skills: this.state.skills,
      twitter: this.state.twitter,
      youtube: this.state.youtube,
      vk: this.state.vk,
      facebook: this.state.facebook,
      instagram: this.state.instagram,
    };

    this.props.createProfile(profileData, this.props.history);
  };

  onDisplaySocial = () => {
    this.setState((prevState) => ({
      displaySocialInput: !prevState.displaySocialInput,
    }));
  };

  render() {
    const {
      errors,
      handle,
      company,
      website,
      location,
      status,
      githubusername,
      bio,
      skills,
      displaySocialInput,
      twitter,
      youtube,
      vk,
      instagram,
      facebook,
    } = this.state;

    // Select option for selectList
    const selectList = [
      { label: '* Select Professional Status', value: '' },
      { label: 'Developer', value: 'Developer' },
      { label: 'Junior Developer', value: 'Junior Developer' },
      { label: 'Senior Developer', value: 'Senior Developer' },
      { label: 'Manager', value: 'Manager' },
      { label: 'Student or Learning', value: 'Student or Learning' },
      { label: 'Instructor', value: 'Instructor' },
      { label: 'Intern', value: 'Intern' },
      { label: 'Other', value: 'Other' },
    ];

    const socialLinks = (
      <div>
        <InputGroup
          placeholder="Twitter Profile URL"
          name="twitter"
          icon="fab fa-twitter"
          value={twitter}
          onChange={this.onChange}
          error={errors.twitter}
        />
        <InputGroup
          placeholder="VK Profile URL"
          name="vk"
          icon="fab fa-vk"
          value={vk}
          onChange={this.onChange}
          error={errors.vk}
        />
        <InputGroup
          placeholder="Instagram Profile URL"
          name="instagram"
          icon="fab fa-instagram"
          value={instagram}
          onChange={this.onChange}
          error={errors.instagram}
        />
        <InputGroup
          placeholder="Facebook Profile URL"
          name="facebook"
          icon="fab fa-facebook"
          value={facebook}
          onChange={this.onChange}
          error={errors.facebook}
        />
        <InputGroup
          placeholder="YouTube Profile URL"
          name="youtube"
          icon="fab fa-youtube"
          value={youtube}
          onChange={this.onChange}
          error={errors.youtube}
        />
      </div>
    );

    return (
      <div className="create-profile">
        <div className="container">
          <div className="row">
            <div className="col-md-8 m-auto">
              <Link to="/dashboard" className="btn btn-lg btn-info">
                Go Back
              </Link>
              <h1 className="display-4 text-center">Edit Profile</h1>
              <small className="d-block pb-3">* = required fields</small>
              <form onSubmit={this.onSubmit}>
                <TextFieldGroup
                  placeholder="Profile handle"
                  name="handle"
                  value={handle}
                  onChange={this.onChange}
                  error={errors.handle}
                  info="Уникальное имя для вашего профиля"
                />
                <SelectFieldGroup
                  options={selectList}
                  name="status"
                  placeholder="Status"
                  value={status}
                  onChange={this.onChange}
                  error={errors.status}
                  info="Ваш професстональный статус на данный момент"
                />
                <TextFieldGroup
                  placeholder="Company"
                  name="company"
                  value={company}
                  onChange={this.onChange}
                  error={errors.company}
                  info="Укажите место работы"
                />
                <TextFieldGroup
                  placeholder="Website"
                  name="website"
                  value={website}
                  onChange={this.onChange}
                  error={errors.website}
                  info="Ваш сайт или сайт вашей компании"
                />
                <TextFieldGroup
                  placeholder="Location"
                  name="location"
                  value={location}
                  onChange={this.onChange}
                  error={errors.location}
                  info="Укажите место проживания"
                />
                <TextFieldGroup
                  placeholder="Skills"
                  name="skills"
                  value={skills}
                  onChange={this.onChange}
                  error={errors.skills}
                  info="В качестве разделителя используйте , (например: HTML, CSS, JS)"
                />
                <TextFieldGroup
                  placeholder="Github Username"
                  name="githubusername"
                  value={githubusername}
                  onChange={this.onChange}
                  error={errors.githubusername}
                  info="Если хотите, чтобы отображались последнии репозитории и ссылки на них, укажите ваше имя на Github"
                />
                <TextAreaFieldGroup
                  placeholder="Short Bio"
                  name="bio"
                  value={bio}
                  onChange={this.onChange}
                  error={errors.bio}
                  info="Расскажите немного о себе"
                />
                <div className="mb-3 d-flex align-items-center">
                  <button
                    type="button"
                    className="btn btn-dark mr-3"
                    onClick={this.onDisplaySocial}
                  >
                    Add Social Network Links
                  </button>
                  <span className="text-muted">Optional</span>
                </div>
                {displaySocialInput && socialLinks}
                <input
                  className="btn btn-info btn-block mt-4"
                  value="Submit"
                  type="submit"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

CreateProfile.propTypes = {
  profile: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  createProfile: PropTypes.func.isRequired,
  getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  errors: state.errors,
});

export default connect(
  mapStateToProps,
  { createProfile, getCurrentProfile },
)(withRouter(CreateProfile));
