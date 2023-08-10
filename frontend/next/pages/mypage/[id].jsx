import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import style from "../../styles/MyPage.module.css";
import OurAxios from "../../config/ourAxios";

export default function Page() {
  // 변수
  const router = useRouter();
  const myStatus = ["스크랩수", "작성글", "팔로우", "팔로워"];
  const api = OurAxios();

  // state
  const [userImg, setUserImg] = useState("");
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");
  const [policyType, setPolicyType] = useState(false) // false == 스크랩, true == 알림
  const [myScrap, setMyScrap] = useState([]);
  const [myNotice, setMyNotice] = useState([]);
  

  useEffect(() => {
    setUserImg(localStorage.getItem("userImg"))
    setUserName(localStorage.getItem("userName"))
    setUserId(localStorage.getItem("userId"))
  }, [])

  async function getScrapList() {
    api.get(`/scraps/my-scrap/members/${userId}`, {
      params: {
        pageIndex: 1,
      }
    }).then((res) => {
      setMyScrap(res);
      console.log(res);
    }).catch((err) => {
      console.log(err);
    })
  }

  useEffect(() => {
    getScrapList();
  }, [])

  function scrapClick() {
    setPolicyType(false);
  }

  function noticeClick() {
    setPolicyType(true);
  }

  return (
    <div className={style.all_wrapper}>
      <Nav />
      <div className={style.content_wrapper}>
        <div className={style.profile_wrapper}>
          <div className={style.profile_box}>
            <div className={style.profile_picture}>
              <img
                src={userImg}
                width="200px"
                height="200px"
              />
            </div>
            <div className={style.profile_name}>{userName}</div>
          </div>
          <div className={style.status_box}>
            <div className={style.status_header}>
              <label>My Status</label>
            </div>
            <div className={style.status_content}>
              {myStatus.map((item) => (
                <div className={style.status_card} key={item}>
                  <div className={style.status_card_header}>{item}</div>
                  <div className={style.status_card_content}>0</div>
                </div>
              ))}
            </div>
            <div className={style.stastus_footer}>
              <button className={style.status_footer_button}>
                프로필 수정
              </button>
              <button className={style.status_footer_button}>알람 설정</button>
            </div>
          </div>
        </div>
        <div className={style.policyList_wrapper}>
          <div className={style.policyList_header}>
            <div>My 정책</div>
            <div className={style.polisyList_type}>
              <button onClick={scrapClick} className={policyType ? style.off : ""}>스크랩</button>
              <button onClick={noticeClick} className={!policyType ? style.off : ""}>알림</button>
            </div>
          </div>
          <div className={style.policyList_content}>정책 리스트</div>
        </div>
        <div className={style.followerList_wrapper}>
          <div className={style.followerList_header}>팔로워 목록</div>
          <div className={style.followerList_content}>팔로워 리스트</div>
        </div>
      </div>
    </div>
  );
}
