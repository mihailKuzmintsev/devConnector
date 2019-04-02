import React, { Component } from 'react';

class ProfileGithub extends Component {
  state = {
    clientId: '26c9ed343a1112b46dc1',
    clientSecret: 'e6a7278e237983723cad70688372d2875c8866c7',
    count: 5,
    sort: 'created: asc',
    repos: [],
  };

  componentDidMount = () => {
    const { userName } = this.props;
    const { clientId, clientSecret, count, sort } = this.state;

    fetch(
      `https://api.github.com/users/${userName}/repos?per_page=${count}&sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`,
    )
      .then((res) => res.json())
      .then((data) => {
        if (this.refs.myRef) {
          this.setState({ repos: data });
        }
      })
      .catch((err) => console.log(err));
  };

  render() {
    const { repos } = this.state;

    const listRepos = repos.map((repo) => (
      <div className="card card-body mb-2" key={repo.id}>
        <div className="row">
          <div className="col-md-6">
            <h4>
              <a
                href={repo.html_url}
                className="text-info"
                target="_blank"
                rel="noopener noreferrer"
              >
                {repo.name}
              </a>
            </h4>
            <p>{repo.description}</p>
          </div>
          <div className="col-md-6">
            <span className="badge badge-info mr-1">
              Stars: {repo.stargazers_count}
            </span>
            <span className="badge badge-secondary mr-1">
              Watchers: {repo.watchers_count}
            </span>
            <span className="badge badge-success mr-1">
              Forks: {repo.forks_count}
            </span>
          </div>
        </div>
      </div>
    ));
    return (
      <div className="profile-github" ref="myRef">
        <hr />
        <h3 className="mb-4">Latest Github Repos</h3>
        {listRepos}
      </div>
    );
  }
}

export default ProfileGithub;
