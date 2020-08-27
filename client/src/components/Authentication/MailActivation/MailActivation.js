import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from '../../../UI/Input/input';
import Spinner from '../../../UI/Spinner/spinner';
import Alert from '../../../UI/Alert/alert';
import * as actions from '../../../store/actions/index'

import * as constant from '../../../helpers/constants';

class MailActivation extends Component {

  state = {
    loading: true,
    isTokenValid: null,
    email: null,
    posted: false,
    alert: false,
    redirect: false,
    serverError : '',
    user: {
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password'
        },
        value: '',
        label: 'Password',
        errorMessage:'',
      },
      confirmPassword: {
        elementType: 'input',
        elementConfig: {
          type: 'password'
        },
        value: '',
        label: 'Confirm password',
        errorMessage:'',
      },
    },

  }

  componentDidMount() {
    const token = this.props.match.params.token
    console.log(`${constant.apiURL}/user/confirmation/${token}`)
    axios.get(`${constant.apiURL}/user/confirmation/${token}`)
      .then(res => {
        console.log('res', res)
        this.setState({ ...this.state, loading: false, isTokenValid: true, email: res.data.email })
      })
      .catch(error => {
      this.setState({ ...this.state, loading: false, isTokenValid: false })
      console.log(error)
      })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedUser = { ...this.state.user };
    const updateUserElement = { ...updatedUser[inputIdentifier]};
    updateUserElement.value = event.target.value;
    updatedUser[inputIdentifier] = updateUserElement;
    this.setState({ ...this.state, user: updatedUser });
  }

  checkValidity = () => {
    let isFormValid = true;
    const updatedUser = { ...this.state.user };

    // Password 
    const updatedPassword = { ...updatedUser.password };
    const alphanumeric = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,20}$/;
    updatedPassword.errorMessage = '';
    if (this.state.user.password.value.trim() === '') {
      updatedPassword.errorMessage = 'Password is required';
      isFormValid = false;
    } else {
      if (!this.state.user.password.value.trim().match(alphanumeric)) {
        updatedPassword.errorMessage = 'Password must be between 8 to 20 characters with at least one numeric digit and one special character';
        isFormValid = false;
      } 
    }
    
    // Confirm password 
    const updatedConfirmPassword = { ...updatedUser.confirmPassword};
    updatedConfirmPassword.errorMessage = '';
    if (this.state.user.password.value !== this.state.user.confirmPassword.value) {
      updatedConfirmPassword.errorMessage = 'Passwords do not match';
      isFormValid = false;
    }

    updatedUser.password = updatedPassword;
    updatedUser.confirmPassword = updatedConfirmPassword;
    this.setState({ ...this.state, user: updatedUser })
    return isFormValid;
  }

  updatePassword = (event) => {
    event.preventDefault();

    if (this.checkValidity()) {
      const token = this.props.match.params.token;
      const user = { email: this.state.email, password: this.state.user.password.value };
      axios.post(`${constant.apiURL}/user/confirmation/${token}`, user)

        .then(res => {
          this.props.onLogin(user);
          this.setState({ ...this.state, posted: true, serverError: ''});
          this.props.history.push({
            pathname: '../../salary-calculator',
          })
        })
        .catch(error => {
          const errorArray = error.response.data.message.split('Error: ');
          this.setState({ ...this.state, posted: false, serverError: errorArray.join('') })
        }
      )
    }
  }

  render() {

    const formElementArray = [];
    for (let key in this.state.user) {
      formElementArray.push({
        id: key,
        config: this.state.user[key]
      });
    }

    let form = formElementArray.map(formElement => (
      <Input elementType={formElement.config.elementType}
        elementConfig={formElement.config.elementConfig}
        value={formElement.config.value}
        key={formElement.id}
        label={formElement.config.label}
        onChange={(event) => this.inputChangedHandler(event, formElement.id)}
        errorMessage={formElement.config.errorMessage}
      />
    ))

    let alert;
    if (this.state.serverError !== '') {
      alert = <Alert className={'alert-danger'} message={this.state.serverError}/>
    }

    let serveurResponse;
    let button = <button onClick={this.updatePassword} type='submit' className='btn btn-primary'>Create password</button>

    if (this.state.loading) {
      serveurResponse = <Spinner></Spinner>
      form = <p></p>;
      button = <p></p>;
    } else {
      if (this.state.isTokenValid) {
        serveurResponse = <p> Please choose your password :</p>
      } else {
        serveurResponse = <p> This link is expired.</p>
        form = <p></p>;
        button = <p></p>;
      }
    }

    return (
      <div className='container'> 
        <div className='row justify-content-center'> 
          <div className='col col-lg-6'>
            <form className='shadow p-3 mb-5 bg-white rounded'>
              { serveurResponse }
              { form }
              { button }
              { alert }
            </form>
          </div>
        </div>
      </div>
    )
  }

}

const mapDispatchtoProps = dispatch => {
  return {
    onLogin: (data) => dispatch(actions.login(data))
  }
};

export default connect(null, mapDispatchtoProps)(MailActivation);