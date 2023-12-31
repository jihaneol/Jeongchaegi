import { createSlice } from "@reduxjs/toolkit";

// "0000-00-00" 형식으로 만들기 위한 const
const today = new Date();
const today_year = today.getFullYear();
const today_month = String(today.getMonth() + 1).padStart(2, "0");
const today_day = String(today.getDate()).padStart(2, "0");

// 유저 초기 상태
const initialUserState = {
  id: 0,
  img: "",
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
    setId(state, action) {
      state.id = action.payload;
    },
    setImg(state, action) {
      state.img = action.payload;
    },
    setisLogined(state, action) {
      state.isLogined = action.payload;
    },
    setPolicyType(state, action) {
      const arr = (action.payload || []).slice(); // action.payload 값이 유효하면 그 값을 사용하고, 아니면 빈 배열([])을 사용
      state.policyType = arr;
    },
    setBirth(state, action) {
      state.birth = action.payload;

      const birthYear = parseInt(action.payload.split("-")[0]);
      const birthMonth = parseInt(action.payload.split("-")[1]);
      const birthDay = parseInt(action.payload.split("-")[2]);

      let age = parseInt(today_year) - birthYear;
      if (
        today_month < birthMonth ||
        (today_month === birthMonth && today_day < birthDay)
      ) {
        age--;
      }
      state.age = age;
    },
    setAge(state, action) {
      state.age = action.payload;
    },
    setCity(state, action) {
      state.city = action.payload;
    },
    setNickName(state, action) {
      state.nickname = action.payload;
    },
    setLogout: (state) => {
      if (state.timer) {
        clearTimeout(state.timer);
      }
      state.isLogined = false;
      state.timer = null;
      state.id = 0;
      state.img = "";
      state.city = "";
      state.birth = `${today_year}-${today_month}-${today_day}`;
      state.age = 0;
      state.nickname = "";
      state.policyType = [];
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
