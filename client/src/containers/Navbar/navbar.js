import React from 'react';
import { Link } from 'react-router-dom';

const navbar = (props) => {
  let isAuthenticated = props.isAuthenticated;
  let role = props.role;

  // NOT AUTHENTICATED LINKS
  let notAuthenticatedLinks =  <Link className="nav-item nav-link" to='/log-in'>Log in</Link>;

  // ALL MEMBERS LINKS 
  let accountLinksALL = 
    <Link className="nav-item nav-link" to='/logout'>Log out</Link>;

  let compensationLinksTEAM = 
  
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Compensation </a>
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      <a className="dropdown-item" href='/salary-calculator'>Simulator</a>
    </div>
  </li>

  let compensationLinksADMIN = 
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Compensation </a>
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      <Link className="dropdown-item mb-0" to='/'>Simulator</Link>
      <a className="dropdown-item" href='/users-information'>Team overview</a>
    </div>
  </li>

  let settingsLinksADMIN = 
  <li className="nav-item dropdown">
    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"> Manage Organisation </a>
    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
      <a className="dropdown-item" href='/settings/users'>Users</a>
    </div>
  </li>

  let navbarlinks;
  if (isAuthenticated) {
    if (role === "Admin") {
      navbarlinks =  
      <div className="navbar-nav ">
        { compensationLinksADMIN }  
        { settingsLinksADMIN }
        { accountLinksALL }
      </div>
    } else if (role === 'Team') {
      navbarlinks =  
      <div className="navbar-nav ">
        { compensationLinksTEAM }  
        { accountLinksALL }
        </div>
    }

  } else {
    navbarlinks =  
    <div className="navbar-nav">
     {notAuthenticatedLinks}
    </div>
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-4 ">
      <Link className="navbar-brand ml-4" to='/'>Dashboard</Link>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse justify-content-end mr-4" id="navbarNavAltMarkup">
        {navbarlinks}
      </div>
    </nav>
  )
}

export default navbar;