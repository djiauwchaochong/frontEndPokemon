import { createStore, applyMiddleware } from 'redux'
import reducer from './reducer.js'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'

const composedEnhancer = composeWithDevTools(applyMiddleware(thunkMiddleware))
const store = createStore(reducer, composedEnhancer)

export default store