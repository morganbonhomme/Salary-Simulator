import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import Input from '../../../UI/Input/input';
import Alert from '../../../UI/Alert/alert';
import SimpleDropdown from '../../../containers/Simulator/FormGroup/SimpleDropdown';
import ForbiddenAccess from '../../../UI/Forbidden Access/forbiddenAccess';
import * as constant from '../../../helpers/constants';

class CreateUser extends Component {

  state = {
    user: {
      firstName: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: '',
        label: 'First name',
        errorMessage:'',
      },
      lastName: {
        elementType: 'input',
        elementConfig: {
          type: 'text'
        },
        value: '',
        label: 'Last name',
        errorMessage:'',
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email'
        },
        value: '',
        label: 'Email',
        errorMessage:'',
      },
    },
    role: 'Team',
    serverError : '',
    posted: false,
  }

  checkValidity = () => {
    let isFormValid = true;
    const updatedUser = { ...this.state.user };

    // First Name 
    const updatedFirstName = { ...updatedUser.firstName};
    updatedFirstName.errorMessage = '';
    if (this.state.user.firstName.value.trim() === '') {
      updatedFirstName.errorMessage = 'First name is required';
      isFormValid = false;
    } 

    // Last Name
    const updatedLastName = { ...updatedUser.lastName};
    updatedLastName.errorMessage = '';
    if (this.state.user.lastName.value.trim() === '') {
      updatedLastName.errorMessage = 'Last name is required';
      isFormValid = false;
    } 

    // Email
    const updatedEmail = { ...updatedUser.email};
    updatedEmail.errorMessage = '';
    const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
    console.log()
    if (!pattern.test(this.state.user.email.value.trim())) {
      updatedEmail.errorMessage = 'Email is invalid';
      isFormValid = false;
    }

    updatedUser.firstName = updatedFirstName;
    updatedUser.lastName = updatedLastName;
    updatedUser.email = updatedEmail;
    this.setState({ ...this.state, user: updatedUser })
    return isFormValid;
  }

  createNewUserHandler = (event) => {
    event.preventDefault();

    if (this.checkValidity()) {
      const newUser = {
        firstName: this.state.user.firstName.value,
        lastName: this.state.user.lastName.value,
        email: this.state.user.email.value.toLowerCase(),
        role: this.state.role,
      }
  
      axios.post(`${constant.apiURL}/user/create`, newUser)
        .then(res => {
          this.setState({ ...this.state, posted: true, serverError: ''})
        }
        )
        .catch(error => {
          const errorArray = error.response.data.message.split('Error: ');
          this.setState({ ...this.state, posted: false, serverError: errorArray.join('') })
        }
      )
    }
  }

  selectedValueChangeHandler = (event) =>  {
    console.log(event.target.value)
    this.setState({ ...this.state, role: event.target.value })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedUser = { ...this.state.user };
    const updateUserElement = { ...updatedUser[inputIdentifier] };
    updateUserElement.value = event.target.value;
    updatedUser[inputIdentifier] = updateUserElement;
    this.setState({ ...this.state, user: updatedUser });
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
      <Input elementType={ formElement.config.elementType }
        elementConfig={ formElement.config.elementConfig }
        value={ formElement.config.value }
        key={ formElement.id }
        label={ formElement.config.label }
        onChange={ (event) => this.inputChangedHandler(event, formElement.id) }
        errorMessage={ formElement.config.errorMessage }
      />
    ))

    let role = <SimpleDropdown 
      choices={ ['Team', 'Admin'] } 
      key={ 'role' } 
      id={ 'role' } 
      name={ 'Role' }
      onChange={ this.selectedValueChangeHandler }> 
    </SimpleDropdown>

    let createButton = <button onClick={ this.createNewUserHandler } type="submit" className="btn btn-primary">Create</button>

    let alert;
    let goBackButton;

    if (this.state.posted) {
      goBackButton = <a href='/settings/users' className="btn btn-primary" role="button" aria-pressed="true">Go back</a>
      createButton = null;
      alert = <Alert className={ 'alert-success' } message={ 'Email sent' }/>
    } else {
      if (this.state.serverError !== '') {
        alert = <Alert className={ 'alert-danger' } message={ this.state.serverError }/>
      }
    } 

    let page =  <form className="shadow p-3 mb-5 bg-white rounded">
      { form }
      { role }
      { createButton }
      { alert }
      { goBackButton }
    </form>

    if (this.props.role === "Team") {
      page = <ForbiddenAccess></ForbiddenAccess>
    }

    return (
      <div className="container"> 
        <div className="row justify-content-center"> 
          <div className="col col-lg-6">
            <h2>Create User</h2>
            { page }
          </div>
        </div>
      </div>
    )
  }

}

const mapStatetoProps = state => {
  return {
    token: state.auth.token,
    userID: state.auth.userID,
    role: state.auth.role,
  }
};

export default connect(mapStatetoProps)(CreateUser);
