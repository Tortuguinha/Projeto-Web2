import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	isAuth: false,
	user: null
}

export const employeeSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		setAuth: (state, action) => {
			const { auth, user } = action.payload
			state.isAuth = auth
			state.user = user
		}
	}
})

export const { setAuth } = employeeSlice.actions;

export default employeeSlice.reducer;
