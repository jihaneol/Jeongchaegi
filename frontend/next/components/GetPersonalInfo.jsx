import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "react-datepicker/dist/react-datepicker.css";

import style from "./styles/GetPersonalInfo.module.css";
import SelectPlace from "./SelectPlace";
import GetBirth from "./GetBirth";
import { userActions } from "../store/user";
import OurAxios from "../config/ourAxios";

const userBirth = "";

export default function GetPersonalInfo(props) {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const api = OurAxios();

  const [isOverlap, setIsOverlap] = useState(false);

  let nickName = "";

  function getBirth(birthString) {
    console.log(birthString);
    dispatch(userActions.setBirth(birthString));
  }

  function getNickName(e) {
    console.log(e.target.value);
    nickName = e.target.value;
    console.log(nickName);
  }

  function overlapCheck() {
    console.log(nickName);
    api
      .get(`/members/find/${nickName}`)
      .then((res) => {
        dispatch(userActions.setNickName(nickName));
        setIsOverlap(false);
        // console.log(res.status);
      })
      .catch((err) => {
        console.log(isOverlap);
        setIsOverlap(true);
        console.error(err);
      });
  }

  return (
    <div className={style.container}>
      get Info!
      <br></br>
      <div className={`${style.nickname_wrapper} ${style.wrapper}`}>
        <label htmlFor="nickNameInput">닉네임: </label>
        <input
          id="nickNameInput"
          type="text"
          placeholder="ID"
          onKeyUp={getNickName}
        />
        <button onClick={overlapCheck}> 중복 체크 </button>
        {!isOverlap ? null : (
          <div style={{ color: "red", lineHeight: "30px", marginLeft: "5px" }}>
            중복된 아이디입니다.
          </div>
        )}
      </div>
      <div className={`${style.birth_wrapper} ${style.wrapper}`}>
        <GetBirth getBirth={getBirth} />
      </div>
      <div className={`${style.residence_wrapper} `}>
        <label>거주지: </label>
        <SelectPlace />
      </div>
    </div>
  );
}
