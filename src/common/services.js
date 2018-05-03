import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080',
})

const getToken = () => global.localStorage.getItem('token')

export const login = (data) => client.post('/users/login', data).then(({ data }) => data)

export const createUser = (data) => client.post('/users', data, { headers: { token: getToken() } }).then(({ data }) => data)

export const verifyToken = () => client.get('/users/me', { headers: { token: getToken() }}).then(({ data }) => data[0])

export const loadUsers = (data) => client.get('/users', data).then(({ data }) => data)

export default client