import React, { Component } from 'react'
//connecting the component into the redux
import { connect } from 'react-redux';
//to use the loginUser function from actions/authActions import it
import { loginUser } from '../../actions/authActions';
//All the actions data are to included into the props so that we can use in another function this data as well,
// and we need to ass all the property of the component into the proptypes
import PropTypes from 'prop-types';
//textfield common template
import Textfield from '../common/Textfield';
class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: '',
      password: '',
      err: {}
    };
  };

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }
  componentDidMount() {
    if (this.props.auth.isAuthenticated) this.props.history.push('/dashboard');
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) this.props.history.push('/dashboard');
    if (nextProps.err) this.setState({ err: nextProps.err });
  }
  onSubmit = (e) => {
    e.preventDefault();
    let { email, password } = this.state;
    this.props.loginUser({ email, password });
  }

  render() {
    let { err } = this.state;
    console.log(err);
    return (
      <div>
        <div className="login">
          <div className="container">
            <div className="row">
              <div className="col-md-8 m-auto">
                <h1 className="display-6 text-center">Log In</h1>
                <p className="lead text-center">Sign in to your PokeConnector account</p>
                <form noValidate onSubmit={this.onSubmit}>
                  <Textfield
                    type='email'
                    name='email'
                    placeholder='Email Address'
                    value={this.state.email}
                    onChange={this.onChange}
                    err={err.email}
                  />
                  <Textfield
                    type='password'
                    name='password'
                    placeholder='Password'
                    value={this.state.password}
                    onChange={this.onChange}
                    err={err.password}
                  />
                  <input type="submit" className="btn btn-dark btn-block mt-4" value="Login" />
                </form>
              </div>
            </div>
          </div>
        </div>

      </div >
    )
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  err: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  err: state.err
});
export default connect(mapStateToProps, { loginUser })(Login);
