import axios from 'axios'


const dev_api = axios.create({
    baseURL:'http://localhost:80'
})

export default dev_api