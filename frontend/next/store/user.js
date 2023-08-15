import { createSlice } from "@reduxjs/toolkit";

// "0000-00-00" 형식으로 만들기 위한 const
const today = new Date();
const today_year = today.getFullYear();
const today_month = String(today.getMonth() + 1).padStart(2, "0");
const today_day = String(today.getDate()).padStart(2, "0");

// 유저 초기 상태
const initialUserState = {
  city: "",
  birth: `${today_year}-${today_month}-${today_day}`,
  age: 0,
  nickname: "",
  policyType: [],
  isLogined: false,
  timer: null,
};

// 유저 리듀서 및 메서드 속성 생성
const userSlice = createSlice({
  name: "user",
  initialState: initialUserState,
  reducers: {
    setisLogined(state, action) {
      state.isLogined = action.payload;
      console.log("state-isLogined: ", state.isLogined);
    },
    setPolicyType(state, action) {
      state.policyType = action.payload;
      console.log(state.policyType);
    },
    setBirth(state, action) {
      state.birth = action.payload;
      console.log(state.birth);

      const birthYear = parseInt(action.payload.split("-")[0]);
      const birthMonth = parseInt(action.payload.split("-")[1]);
      const birthDay = parseInt(action.payload.split("-")[2]);

      const age = parseInt(today_year) - birthYear;
      if (
        today_month < birthMonth ||
        (today_month === birthMonth && today_day < birthDay)
      ) {
        age--;
      }
      state.age = age;
      console.log(state.age);
    },
    setCity(state, action) {
      state.city = action.payload;
      console.log(state.city);
    },
    setNickName(state, action) {
      state.nickname = action.payload;
      console.log(state.nickname);
    },
    setLogout: (state) => {
      if (state.timer) {
        clearTimeout(state.timer);
      }
      state.isLogined = false;
      state.timer = null;
    },
    setTimer: (state, action) => {
      state.timer = action.payload;
    },
  },
});

// 리듀서를 작동시키기 위한 action 유출
export const userActions = userSlice.actions;

// 리듀서 유출
export default userSlice.reducer;
