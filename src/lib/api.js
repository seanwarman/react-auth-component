import axios from 'axios'
import endpoints, { setStage } from './config.js'

const stage = setStage(window.location.origin)

export async function get(uri, config) {
  let result

  try {
    result = await axios.get(endpoints[stage] + uri, config)
  } catch (error) {
    return error
  }
  return result
}

export async function post(uri, data, config) {
  let result

  try {
    result = await axios.post(endpoints[stage] + uri, data, config)
  } catch (error) {
    return error
  }
  return result
}
