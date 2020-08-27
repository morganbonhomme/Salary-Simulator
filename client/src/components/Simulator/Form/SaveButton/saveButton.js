import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import * as transformData from '../../../../helpers/transformData';
import axios from 'axios';
import * as constant from '../../../../helpers/constants';

class SaveButton extends Component { 
  state = {
    selectedUser: '',
    selectedSalary: '',
    redirect: false,
    loading: false,
  }

  componentDidMount() {
    const results = transformData.salaryCalculation(this.props.data, this.props.currentValues, this.props.rangeFactor);
    this.setState({ ...this.state,
      selectedUser: this.props.selectedUser ? this.props.selectedUser : '', selectedSalary: Math.round(results) })
  }

  saveSalary = (userID, salary, factors, token) => {
    const data = { userID, salary, factors }
    const header = { headers: {'Authorization' : `Bearer ${token}`}};
    axios.post(`${constant.apiURL}/user/savesalary`, data, header)
      .then(res => 
        this.setState({ ...this.state, redirect: true }))
      .catch(error => console.log(error))
  }

  selectedUserChangeHandler = (event) => {
    const userID = event.target.value;
    this.setState({ ...this.state, selectedUser: userID })
  }

  saveSalaryHandler = () => {
    const results = transformData.salaryCalculation(this.props.data, this.props.currentValues, this.props.rangeFactor);
    const selectedUser = this.props.selectedUser ? this.props.selectedUser : this.state.selectedUser;
    this.saveSalary(selectedUser, (Math.round(results/1000) * 1000), this.props.currentValues, this.props.token);
    this.setState({ ...this.state, selectedSalary: results });
  }
  
  render () {
    let users = this.props.users.map(user => {
      if (this.props.selectedUser === user.email) {
        return (
          <option 
            key={user.email} 
            value={user.email}
            selected>
          {`${user.firstName} ${user.lastName}`}
          </option>
        )
      } else {
        return (
          <option 
            key={user.email} 
            value={user.email}>
            {`${user.firstName} ${user.lastName}`}
          </option>
        )
      }
    });

    

    let select;
    if (this.props.selectedUser !== null) {
      select = <select 
      disabled
      className='custom-select w-75 ' >
      {users}
  </select>
    } else {
      select = <select 
      className='custom-select' 
      onChange={(event) => this.selectedUserChangeHandler(event)}>
      <option 
        key={'Empty'} 
        value={null}>
          Select an employee
      </option>
      {users}
  </select>
    }

    let user = this.props.users.filter(user => this.props.selectedUser === user.email ? user : null )
    let userSelected;
    if (user.length > 0) {
      userSelected = <p> {`${user[0].firstName} ${user[0].lastName}`} </p>
    }

    let redirect;
    if (this.state.redirect) {
      redirect = <Redirect to='/users-information'/>
    }
    
    return (
      <div className='container-fluid p-3 mb-5 bg-light border rounded '>
        {redirect}
        <div className='row justify-content-end'>
          <div className='col-12 text-center'>
            Save this salary for : 
          </div>
          <div className='col-12 font-weight-bold text-center'>
            {userSelected}
          </div>
          <div className='col-12 text-center'> 
            <button 
            type='button' 
            className='btn btn-primary'
            onClick={this.saveSalaryHandler}>Save</button>
          </div>
        </div>
      </div>
    )
  }
  
};

export default SaveButton;