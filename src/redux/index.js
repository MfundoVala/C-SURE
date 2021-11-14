import { createStore } from 'redux'

function userReducer(state = {}, action) {
  switch (action.type) {
    case 'set':
      return { user: action.data }
    default:
      return state
  }
}


let UserStore = createStore(userReducer)

export {UserStore} 

