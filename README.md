# Salary Management Tool
## Introduction
HR tool that allows :
* employees to simulate their salaries based on different factors,
* managers to edit employees salaries.
## Description

The company uses the [Gitlab compensation model](https://about.gitlab.com/handbook/total-rewards/compensation/compensation-calculator/calculator/) to define the compensation of their employees. 
The compensation is calculated with a base salary (according to the job) which is then affected by a Location factor, a Seniority factor, a Master factor and a Contract Factor.  
The company needed an internal tool to display this simulator to all employees, and to allow managers to have an overview of their team compensation.


## Live Demo

The live demo is available [here](https://modular-source-287611.nw.r.appspot.com/).  
**Of course the data has been changed due to confidentiality reasons.**  
You can log in with these profiles :

| Level | email                   | password      |
|-------|-------------------------|---------------|
| Admin | dofafav143@rika0525.com | Password2020! |
| Team  | hepevo9311@chclzq.com   | Password2020! |

## Usage
**Admins** : 
* Have an overview of team salary
* Can invite new employee by mail or remove users 
* Can edit employee's salary

**Team (employees)** : 
* Have access to the salary simulator 
* Have access to their own information

## Technologies
### API :
* NodeJS 13.13
* Express 4.16
* Firestore 4.1

### Client :
* React 16.13
* Redux 4
* Bootstrap 4

## License
[MIT](https://choosealicense.com/licenses/mit/)
