import axios from 'axios'

const BACKEND_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_BASE_URL

export interface LoginResponse {
  uuid: string
  jwt: string
}

export const login = async (email: string, password: string) => {
  const response = await axios.post(`${BACKEND_BASE_URL}/login`, {
    email,
    password,
  })
  return response.data.data as LoginResponse
}

export const signup = async (email: string, password: string) => {
  const response = await axios.post(`${BACKEND_BASE_URL}/sign-up`, {
    email,
    password,
  })
  return response.data.data
}
