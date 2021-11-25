const initialState = {
  data: [],
  dataDetail: {},
  error: false,
  loading: true
}

function reducer (state = initialState, action) {
  if (action.type === 'data') {
    return {...state, data: action.payload}
  } else if (action.type === 'error') {
    return {...state, error: action.payload}
  } else if (action.type === 'loading') {
    return {...state, loading: action.payload}
  } else if (action.type === 'datadetail') {
    return {...state, dataDetail: action.payload}
  }
  return state
}

export default reducer