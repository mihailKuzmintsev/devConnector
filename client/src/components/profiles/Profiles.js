import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfiles } from '../../actions/profileActions';
import Spinner from '../../components/common/Spinner';
import ProfilesItem from './ProfilesItem';

class Profiles extends Component {
  componentDidMount = () => {
    this.props.getProfiles();
  };

  render() {
    const { profiles, loading } = this.props.profile;

    let profilesContent;

    if (profiles === null || loading) {
      profilesContent = <Spinner />;
    } else {
      if (profiles.length > 0) {
        profilesContent = profiles.map((profile) => (
          <ProfilesItem key={profile._id} profile={profile} />
        ));
      } else {
        profilesContent = <h4>Profile not found...</h4>;
      }
    }

    return (
      <div className="profiles">
        <div className="container">
          <div className="row">
            <div className="col-md-12 ">
              <h1 className="display-4 text-center">Developer Profiles</h1>
              <div className="lead text-center">
                Browse and connect with developers
              </div>
              <div>{profilesContent}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Profiles.propTypes = {
  getProfiles: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(
  mapStateToProps,
  { getProfiles },
)(Profiles);
