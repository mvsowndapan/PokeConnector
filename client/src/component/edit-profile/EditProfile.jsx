import React, { Component } from 'react'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
//component
//Common
import Textfield from '../common/Textfield';
import Textarea from '../common/Textarea';
import Inputgroup from '../common/Inputgroup';
import SelectList from '../common/SelectList';
//action
import {createProfile,getCurrentProfile } from '../../actions/profileActions';
//validation
import isEmpty from '../../validation/isEmpty';

class EditProfile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            displaySocialInputs: false, handle: '',
            town: '', lab: '', location: '', status: '',
            skill: '', bio: '', github: '',
            youtube: '', twitter: '', facebook: '', instagram: '', linkedin: '',
            err: {}
        }
    };
    componentDidMount(){
        this.props.getCurrentProfile();
    }
    componentWillReceiveProps(nextStep){
        if(nextStep.err) this.setState({err:nextStep.err});
        //check for the value
        if(nextStep.profile.profile){
            let profile = nextStep.profile.profile;
            console.log(profile);
            let skillCsv = profile.skill.join(','); //Joining the skill values 
            //check every field to fille the data in cv
            profile.handle = !isEmpty(profile.handle) ? profile.handle:''; //handle
            profile.town = !isEmpty(profile.town) ? profile.town:''; //town
            profile.lab = !isEmpty(profile.lab) ? profile.lab:''; //lab
            profile.location = !isEmpty(profile.location) ? profile.location:''; //location
            profile.status = !isEmpty(profile.status) ? profile.status:''; //status
            profile.bio = !isEmpty(profile.bio) ? profile.bio:''; //bio
            profile.github = !isEmpty(profile.github) ? profile.github:''; //github
            //Social Objects
            profile.social = !isEmpty(profile.social) ? profile.social:{}; // Social Objects
            profile.youtube = !isEmpty(profile.social.youtube) ? profile.social.youtube:''; // youtube
            profile.twitter = !isEmpty(profile.social.twitter) ? profile.social.twitter:''; //twitter
            profile.facebook = !isEmpty(profile.social.facebook) ? profile.social.facebook:''; //facebook
            profile.instagram = !isEmpty(profile.social.instagram) ? profile.social.instagram:''; // instagram
            profile.linkedin = !isEmpty(profile.social.linkedin) ? profile.social.linkedin:''; //linkedin
            //set the component fields to state
           this.setState({
               handle:profile.handle,
               town:profile.town, //town
               lab :profile.lab, //lab
               location :profile.location, //location
               status :profile.status, //status
               skill :skillCsv, //skill
               bio :profile.bio, //bio
               github :profile.github, //github
               youtube :profile.youtube, // youtube
               twitter :profile.twitter, //twitter
               facebook :profile.facebook, //facebook
               instagram :profile.instagram, // instagram
               linkedin :profile.linkedin //linkedin
           });
        }
    }

    onChange = (e) => {this.setState({[e.target.name]:e.target.value})}
    onSubmit = (e) => {
        e.preventDefault();
        let {handle,town,lab,location,status,skill,bio,github,youtube,twitter,facebook,instagram,linkedin} = this.state;
        this.props.createProfile(
            {handle,town,lab,location,status,skill,bio,github,youtube,twitter,facebook,instagram,linkedin},
            this.props.history
        );
    }
    render() {
        let socialInputs;
        let {err,displaySocialInputs} = this.state,
         options = [
            {label:'* Select Your Current Status',value:0},
            {label:'Trainer',value:'Trainer'},
            {label:'Co-ordinator',value:'Co-ordinator'},
            {label:'Doctor',value:'Doctor'},
            {label:'Police Officer',value:'Police Officer'},
            {label:'Gym Leader',value:'Gym Leader'},
            {label:'Conausour',value:'Conausour'},
            {label:'Professor',value:'Professor'},
            {label:'Regional Champion',value:'Regional Champion'},
            {label:'Elite Four Member',value:'Elite Four Member'}
        ];
        if(displaySocialInputs){
            socialInputs = (
              <div>
                <h4>Social Links</h4>
                <Inputgroup
                  placeholder="Twitter Profile URL"
                  name="twitter"
                  icon="fab fa-twitter text-primary"
                  value={this.state.twitter}
                  onChange={this.onChange}
                  err={err.twitter}
                ></Inputgroup>
                <Inputgroup
                  placeholder="Youtube Profile URL"
                  name="youtube"
                  icon="fab fa-youtube text-danger"
                  value={this.state.youtube}
                  onChange={this.onChange}
                  err={err.youtube}
                ></Inputgroup>
                <Inputgroup
                  placeholder="Facebook Profile URL"
                  name="facebook"
                  icon="fab fa-facebook text-info"
                  value={this.state.facebook}
                  onChange={this.onChange}
                  err={err.facebook}
                ></Inputgroup>
                <Inputgroup
                  placeholder="Instagram Profile URL"
                  name="instagram"
                  icon="fab fa-instagram text-warning"
                  value={this.state.instagram}
                  onChange={this.onChange}
                  err={err.instagram}
                ></Inputgroup>
                <Inputgroup
                  placeholder="Linkedin Profile URL"
                  name="linkedin"
                  icon="fab fa-linkedin text-primary"
                  value={this.state.linkedin}
                  onChange={this.onChange}
                  err={err.linkedin}
                ></Inputgroup>
              </div>
            )
        }
        return (
            <div className="create-profile">
                <div className="row">
                    <div className="col-md-8 m-auto">
                        <h1 className="display-6 text-center">Edit Your Profile</h1>
                        <form onSubmit={this.onSubmit}>
                            <Textfield
                                placeholder="* Profile Handle"
                                name="handle"
                                value={this.state.handle}
                                onChange={this.onChange}
                                err={err.handle}
                                info="A unique handle for your Profile URL, Your full name,Company name,
                                nickname"
                            />
                            <SelectList
                                name="status"
                                value={this.state.status}
                                onChange={this.onChange}
                                options={options}
                                err={err.status}
                                info="Your Career"
                            />
                           <Textfield
                                placeholder="Town"
                                name="town"
                                value={this.state.town}
                                onChange={this.onChange}
                                err={err.town}
                                info="Town Name"
                            />
                             <Textfield
                                placeholder="lab"
                                name="lab"
                                value={this.state.lab}
                                onChange={this.onChange}
                                err={err.lab}
                                info="Lab Name"
                            />
                             <Textfield
                                placeholder="Location of the house"
                                name="location"
                                value={this.state.location}
                                onChange={this.onChange}
                                err={err.location}
                                info="Location of the House"
                            />
                             <Textfield
                                placeholder="* Skill"
                                name="skill"
                                value={this.state.skill}
                                onChange={this.onChange}
                                err={err.skill}
                                info="Enter your Skills"
                            />
                             <Textfield
                                placeholder="Github Username"
                                name="github"
                                value={this.state.github}
                                onChange={this.onChange}
                                err={err.github}
                                info="Github Username"
                            />
                              <Textarea
                                placeholder="Bio"
                                name="bio"
                                value={this.state.bio}
                                onChange={this.onChange}
                                err={err.bio}
                                info="Bio data"
                            />

                            <div className="mb-3">
                                <button type="button" className="btn btn-outline-info"
                                onClick={()=>{
                                    this.setState(prevState => ({
                                        displaySocialInputs:!prevState.displaySocialInputs
                                    }))
                                }}>Add Social Links </button>
                            </div>
                            {socialInputs}
                            <input type="submit" value="Submit" className="btn btn-outline-success btn-block mt-4"/>
                        </form>
                    </div>
                </div>
            </div>
        )
    }
}

EditProfile.propTypes = {
    createProfile:PropTypes.func.isRequired,
    getCurrentProfile:PropTypes.func.isRequired,
    err: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
}
const mapStoreToProps = state => ({
    profile: state.profile,
    err: state.err
});
export default connect(mapStoreToProps,{createProfile,getCurrentProfile})(withRouter(EditProfile));