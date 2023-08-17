import React from "react";
import { useState } from "react";
import OurAxios from "../config/ourAxios";
import { useEffect } from "react";
import Spin from "../components/Spin";
import style from "./styles/MyPageScrap.module.css";
import Link from "next/link";

export default function MyPageScrap() {
  const [myScrap, setMyScrap] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [userName, setUserName] = useState("");

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
        setMyScrap(res.data.content);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getName() {
    setUserName(localStorage.getItem("userName"));
  }

  function clickCard(e) {
    console.log(e.target);
    // 수정 필요
  }

  useEffect(() => {
		getName();
    getScrapList().then(() => {
      setIsLoading(false);
      console.log(myScrap);
      console.log(Array.isArray(myScrap)); // true면 배열입니다.
    });
  }, []);

  return (
    <div className={!isLoading ? style.scrap_wrapper : style.scrap_loading}>
      {!isLoading ? (!myScrap ? (
        <div>스크랩한 정책이 없습니다.</div>
      ) : (
        <div className={style.scrap_content}>
          <div className={style.scrap_card_wrapper}>
            {myScrap.slice(0, 4).map((item) => {
              return (
                <button key={item.id} className={style.scrap_card} onClick={clickCard}>
                  {item.polyBizSjnm}
                </button>
              );
            })}
          </div>
          <Link href={`/myscrap/${userName}`}>
            <a className={style.scrap_seeMore}>더보기</a>
          </Link>
        </div>
      )) : <Spin />}
    </div>
  );
}
