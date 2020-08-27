import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../../UI/Input/input';
import Alert from '../../../UI/Alert/alert';
import Spinner from '../../../UI/Spinner/spinner';
import * as actions from '../../../store/actions/index';

class Login extends Component {
  state = {
    user: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email'
        },
        value: '',
        label: 'Email',
        errorMessage:'',
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password'
        },
        value: '',
        label: 'Password',
        errorMessage:'',
      },
    },
    serverError : '',
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

    // Email
    const updatedEmail = { ...updatedUser.email};
    updatedEmail.errorMessage = '';
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    if (!pattern.test(this.state.user.email.value.trim())) {
      updatedEmail.errorMessage = 'Email is invalid';
      isFormValid = false;
    }

    // Password 
    const updatedPassword = { ...updatedUser.password};
    updatedPassword.errorMessage = '';
    if (this.state.user.password.value.trim() === '') {
      updatedPassword.errorMessage = 'Password is required';
      isFormValid = false;
    } 
  
    updatedUser.email = updatedEmail;
    updatedUser.password = updatedPassword;
    this.setState({ ...this.state, user: updatedUser })
    return isFormValid;
  }

  loginUserHandler = (event) => {
    event.preventDefault();

    if (this.checkValidity()) {
      const newUser = {
        password: this.state.user.password.value,
        email: this.state.user.email.value.toLowerCase(),
      }
      this.props.onLogin(newUser)
    }
  }

  render() {
  
    let redirect
    if (this.props.isAuthenticated) {
      redirect = <Redirect to='../../salary-calculator'/>
    }

    const formElementArray = [];
    for (let key in this.state.user) {
      formElementArray.push({
        id: key,
        config: this.state.user[key]
      });
    }

    let form = formElementArray.map(formElement => (
      <Input elementType={ formElement.config.elementType }
        elementConfig={ formElement.config.elementConfig }
        value={ formElement.config.value }
        key={ formElement.id }
        label={ formElement.config.label }
        onChange={ (event) => this.inputChangedHandler(event, formElement.id) }
        errorMessage={ formElement.config.errorMessage }
      />
    ))

    if (this.props.loading) {
      form = <Spinner />
    }

    let serverErrorAlert;
    if (this.props.error) {
      serverErrorAlert = <Alert className='alert-danger' message={ this.props.error }/>
    }

    return (
      <div className='container'> 
      { redirect }
        <div className='row justify-content-center'> 
          <div className='col col-lg-6'>
            <form className='shadow p-3 mb-5 bg-white rounded' >
              { form }
            <button onClick={ this.loginUserHandler } type='submit' className='btn btn-primary'>Log in</button>
              { serverErrorAlert }
            </form>
          </div>
        </div>
      </div>
    )
  }
}

const mapStatetoProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchtoProps = dispatch => {
  return {
    onLogin: (data) => dispatch(actions.login(data))
  }
};

export default connect(mapStatetoProps, mapDispatchtoProps)(Login);