import axios from 'axios'

const client = axios.create({
  baseURL: 'http://localhost:8080',
})

const getToken = () => global.localStorage.getItem('token')

export const login = (data) => client.post('/users/login', data).then(({ data }) => data)
// export const logout = () => client.post('/users/logout', { token: getToken() }).then(({ data }) => data)

export const createUser = (data) => client.post('/users', data).then(({ data }) => data)
export const createLeave = (data) => client.post('/leaves', data).then(({ data }) => data)

export const verifyToken = () => client.get('/users/me', { headers: { token: getToken() }}).then(({ data }) => data[0])

export const loadUsers = (data) => client.get('/users', data).then(({ data }) => data)
export const loadDepartments = (data) => client.get('/departments', data).then(({ data }) => data)
export const loadTasks = (data) => client.get('/tasks', data).then(({ data }) => data)
export const loadLeaves = (data) => client.get('/leaves', data).then(({ data }) => data)

export const updateUser = (data) => client.post('/users/update', data).then(({ data }) => data)
export const updateLeaves = (data) => client.post('/leaves/update', data).then(({ data }) => data)


export default client