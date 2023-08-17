import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import style from "./styles/GetPersonalInfo.module.css";
import SelectPlace from "./SelectPlace";
import GetBirth from "./GetBirth";
import { userActions } from "../store/user";
import OurAxios from "../config/ourAxios";
import { useRef } from "react";

export default function GetPersonalInfo() {
  const userData = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const api = OurAxios();

  const [isOverlap, setIsOverlap] = useState(2);
  const [nickName, setNickName] = useState("");
  const nickNameRef = useRef(null);

  const overlapMsg = ["사용 가능한 아이디입니다.", "중복된 아이디입니다.", ""];

  function getResidence(residence) {
    if (residence) {
      dispatch(userActions.setCity(residence));
    }
  }

  function getBirth(birthString) {
    if (birthString) {
      dispatch(userActions.setBirth(birthString));
    }
  }

  function getNickName(e) {
    setNickName(e.target.value);
  }

  function overlapCheck() {
    if (nickName !== "") {
      api
        .get(`/login/find/${nickName}`)
        .then((res) => {
          dispatch(userActions.setNickName(nickName));
          setIsOverlap(0);
        })
        .catch((err) => {
          if (err.response.status === 404) {
            dispatch(userActions.setNickName(""));
            setIsOverlap(1);
            nickNameRef.current.focus();
            setNickName("");
            if (nickNameRef.current) nickNameRef.current.value = "";
          }
        });
    } else {
      setIsOverlap(2);
      dispatch(userActions.setNickName(""));
    }
  }

  return (
    <div className={style.container}>
      <br></br>
      <div className={`${style.nickname_wrapper} ${style.wrapper}`}>
        <label htmlFor="nickNameInput">닉네임: </label>
        <input
          id="nickNameInput"
          type="text"
          placeholder="ID"
          onChange={getNickName}
          defaultValue={nickName}
          ref={nickNameRef}
        />
        <button onClick={overlapCheck}> 중복 체크 </button>
        <div style={{ color: "red", lineHeight: "30px", marginLeft: "5px" }}>
          {overlapMsg[isOverlap]}
        </div>
      </div>
      <div className={`${style.birth_wrapper} ${style.wrapper}`}>
        <GetBirth getBirth={getBirth} />
      </div>
      <div className={`${style.residence_wrapper} `}>
        <label>거주지: </label>
        <SelectPlace getResidence={getResidence} />
      </div>
    </div>
  );
}
