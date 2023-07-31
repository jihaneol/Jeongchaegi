import React, { useEffect, useState } from "react";
import GetTypeInfo from "../../components/GetTypeInfo";
import GetPlaceInfo from "../../components/GetPlaceInfo";
import Nav from "../../components/Nav";

import Style from "../../styles/UserInfo.module.css";

export default function userInfo() {
  const [userStep, setUserStep] = useState(0);

  function onClick_pre() {
    const num = userStep;
    if (num > 0) {
      setUserStep(num - 1);
    }
  }

  function onClick_next() {
    const num = userStep;
    if (num < 1) setUserStep(num + 1);
  }

  return (
    <div>
      <Nav />
      {userStep === 0 ? (
        <GetTypeInfo onClick_pre={onClick_pre} onClick_next={onClick_next} />
      ) : (
        <GetPlaceInfo onClick_pre={onClick_pre} onClick_next={onClick_next} />
      )}
    </div>
  );
}
