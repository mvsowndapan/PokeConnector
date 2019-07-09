import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

class ProfileInfo extends Component {
    constructor() {
        super();
        this.state = {
            clientId: '832de038d9300ee0dbe0',
            clientSecret: '49cbc5d090c385cba3036c6c3d56b0ff0b221a06',
            count: 5,
            sort: 'created: asc',
            repos: []
        }
    };
    componentDidMount() {
        let { username } = this.props;
        let { clientId, clientSecret, count, sort } = this.state;
        fetch(`https://api.github.com/users/${username}/repos?per_page=${count}&
            sort=${sort}&client_id=${clientId}&client_secret=${clientSecret}`)
            .then(res => res.json())
            .then(data => {
                if (this.refs.myref) { this.setState({ repos: data }); }
            })
            .catch(err => console.log(err));

    }
    render() {
        let { repos } = this.state,
            repoItem = repos.map(r => (
                < div key={r.id} className="card card-body mb-2" >
                    <div className="row">
                        <div className="col-md-6">
                            <h4>
                                <Link to={r.html_url} className="text-info" target="_blank">{r.name}</Link>
                            </h4>
                            <p>{r.description}</p>
                        </div>
                        <div className="col-md-6">
                            <span className="badge badge-info mr-1">Stars: {r.stargazers_count}</span>
                            <span className="badge badge-secondary mr-1">Watchers: {r.stargazers_count}</span>
                            <span className="badge badge-success">Forks: {r.stargazers_count}</span>
                        </div>
                    </div>
                </div >
            ));
        return (
            <div ref="myRef">
                <hr />
                {/* <h3 className="mb-4">Latest Github Repositories</h3> */}
                {repoItem}
            </div>
        )
    }
}
ProfileInfo.propTypes = {
    username: PropTypes.string.isRequired
}
export default ProfileInfo;