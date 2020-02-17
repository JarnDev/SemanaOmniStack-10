import axios from 'axios'


const dev_api = axios.create({
    baseURL:'http://192.168.0.3'
})

export default dev_api