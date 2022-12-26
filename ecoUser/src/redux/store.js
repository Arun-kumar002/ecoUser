import {configureStore} from '@reduxjs/toolkit'
import MessengerReducer from './slice.js'


let Store=configureStore({
    reducer:MessengerReducer
})
export default Store