import { configureStore } from "@reduxjs/toolkit"
import employeeReducer from "./user/employeeSlice"

export const store = configureStore({
	reducer: {
		auth: employeeReducer
	}
})
