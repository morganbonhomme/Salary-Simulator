import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';

import SimpleDropDown from '../../../containers/Simulator/FormGroup/SimpleDropdown';
import MasterGroup from '../../../containers/Simulator/FormGroup/MasterGroup';
import SaveButton from './SaveButton/saveButton';
import Results from '../../../containers/Simulator/Results/Results';
import Spinner from '../../../UI/Spinner/spinner';
import Aux from '../../../hoc/aux';
import UserData from '../../../containers/Simulator/UserData/userData';
import * as transformData from '../../../helpers/transformData';
import * as constant from '../../../helpers/constants';

class Form extends Component {
  state = {
    data: {},
    cities: {},
    values: {
      job: null,
      masterRange: null,
      masterValue: 0.85,
      seniority: null,
      contract: null,
      country: null,
      city: null,
    },
    defaultValues: {},
    loading: true,
    loadingUserData : true,
    users: [],
    selectedUser: null,
    authenticatedEmployeeSalary: null,
    noData: null,
  };

  fetchUserData = (token, userID) => {
    const config = { headers: { 'Authorization' : `Bearer ${token}`} }
    const request = axios.get(`${constant.apiURL}/user/getuser/${userID}`, config)
    .then(res => { 
      const values = { ...this.state.values }
      let noData = false;

      if (res.data.body.job === '') {
        values.job = this.state.defaultValues.job
        noData = true;
      } else {
        values.job = res.data.body.job }

      if (res.data.body.masterRange === '') {
        values.masterRange = this.state.defaultValues.masterRange
      } else {
        values.masterRange = res.data.body.masterRange }

        if (res.data.body.masterValue === 0 ) {
          values.masterValue = this.state.defaultValues.masterValue
        } else {
          values.masterValue = res.data.body.masterValue }

        if (res.data.body.seniority === '') {
          values.seniority = this.state.defaultValues.seniority
        } else {
          values.seniority = res.data.body.seniority }

        if (res.data.body.contract === '') {
          values.contract = this.state.defaultValues.contract
        } else {
          values.contract = res.data.body.contract }

        if (res.data.body.country === '') {
          values.country = this.state.defaultValues.country
        } else {
          values.country = res.data.body.country }
        
        if (res.data.body.city === '') {
          values.city = this.state.defaultValues.city
        } else {
          values.city = res.data.body.city }

      this.setState({ ...this.state, values: values, authenticatedEmployeeSalary: res.data.body.salary, loadingUserData : false, noData });
      
      
    })
    .catch(error => console.log('error', error))
    return request
  }

  fetchData = token => {
    const request = axios.get(`${constant.apiURL}/simulator`, { headers: {'Authorization' : `Bearer ${token}`}})
      .then(response => {
        const values = {...this.state.values};

        values.job = this.props.location.state ? 
          (this.props.location.state.job === '' ? response.data.body.job[0].name : this.props.location.state.job) 
        : response.data.body.job[0].name;

        values.masterRange = this.props.location.state ? 
          (this.props.location.state.masterRange === '' ? response.data.body.master[0].name : this.props.location.state.masterRange) 
        : response.data.body.master[0].name;

        values.masterValue = this.props.location.state ? 
          (this.props.location.state.masterValue === 0 ? 0.85 : this.props.location.state.masterValue) 
        : 0.85 ;

        values.seniority = this.props.location.state ? 
          (this.props.location.state.seniority === '' ? response.data.body.seniority[0].name : this.props.location.state.seniority) 
        : response.data.body.seniority[0].name;

        values.contract = this.props.location.state ? 
          (this.props.location.state.contract === '' ? response.data.body.contract[0].name : this.props.location.state.contract) 
        : response.data.body.contract[0].name;

        values.country = this.props.location.state ?
          (this.props.location.state.country === '' ? [...new Set(response.data.body.country.map(country => country.name))].sort()[0] : this.props.location.state.country) 
        : [...new Set(response.data.body.country.map(country => country.name))].sort()[0];

        values.city = this.props.location.state ? 
          (this.props.location.state.city === '' ? 'All' : this.props.location.state.city) 
        : 'All';
       
        this.setState({ ...this.state,
          data: response.data.body,
          values,
          defaultValues: values,
          loading: false,
        });
      })
      .catch(error => {
        this.setState({ ...this.state, loading: false });
        console.log(error.response.data.message)
      })
    return request;
  };

  fetchUsers = (token) => {
    const request = axios.get(`${constant.apiURL}/user/getusers`, { headers: {'Authorization' : `Bearer ${token}`}})
    .then(res => { 
      this.setState({ ...this.state, users: res.data.body });
    })
    .catch (error => console.log(error.response.data.message));
    return request
  };
  
  async componentDidMount () {
    if (this.props.token !== null) {
      await this.fetchData(this.props.token);
      await this.fetchUsers(this.props.token);
        if (this.props.location.state === undefined) {
          await this.fetchUserData(this.props.token, this.props.userID);
        }
    } else {
      this.setState({ ...this.state,
        loading: false,
      })
    }
  }

