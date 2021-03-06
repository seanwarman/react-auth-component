import { get, post } from '../lib/api.js'

// login should return a token otherwise return null or undefined
export async function handleLogin({
  username,
  password
}) {

  const res = await post('/login', {
    username,
    password,
  })

  if(res instanceof Error || !res?.data?.token) return null

  return res.data.token

}

// checkAuth should return either true or false
export async function handleCheckAuth(token) {

  const res = await get('/verifyToken', {
    headers: {
      "Authorization": `Bearer ${token}`
    }
  })

  if(res instanceof Error) return false

  return true

}


