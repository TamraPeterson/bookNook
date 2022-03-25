import Axios from 'axios'
import { baseURL } from '../env'
export const api = Axios.create({
  baseURL,
  timeout: 8000
})

export const googleApi = Axios.create({
  baseURL: 'https://www.googleapis.com/books/v1/volumes',
  timeout: 8000
})
// may need {?q=}

export const googleKey = 'key=AIzaSyBweUI-e0zHv_rgZwbaR9uxeNZ34POOyeg'