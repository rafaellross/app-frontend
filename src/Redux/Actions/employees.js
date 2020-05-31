
import * as API from '../../Api';

export const ADD_EMPLOYEE = 'ADD_EMPLOYEE'
export const REMOVE_EMPLOYEE = 'REMOVE_EMPLOYEE'
export const UPDATE_EMPLOYEE = 'UPDATE_EMPLOYEE'

function addEmployee (employee) {
    return {
      type: ADD_EMPLOYEE,
      employee,
    }
  }

function removeEmployee (id) {
  return {
    type: REMOVE_EMPLOYEE,
    id,
  }
}

function updateEmployee (employee) {
  return {
    type: UPDATE_EMPLOYEE,
    employee,
  }
}

export function handleAddEmployee (employee, cb) {
    return (dispatch) => {
      return API.addEmployee(employee)
        .then((employee) => {
          dispatch(addEmployee(employee))
        })
        .catch((error) => {
          console.log(error)
          alert('There was an error. Try again.')
        })
    }
  }

export function handleDeleteEmployee (employees) {
    return (dispatch) => {

      //Remove Employees from State
      employees.forEach(employee => {
        dispatch(removeEmployee(employee.id))
      });


      return API.deleteEmployee(employees.map(employee => employee.id))
        .catch(() => {
          employees.forEach(employee => {
            dispatch(addEmployee(employee))
          });


          alert('An error occurred. Try again.')
        })
    }
  }

export function handleUpdateEmployee (employee) {
    return (dispatch) => {
      dispatch(updateEmployee(employee))

      return API.updateEmployee(employee)
        .catch(() => {

          alert('An error occurred. Try again.')
        })
    }
  }
