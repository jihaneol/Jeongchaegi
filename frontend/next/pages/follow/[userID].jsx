import React, { useEffect, useState } from "react";
import OurAxios from "../../config/ourAxios";

import Style from "../../styles/Follow.module.css";

export default function follow() {
  const [followNum, setFollowNum] = useState(0);
  const [followLIst, setFollowList] = useState([]);
  const userInfo = [
    {
      refreshToken: "Token",
      userName: "심경섭",
      userAge: 26,
      userCity: "파주",
      userImg: "사진",
      userID: 17,
      userPolicy: [123, 322, 111],
    },
  ];

  // ①팔로우 수 ②팔로우 리스트 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ourAxios = OurAxios();
        const responseNum = await ourAxios.get("/members/followInfo");
        setFollowNum(responseNum.data);
        const responseList = await ourAxios.get("/members/followeeList");
        setFollowList(responseList.data);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  console.log(followLIst);
  return (
    <div className={Style.wrap}>
      {userInfo.map((user) => {
        <div>
          <div>{user.userImg}</div>
          <div>
            <div>{user.userName}</div>
          </div>
        </div>;
      })}
    </div>
  );
}
