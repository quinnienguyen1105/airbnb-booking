import { configureStore } from '@reduxjs/toolkit'
import usersReducer from './usersSlice'
import houseReducer from './houseSlice'

export const store = configureStore({
  reducer: {
    users : usersReducer,
    house: houseReducer,
  },
})