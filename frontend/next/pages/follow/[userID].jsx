import React, { useEffect, useState } from "react";
import OurAxios from "../../config/ourAxios";

import Style from "../../styles/Follow.module.css";

export default function follow() {
  const [followNum, setFollowNum] = useState(0);
  const [followLIst, setFollowList] = useState([]);

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
      <ul>123</ul>
    </div>
  );
}
