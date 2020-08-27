import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../../../UI/Spinner/spinner';
import IsActive from '../../../containers/EmployeesInformation/isActive';
import Aux from '../../../hoc/aux';
import ForbiddenAccess from '../../../UI/Forbidden Access/forbiddenAccess';
import * as constant from '../../../helpers/constants';
import SettingModal from '../../../UI/Modal/settingsModal';

class UserSettings extends Component {
  
  state = {
    loading: true,
    employees: null,
    removeValue: '',
    removeAlert: null,
  }

  fetchUsers = (token) => {
    axios.get(`${constant.apiURL}/user/getusers`, { headers: {'Authorization' : `Bearer ${token}`}})
    .then(res => { 
      this.setState ({ ...this.state, employees: res.data.body, loading: false })
    })
    .catch (error => {
      console.log(error.response.data.message);
      this.setState ({ ...this.state, loading: false })
    })
  };

  componentDidMount() {
    if (this.props.token !== null) {
      this.fetchUsers(this.props.token);
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.token !== this.props.token)  {
      this.fetchUsers(this.props.token)
    }
  }

  redirectCreateUserHandler = () => {
    this.props.history.push({
      pathname: '/create-user',
    })
  }

  sendMailHandler = (event, email) => {
    const data = { email }
    const header = { headers: {'Authorization' : `Bearer ${this.props.token}`}};
    axios.post(`${constant.apiURL}/user/send-mail`, data, header )
    .then(res => { 
      this.setState({ ...this.state, mailSent: true })
    })
    .catch (error => {
      console.log(error.response.data.message);

    })
  }

  closeAlertMailHandler = () => {
    this.setState({ ...this.state, mailSent: false })
  }

  changeRoleHandler = (event, userID, token) => {
    const data = { role: event.target.value, userID }
    const header = { headers: {'Authorization' : `Bearer ${token}`}};
    axios.post(`${constant.apiURL}/user/saverole`, data, header)
      .then(res => console.log(res))
      .catch(error => console.log(error))
  }

  onChangeHandler = (event) => {
    this.setState({ ...this.state, removeValue: event.target.value})
  }

  checkRemoveValidity = (text) => {
    if (text === 'REMOVE') {
      return true
    } else {
      return false
    }
  }

  removeUserHandler = (event, userID, token) => {
    event.preventDefault()
    if (this.checkRemoveValidity(this.state.removeValue)) {
      const data = { userID }
      const header = { headers: {'Authorization' : `Bearer ${token}`}};
      axios.post(`${constant.apiURL}/user/delete`, data, header)
      .then(res => {
        this.setState({ ...this.state, removeAlert: 'success' })
      }
      )
      .catch(error => console.log(error))
    } else {
      this.setState({ ...this.state, removeAlert: 'typingError' })
    }
  }

  closeModalHandler = () => {
    if (this.state.removeAlert === 'success') {
      window.location.reload(false);
    } else {
      console.log('not')
    }
  }

  render () {

    let employees = [];

    let alertMailSent;
    if (this.state.mailSent) {
      alertMailSent =  <div class='alert alert-success alert-dismissible fade show' role='alert'>
        Mail sent
        <button type='button' class='close' data-dismiss='alert' aria-label='Close' onClick={this.closeAlertMailHandler}>
        <span aria-hidden='true'>&times;</span>
      </button>
      </div>
    }

    if (this.state.employees) {
      Object.values(this.state.employees).map(value => {
        let employee;
        if (value.email === this.props.userID) {
          employee = 
          <tr key={value.email}>
            <td className='align-middle'>{`${value.firstName} ${value.lastName}`}</td>
            <td className='align-middle text-center'>
              <select className='custom-select' name='role' id='role' disabled>
                <option> { value.role } </option>
              </select>
            </td>
            <td className='align-middle text-center'><IsActive isActive={value.active} onClick={(event, number) => this.sendMailHandler(event, value.email)}/></td>
            <td></td>
          </tr>
        } else {
          employee = 
          <tr key={value.email}>
            <td className='align-middle'>{`${value.firstName} ${value.lastName}`}</td>
            <td className='align-middle text-center'>
              <select className='custom-select' name='role' id='role' defaultValue={value.role} onChange={ (event) => this.changeRoleHandler(event, value.email, this.props.token)}>
                <option value='Team'>Team</option>
                <option value='Admin'>Admin</option>
              </select>
            </td>
            <td className='align-middle text-center'>
              <IsActive isActive={value.active} onClick={(event, number) => this.sendMailHandler(event, value.email)}/>
            </td>
            <td className='align-middle text-center'>
              <SettingModal 
                name={`${value.firstName} ${value.lastName}`} 
                value={this.state.removeValue} 
                onChange={this.onChangeHandler} 
                removeAlert={this.state.removeAlert} 
                onClick={(event)  => this.removeUserHandler(event, value.email, this.props.token)}
                closeModal={this.closeModalHandler}></SettingModal>
            </td>
          </tr>
        }
          employees.push(employee)
      })
    }

    let page = 
    <Aux>
      { alertMailSent}
      <table className='table table-responsive table-striped table-borderless'>
        <thead>
          <tr>
            <th className='text-center' scope='col'>Name</th>
            <th className='text-center' scope='col'>Role</th>
            <th className='text-center' scope='col'>Active</th>
            <th className='text-center' scope='col'>Delete</th>
          </tr>
        </thead>
        <tbody>
          {employees}
        </tbody>
      </table>
      <button onClick={this.redirectCreateUserHandler} className='btn btn-primary'> Add user </button>
    </Aux>

    if (this.state.loading) {
      page = <Spinner></Spinner>;
    }
    
    if (this.props.role === "Team") {
      page = <ForbiddenAccess></ForbiddenAccess>
    }
  
    return (
      <div className='container'> 
        <div className='row justify-content-center'> 
          <div className='col-12 col-md-auto mx-auto'>
            <h2> Users settings </h2>
            {page}
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

export default connect(mapStatetoProps)(UserSettings);