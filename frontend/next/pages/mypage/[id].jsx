import React from "react";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import style from "../../styles/MyPage.module.css"

export default function Page() {
  const router = useRouter();
  const myStatus = ["스크랩수", "작성글", "팔로우", "팔로워"]
  return (
    <div className={style.all_wrapper}>
      <Nav />
      <div className={style.content_wrapper}>
        <div className={style.profile_wrapper}>
          <div className={style.profile_box}>
            <div className={style.profile_picture}>
              profile picture
            </div>
            <div className={style.profile_name}>
              profile name
            </div>
          </div>
          <div className={style.status_box}>
            <div>
              마이페이지
            </div>
            <div>
              {/* {myStatus.map((item) => {

              })} */}
            </div>
          </div>
        </div>
        <div className={style.articleList_wrapper}>
          <div className={style.articleList_header}>
            작성 글 목록
          </div>
          <div className={style.articleList_content}>
            글 리스트
          </div>
        </div>
        <div className={style.followerList_wrapper}>
          <div className={style.followerList_header}>
            팔로워 목록
          </div>
          <div className={style.followerList_content}>
            팔로워 리스트
          </div>
        </div>
      </div>
    </div>
  );
}
