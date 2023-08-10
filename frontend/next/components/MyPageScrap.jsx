import React from "react";
import { useState } from "react";
import OurAxios from "../config/ourAxios";
import { useEffect } from "react";
import Spin from "../components/Spin";

export default function MyPageScrap() {
  const [myScrap, setMyScrap] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const api = OurAxios();

  async function getScrapList() {
    const id = localStorage.getItem("userID");
    console.log("id: ", id);
    api
      .get(`/scraps/my-scrap/members/${id}/`, {
        params: {
          pageIndex: 1,
        },
      })
      .then((res) => {
        setMyScrap(res);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    getScrapList().then(() => {
      setIsLoading(false);
			console.log(myScrap);
			console.log(Array.isArray(myScrap)); // true면 배열입니다.

    });
  }, []);

  return (
    <div>
      {!isLoading ? (
        !myScrap ? (
          <h3>스크랩한 정책이 없습니다.</h3>
        ) : (
          myScrap.slice(0, 4).map((item) => {
            return <div key={item.id}>{item.polyBizSjnm}</div>;
          })
        )
      ) : (
        <Spin />
      )}
    </div>
  );
}
