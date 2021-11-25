import axios from "axios"

export function setData (payload) {
  return {
    type: 'data',
    payload: payload
  }
}

export function setDataDetail (payload) {
  return {
    type: 'datadetail',
    payload: payload
  }
}

export function setError (payload) {
  return {
    type: 'error',
    payload: payload
  }
}

export function setLoading (payload) {
  return {
    type: 'loading',
    payload: payload
  }
}

export function fetchData() {
  return async (dispatch, getState) => {
    try {
      dispatch(setLoading(true))
      let tempArr = []
      let tempObj = {}
      const dataOne = await axios({
        url: 'https://pokeapi.co/api/v2/pokemon?limit=9',
        method: 'GET'
      })
      for (let i = 0; i < dataOne.data.results.length; i++) {
        tempObj = await axios({
          url: dataOne.data.results[i].url,
          method: 'GET'
        })
        tempArr.push(tempObj.data)
      }
      console.log(tempArr);
      dispatch(setData(tempArr))
      dispatch(setLoading(false))  
    } catch (error) {
      dispatch(setError(true))
    }
  }
}

export function fetchDataDetail (id) {
  return async (dispatch, getState) => {
    try {
      const data = await axios({
        url: `https://pokeapi.co/api/v2/pokemon/${id}`,
        method: `GET`
      })
      console.log(data.data)
      dispatch(setDataDetail(data.data))
    } catch (error) {
      dispatch(setError(true))
    }  
  }
}