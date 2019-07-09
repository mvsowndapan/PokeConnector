import React, { Component } from 'react'
import Moment from 'react-moment';
class ProfileCredits extends Component {
    render() {
        let { experience, education } = this.props,
            exp = experience.map(e => (
                <li key={e._id} className="list-group-item">
                    <h4>{e.title}</h4>
                    <p><Moment format="YYYY/MM/DD">{e.from}</Moment> -{e.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{e.to}</Moment>)}</p>
                    {e.description === '' ? null : (<p><strong>Description:</strong>{e.description}</p>)}
                </li>
            )),
            edu = education.map(e => (
                <li key={e._id} className="list-group-item">
                    <h4>{e.school}</h4>
                    <p><Moment format="YYYY/MM/DD">{e.from}</Moment> -{e.to === null ? (' Now') : (<Moment format="YYYY/MM/DD">{e.to}</Moment>)}</p>
                    <p><strong>Specialist: </strong>  {e.specialist}</p>
                    <p><strong>Degree:</strong>  {e.degree} </p>
                    {e.description === '' ? null : (<p><strong>Description:</strong>  {e.description}</p>)}
                </li>
            ));
        return (
            <div>
                <div className="row">
                    <div className="col-md-6">
                        <h3 className="text-center text-info">Experience</h3>
                        {exp.length > 0 ? (<ul className="list-group">{exp}</ul>) : (<span>No Experience Yet</span>)}
                    </div>
                    <div className="col-md-6">
                        <h3 className="text-center text-info">Education</h3>
                        {exp.length > 0 ? (<ul className="list-group">{edu}</ul>) : (<span>No Education Yet</span>)}
                    </div>
                </div>
            </div>
        )
    }
}
export default ProfileCredits;