import axios from './index'

const getAll = async cleintId => {
  try {
    const endpoint = '/users/client/' + cleintId

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
  }
}

const create = async data => {
  try {
    const endpoint = '/users/client/ ' + cleintId

    const response = await axios.post(endpoint, data)
    return response.data
  } catch (e) {
    return e
  }
}
const update = async (data, id) => {
  try {
    const endpoint = '/users/client/' + id

    const response = await axios.patch(endpoint, data)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const getByID = async id => {
  try {
    const endpoint = '/users/client/' + id

    const response = await axios.get(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
const remove = async id => {
  try {
    const endpoint = '/users/client/' + id

    const response = await axios.delete(endpoint)
    return response.data
  } catch (e) {
    console.log(e)
    return e
  }
}
export { getAll, create, update, getByID, remove }
