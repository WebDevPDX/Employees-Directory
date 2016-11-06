import React, { Component } from 'react'
import { createContainer } from 'meteor/react-meteor-data'
import { Employees } from '../../imports/collections/employees'
import EmployeeDetail from './employee-detail'

const PER_PAGE = 20

class EmployeeList extends Component {
  componentWillMount() {
    this.page = 1;
  }
  handleButtonClick() {
    this.page += 1;
    Meteor.subscribe('employees', PER_PAGE * this.page)
  }
  render() {
    return (
      <div>
        <div className="employee-list row">
          {this.props.employees.map(employee => <EmployeeDetail key={employee._id} employee={employee}/>)}
        </div>
        <button
          onClick={this.handleButtonClick.bind(this)}
          className="btn btn-primary">Load More...
        </button>
      </div>
    )
  }
}

export default createContainer(() => {
  //set up sub
  Meteor.subscribe('employees', PER_PAGE)
  //return object
  return { employees: Employees.find({}).fetch() }
  //gets passed as props to component
}, EmployeeList)
