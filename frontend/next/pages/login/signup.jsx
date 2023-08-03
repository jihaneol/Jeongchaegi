import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetTypeInfo, { pcyTypes } from "../../components/GetTypeInfo";
import GetPlaceInfo, { userBirth } from "../../components/GetPlaceInfo";
import { sido } from "../../components/SelectPlace";
import Nav from "../../components/Nav";

import { userActions } from "../../store/user";
import { useCookies } from 'react-cookie';

export default function UserInfo() {
  const [userStep, setUserStep] = useState(0);
	const [atCookies, setCookie, removeCookie] = useCookies(["at"]);
  const userData = useSelector((state) => state.user);
  const getUserData = ["GetTypeInfo", "GetPlaceInfo", "GetNickname"];

  const dispatch = useDispatch();

  function onClick_pre() {
    const num = userStep;
    if (num === 1) {
      setUserStep(num - 1);
    }
  }

  function onClick_next() {
    const num = userStep;
    if (num === 0) {
      if (pcyTypes) dispatch(userActions.setPolicyType(pcyTypes));
      setUserStep(num + 1);
    } else if (num === 1) {
      if (userBirth) dispatch(userActions.setBirth(userBirth));
      if (sido) dispatch(userActions.setCity(sido));
    }

  }

  function getToken() {
    console.log(atCookies);
    return atCookies.at;
  }
  
  useEffect(() => {
    const accessToken = getToken();
    if (accessToken)
      localStorage.setItem("accessToken", accessToken);
  }, [atCookies.at])


  return (
    <div>
      <Nav />
      {`<${getUserData[userStep]} onClick_pre={onClick_pre} onClick_next={onClick_next} />`}
    </div>
  );
}
