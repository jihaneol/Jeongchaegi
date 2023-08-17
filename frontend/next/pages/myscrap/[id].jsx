import React from "react";
import Nav from "../../components/Nav";
import style from "../../styles/MyScrap.module.css";
import OurAxios from "../../config/ourAxios";
import { useState } from "react";
import { useEffect } from "react";
import Spin from "../../components/Spin";
import { useRouter } from "next/router";

export default function MyScrap() {
  const api = OurAxios();
  const router = useRouter();

  // state
  const [myScrap, setMyScrap] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefresh, setIsRefresh] = useState(false);
  const [myScrapCnt, setMyScrapCnt] = useState(0);
  const [page, setPage] = useState(1);

  // function
  function getData() {
    const id = localStorage.getItem("userID");
    api
      .get(`/scraps/my-scrap/members/${id}/`, {
        params: {
          pageIndex: page,
        },
      })
      .then((res) => {
        console.log(res);
        setMyScrap(res.data.content);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function getScrapCnt() {
    const id = localStorage.getItem("userID");
    api
      .get(`/scraps/count/members/${id}/`)
      .then((res) => {
        console.log("스크랩 수 받아오기 성공");
        setMyScrapCnt(res % 10 === 0 ? (res.data / 10) : (res.data / 10) + 1);
      })
      .catch((err) => {
        console.log("스크랩 수 받아오기 실패");
        console.log(err);
      });
  }

  function pageButtonClick(e) {
    console.log(e);
    setPage(parseInt(e.target.textContent, 10));
  }

  function buttonRendering() {
    let startPage = page;
    const buttons = [];
    const one = startPage % 10;

    const start = one === 0 ? startPage - 9 : startPage - one + 1;
    let end = one === 0 ? startPage : startPage - one + 10;
    if (end > myScrapCnt) end = myScrapCnt;
    if (end === 0) {
      end = 1;
      startPage = 1;
    }
    for (let i = start; i <= end; i++) {
      buttons.push(
        <button
          key={i}
          onClick={pageButtonClick}
          className={
            startPage !== i ? style.pageButton_content : style.button_clicked
          }
        >
          {i}
        </button>
      );
    }
    return buttons;
  }

  function deleteScrap(e) {
    const userName = localStorage.getItem("userID");
    let idx = e.target.id;
    let scrapId = myScrap[idx - 1].id;
    api.delete(`scraps/cancel/members/${userName}/policies/${scrapId}`).then((res) => {
      console.log("스크랩 취소 성공");
      setIsRefresh(prev => !prev);
    }).catch((err) => {
      console.log("스크랩 취소 실패");
      console.log(err);
    })
  }

  // effect
  useEffect(() => {
    getData();
  }, [page, isRefresh]);

  useEffect(() => {
    getScrapCnt();
  }, [isRefresh]);

  return (
    <div className={style.all_wrapper}>
      <Nav />
      <div className={style.content_wrapper}>
        <div className={style.title}>나의 스크랩</div>
        {/* 헤더 */}
        <div className={style.content_header}>
          <div className={style.header_id}>ID</div>
          <div className={style.header_title}>제목</div>
          <div className={style.header_notice}>삭제</div>
        </div>
        {/* 카드 목록 */}
        <div className={style.card_wrapper}>
          {isLoading ? (
            <div style={{display:"flex", justifyContent:"center", margin:"10px 0px"}}>
              <Spin />
            </div>
          ) : (
            myScrap.map((scrap, idx) => {
              return (
                <div key={scrap.id} className={style.card_box_wrap}>
                  <div className={style.card_box_id}>{idx + 1}</div>
                  <div className={style.card_box_center}>
                    <div className={style.card_title}>{scrap.polyBizSjnm}</div>
                    <div className={style.card_content}>{scrap.polyItcnCn}</div>
                  </div>
                  <div className={style.card_box_notice}>
                    <button key={idx} id={idx + 1} onClick={deleteScrap}>삭제</button>
                  </div>
                </div>
              );
            })
          )}
        </div>
        {/* 페이지 버튼 */}
        <div className={style.pageButton_wrapper}>{buttonRendering()}</div>
      </div>
    </div>
  );
}
