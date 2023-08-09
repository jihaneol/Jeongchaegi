import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import style from "../../styles/MyPage.module.css";
import Image from "next/image";

export default function Page() {
  const router = useRouter();
  const myStatus = ["스크랩수", "작성글", "팔로우", "팔로워"];
  const [userImg, setUserImg] = useState("");
  const [userName, setUserName] = useState("");

  useEffect(() => {
    setUserImg(localStorage.getItem("userImg"))
    setUserName(localStorage.getItem("userName"))
  }, [])

  return (
    <div className={style.all_wrapper}>
      <Nav />
      <div className={style.content_wrapper}>
        <div className={style.profile_wrapper}>
          <div className={style.profile_box}>
            <div className={style.profile_picture}>
              <Image
                src={userImg}
                width="240px"
                height="240px"
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
        <div className={style.articleList_wrapper}>
          <div className={style.articleList_header}>작성 글 목록</div>
          <div className={style.articleList_content}>글 리스트</div>
        </div>
        <div className={style.followerList_wrapper}>
          <div className={style.followerList_header}>팔로워 목록</div>
          <div className={style.followerList_content}>팔로워 리스트</div>
        </div>
      </div>
    </div>
  );
}
