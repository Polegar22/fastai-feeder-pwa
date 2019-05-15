import axios from 'axios'

let loc = window.location

axios.defaults.baseURL = `${loc.protocol}//${loc.hostname}:${loc.port}/api`

export default axios
