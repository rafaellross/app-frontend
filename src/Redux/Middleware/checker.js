import { ADD_EMPLOYEE } from '../Actions/employees'

const checker = (store) => (next) => (action) => {
  console.log("Checker", action)
  if (
    action.type === ADD_EMPLOYEE && 0===1
    //action.employee.name.toLowerCase().includes('vince')
  ) {
    return alert("Nope. That's a bad idea.")
  }

  return next(action)
}

export default checker