  selectedValueChangeHandler = (event, type) =>  {
    const values = {...this.state.values};
    values[type] = event.target.value;

    if (type === 'country') {
      const citychoices = transformData.fetchMatchingCities(this.state.data, event.target.value);
      values.city = citychoices[0];
    }

    if (type === 'masterValue') {
      values.masterValue = event.target.value;
    }

    if (type === 'masterRange') {
      const rangeValue = transformData.fetchMasterRange(this.state.data, event.target.value)[0]
      values.masterValue = rangeValue
    }

    this.setState({ ...this.state, values })
  }

  render () {

    const data = this.state.data;

    let jobGroup;
    if (data.job) {
      jobGroup = <SimpleDropDown 
        onChange={(event) => this.selectedValueChangeHandler(event, 'job')}
        name='Job'
        key='job'
        id='job'
        choices={ transformData.fetchChoices(data, 'job')} 
        selected={ this.state.values.job }/>
    }

    let countryGroup;
    let cityGroup;  
    if (data.country) {

      countryGroup = <SimpleDropDown 
        onChange={(event) => this.selectedValueChangeHandler(event, 'country')}
        name='Country'
        key='country'
        id='country'
        choices={transformData.fetchChoices(data, 'country').sort()} 
        selected={this.state.values.country}/>

      cityGroup = <SimpleDropDown 
        onChange={(event) => this.selectedValueChangeHandler(event, 'city')}
        name='City or Area' 
        key='city' 
        id='city' 
        choices={transformData.fetchMatchingCities(data, this.state.values.country)} 
        selected={this.state.values.city}/>
    }

    let seniorityGroup;
    if (data.seniority) {
      seniorityGroup = <SimpleDropDown 
        onChange={(event) => this.selectedValueChangeHandler(event, 'seniority')}
        name='Seniority'
        key='seniority'
        id='seniority'
        choices={transformData.fetchChoices(data, 'seniority')} 
        selected={this.state.values.seniority}/>

    }

    let masterGroup;
    if (data.master) {
      const range = transformData.fetchMasterRange(data, this.state.values.masterRange);
      masterGroup = <MasterGroup 
        rangeChanged={(event) => this.selectedValueChangeHandler(event, 'masterValue')}
        inputValue={this.state.values.masterValue}
        onChange={(event) => this.selectedValueChangeHandler(event, 'masterRange')}
        name='Master level of the role' 
        key='master' 
        id='master'  
        choices={transformData.fetchChoices(data, 'master')}
        min={range[0]}
        max={range[1]} 
        selected={ this.state.values.masterRange }
        />
        
    }

    let contractGroup;
    if (data.contract) {
      contractGroup = <SimpleDropDown 
        onChange={(event) => this.selectedValueChangeHandler(event, 'contract')}
        name='Contract'
        key='contract'
        id='contract'
        choices={transformData.fetchChoices(data, 'contract')} 
        selected={this.state.values.contract}/>

    }

    let results;
    if (this.state.values.job) {
      results = <Results 
      data={this.state.data}
      currentValues={this.state.values}
      rangeFactor={this.state.values.masterValue}> </Results>
    }

    let basicForm = <div className='shadow p-3 mb-5 bg-white rounded'>
      {jobGroup}
      {countryGroup}
      {cityGroup}
      {seniorityGroup}
      {masterGroup}
      {contractGroup}
      {results}
    </div>

    // ADMIN FEATURES
    let saveButton;
      if (this.state.values.job ) {
      saveButton = <SaveButton 
        token={this.props.token}
        users={this.state.users}
        data={this.state.data}
        currentValues={this.state.values}
        rangeFactor={this.state.values.masterValue}
        selectedUser={ this.props.location.state ? this.props.location.state.email : null}>
      </SaveButton>
    }

    // TEAM FEATURES
    let userData;
    
    if (this.state.noData === null) {
      userData = <Spinner></Spinner>
    } else if (this.state.noData === true) {
      userData =<div className='container-fluid mb-3 bg-light border rounded '>
      <div className='row justify-content-center '>
        <div className='col my-2 text-center'> 
        <p className='my-1'> Your salary has not been defined yet </p>
        </div>
      </div>
    </div>
    } else {
      userData = <UserData values={this.state.values} salary={this.state.authenticatedEmployeeSalary}></UserData>
    }

    // FULL FORM
    let form;
    if (this.props.role === 'Admin') {
      if (this.props.location.state !== undefined) {
        form = 
          <Aux> 
            { basicForm }
            { saveButton }
          </Aux>
      } else {
        form = 
        <Aux> 
          { userData }
          { basicForm }
        </Aux>
      }
    } else if (this.props.role === 'Team') {
      form = 
        <Aux> 
          { userData }
          { basicForm }
        </Aux>
    }

    if (this.state.loading && this.state.loadingUserData) {
      form = <Spinner />;
    }

    return (
      <div className='container'> 
        <div className='row justify-content-center'> 
          <div className='col col-lg-8'>
            {form}
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

export default connect(mapStatetoProps)(Form);