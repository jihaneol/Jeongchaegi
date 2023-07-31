import React, { useEffect, useState } from "react";
import GetTypeInfo from "../../components/GetTypeInfo";
import GetPlaceInfo from "../../components/GetPlaceInfo";
import Nav from "../../components/Nav";

import Style from "../../styles/UserInfo.module.css";

export default function userInfo() {
  const [userStep, setUserStep] = useState(0);

  function onClick_prev() {
    const num = userStep;
    setUserStep(num - 1);
    console.log(num);
  }

  function onClick_next() {
    const num = userStep;
    if (num < 1) setUserStep(num + 1);
    console.log(num);
  }

  return (
    <div>
      <Nav />
      <div className={Style.wrap}>
        {userStep === 0 ? <GetTypeInfo /> : <GetPlaceInfo />}
        <div className={Style.button_box}>
          <div className={Style.button}>
            {userStep === 0 ? null : (
              <button onClick={onClick_prev}>이전</button>
            )}
            <button onClick={onClick_next}>다음</button>
          </div>
        </div>
      </div>
    </div>
  );
}
