import React, { Component } from 'react';
import isEmpty from '../../validation/is-empty';

class ProfileHeader extends Component {
  render() {
    const { profile } = this.props;

    const renderLink = (link, icon, social = true) => {
      const result = isEmpty(link && social) ? null : (
        <a
          href={link}
          className="text-white p-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i
            className={
              icon === 'globe' ? `fas fa-${icon} fa-2x` : `fab fa-${icon} fa-2x`
            }
          />
        </a>
      );

      return result;
    };

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="card bg-info card-body mb-3 text-white text-center">
            <div className="row">
              <div className="col-4 col-md-3 m-auto">
                <img
                  src={profile.user.avatar}
                  alt={profile.user.name}
                  className="rounded-circle"
                />
              </div>
            </div>
            <div>
              <h1 className="display-4">{profile.user.name}</h1>
              <p className="lead">
                {profile.status}{' '}
                {isEmpty(profile.company) ? null : (
                  <span>at {profile.company}</span>
                )}
              </p>
              <p>{isEmpty(profile.location) ? null : profile.location}</p>
              <p>
                {renderLink(profile.website, 'globe')}
                {renderLink(profile.social.vk, 'vk', profile.social)}
                {renderLink(
                  profile.social.instagram,
                  'instagram',
                  profile.social,
                )}
                {renderLink(
                  profile.social.facebook,
                  'facebook',
                  profile.social,
                )}
                {renderLink(profile.social.youtube, 'youtube', profile.social)}
                {renderLink(profile.social.twitter, 'twitter', profile.social)}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ProfileHeader;
