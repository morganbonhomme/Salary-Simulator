import React, { Component } from 'react'; 
import { connect } from 'react-redux';
import axios from 'axios';

import Spinner from '../../UI/Spinner/spinner';
import Aux from '../../hoc/aux';
import ForbiddenAccess from '../../UI/Forbidden Access/forbiddenAccess';
import * as constant from '../../helpers/constants';

class EmployeesInformation extends Component {
  
  state = {
    employees: {},
    selectedUser: null,
    loading: true,
  }

  fetchUsers = (token) => {
   
    const request = axios.get(`${constant.apiURL}/user/getusers`, { headers: {'Authorization' : `Bearer ${token}`}})
    .then(res => { 
      this.setState ({ ...this.state, employees: res.data.body })
      console.log('fetching User done and updated state')
    })
    .catch (error => {
      console.log(error.response.data.message);
      this.setState ({ ...this.state })
    })
    return request
  };

  async componentDidMount() {
    if (this.props.token !== null) {
      console.log('Component did Mount - fetch users start')
      await this.fetchUsers(this.props.token);
      this.setState({ ...this.state, loading: false })
      console.log('page stop load')
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.token !== this.props.token)  {
      this.fetchUsers(this.props.token)
    }
  }

  redirectWithInfoHandler = (data) => {
    this.props.history.push({
      pathname: '../salary-calculator',
      state: data
    })
  }

  render () {

    let employees = [];
    let editTitle;
  
    // ADMIN FEATURES
    if (this.props.role === 'Admin') {
      editTitle =  <th className='text-center' scope='col'>Edit</th>;
    }

    if (this.state.employees) {
      console.log('render employees in the Dom')
      Object.values(this.state.employees).map(value => {
        const employee = 
          <tr key={ value.email }>
            <td className='align-middle'>{`${ value.firstName } ${ value.lastName }` }</td>
            <td className='align-middle text-center'>{ value.salary === 0 ? '' : (new Intl.NumberFormat('fr', { style: 'currency', minimumFractionDigits : 0, currency: 'EUR' }).format(value.salary.toFixed())) }</td>
            <td className='align-middle text-center'>{ value.job }</td>
            <td className='align-middle text-center'>{ value.country === '' ? '' : `${ value.country }, ${ value.city }` }</td>
            <td className='align-middle text-center'>{ value.seniority }</td>
            <td className='align-middle text-center'>{ value.masterRange === '' ? '' : `${ value.masterRange } - ${ value.masterValue }` }</td>
            <td className='align-middle text-center'>{ value.contract }</td>
            <td className='align-middle text-center'><button onClick={() => this.redirectWithInfoHandler({
              job: value.job,
              masterRange: value.masterRange,
              masterValue: value.masterValue,
              seniority: value.seniority,
              contract: value.contract,
              country: value.country,
              city: value.city,
              email: value.email
            })} type='button' className='btn btn-warning'>Edit</button></td>
          </tr>
          employees.push(employee)
      })
    }

    let page = 
    <Aux>
      <table className='table table-striped table-borderless table-sm table-responsive'>
        <thead>
          <tr>
            <th className='text-center' scope='col'>Name</th>
            <th className='text-center' scope='col'>Salary</th>
            <th className='text-center' scope='col'>Job</th>
            <th className='text-center' scope='col'>Localisation</th>
            <th className='text-center' scope='col'>Seniority</th>
            <th className='text-center' scope='col'>Master level</th>
            <th className='text-center' scope='col'>Contract</th>
            {editTitle}
          </tr>
        </thead>
        <tbody>
          {employees}
        </tbody>
      </table>
    </Aux>

    if (this.state.loading) {
      console.log('page is loading')
      page = <Spinner></Spinner>;
    }

    if (this.props.role === "Team") {
      page = <ForbiddenAccess></ForbiddenAccess>
    }

    return (
      <div className='container'> 
        <div className='row justify-content-center'> 
          <div className='col-auto'>
            <h2> Team's wage </h2>
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

export default connect(mapStatetoProps)(EmployeesInformation);