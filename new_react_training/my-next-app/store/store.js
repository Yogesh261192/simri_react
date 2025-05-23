// store/store.js
import { configureStore } from '@reduxjs/toolkit'
import exampleReducer from './slices/exampleSlice'

export const store = configureStore({
  reducer: {
    example: exampleReducer,
  },
})
