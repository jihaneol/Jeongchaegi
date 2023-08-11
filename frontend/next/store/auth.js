import { createSlice } from "@reduxjs/toolkit";

const initialAuthState = {
	isAuthenticated: false,
	timer: null,
}

const authSlice = createSlice({
	name: "auth",
	initialState: initialAuthState,
	reducers: {
		login: (state) => {
			state.isAuthenticated = true;
		},
		logout: (state) => {
			if (state.timer) {
				clearTimeout(state.timer);
			}
			state.isAuthenticated = false;
			state.timer = null;
		},
		setTimer: (state, action) => {
			state.timer = action.payload;
		}
	}
})

export const userAction = authSlice.actions;
export default authSlice.reducer;