import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getCurrentProfile, deleteAccount } from '../../actions/profileActions';
import Spinner from '../../components/common/Spinner';
import ProfileActions from '../../components/dashboard/ProfileActions';
import Experience from '../../components/dashboard/Experience';
import Education from '../../components/dashboard/Education';

class Dashboard extends Component {
  componentDidMount() {
    this.props.getCurrentProfile();
  }

  onDeleteAccount = () => {
    this.props.deleteAccount();
  };

  render() {
    const { profile, loading } = this.props.profile;
    const { user } = this.props.auth;

    let dashboardContent;

    // Dashboard
    if (profile === null || loading) {
      dashboardContent = <Spinner />;
    } else {
      // Check that current user have a profile
      if (Object.keys(profile).length > 0) {
        dashboardContent = (
          <div>
            <p className="lead text-muted">
              Welcome <Link to={`/profile/${profile.handle}`}>{user.name}</Link>
            </p>
            <ProfileActions />
            <Experience experience={profile.experience} />
            <Education education={profile.education} />
            <div style={{ marginBottom: '60px' }} />
            <button className="btn btn-danger" onClick={this.onDeleteAccount}>
              Delete My Account
            </button>
          </div>
        );
      } else {
        // Current user has no profile yet
        dashboardContent = (
          <div>
            <p className="lead text-muted">Welcome {user.name}</p>
            <p>You have not yet profile, please add some info</p>
            <Link to="create-profile" className="btn btn-lg btn-info">
              Create profile
            </Link>
          </div>
        );
      }
    }

    return (
      <div className="dashboard">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <h1 className="display-4">Dashboard</h1>
              {dashboardContent}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
});

export default connect(
  mapStateToProps,
  { getCurrentProfile, deleteAccount },
)(Dashboard);
