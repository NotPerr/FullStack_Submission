import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    return axios.get(baseUrl)
}

const create = newObject => {
    return axios.post(baseUrl, newObject)
}

const remove = id => {
    return axios.delete(`http://localhost:3001/persons/${id}`)
}

const update = (id,newContact) => {
    return axios.put(`http://localhost:3001/persons/${id}`,newContact)
}

export default {getAll,create,remove,update}