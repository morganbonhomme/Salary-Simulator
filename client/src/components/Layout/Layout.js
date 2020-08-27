import React, { Component } from 'react';
import { Route, withRouter, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

import Aux from '../../hoc/aux';
import Navbar from '../../containers/Navbar/navbar'
import SalaryCalculator from '../Simulator/Form/Form';
import CreateUser from '../Authentication/CreateUser/CreateUser';
import Login from '../Authentication/Login/Login';
import Logout from '../Authentication/Logout/Logout';
import MailActivation from '../Authentication/MailActivation/MailActivation';
import EmployeesInformation from '../EmployeesInformation/EmployeesInformation';
import UserSettings from '../Settings/Users/users'
import NotFound from '../../UI/404/404';
import * as action from '../../store/actions/index';

class Layout extends Component {

  state = {
    isAuthenticated: null,
  }

  async componentDidMount () {
    try {
      await this.props.onTryAutoSignup();
      if (this.props.isAuthenticated) {
        this.setState({ ...this.state, isAuthenticated: true });
      } else {
        this.setState({ ...this.state, isAuthenticated: false });
      }
    } catch(error) {
      this.setState({ ...this.state, isAuthenticated: false });
    }
  };

  componentDidUpdate (prevProps, prevState) {
    if (this.props.isAuthenticated !== prevState.isAuthenticated) {
      this.setState({ ...this.state, isAuthenticated: this.props.isAuthenticated });
    }
  }

  render () {
    let links = null;
    if (this.state.isAuthenticated === false) {
      links = 
      <Switch>
        <Route path="/user/confirmation/:token" component={MailActivation} />
        <Route path="/log-in" component={Login}/>
        <Redirect to="/log-in" />
      </Switch>
    } else if
    (this.state.isAuthenticated === null) {
      links = null
    } else if (this.state.isAuthenticated === true) {
      links = 
      <Switch>
        <Route path="/" exact component={Login}/>
        <Route path="/settings/users" exact component={UserSettings}/>
        <Route path="/salary-calculator" exact component={SalaryCalculator}/>
        <Route path="/create-user" exact component={CreateUser}/>
        <Route path="/log-in" exact component={Login}/>
        <Route path="/logout" exact component={Logout}/>
        <Route path="/user/confirmation/:token" component={MailActivation}/>
        <Route path="/users-information" component={EmployeesInformation}/>
        <Route component={NotFound}/>
          </Switch>
    }

    return (
      <Aux>
          <Navbar isAuthenticated={this.props.isAuthenticated} role={this.props.role} />
          { links }
      </Aux>
    )
  }
}

const mapStatetoProps = state => {
  return {
    isAuthenticated: state.auth.token !== null,
    role: state.auth.role
  }
}

const mapDispatchtoProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch(action.loginCheckState()),
  }
}

export default withRouter(connect(mapStatetoProps, mapDispatchtoProps)(Layout));