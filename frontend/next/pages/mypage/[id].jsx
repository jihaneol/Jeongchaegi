import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import style from "../../styles/MyPage.module.css";
import MyPageScrap from "../../components/MyPageScrap";
import Link from "next/link";
import Spin from "../../components/Spin";
import OurAxios from "../../config/ourAxios";
import { useSelector } from "react-redux";

export default function Page() {
  // 변수
  const router = useRouter();
  const api = OurAxios();
  const myStatus = ["스크랩수", "작성글", "팔로우", "팔로워"];
  const userData = useSelector((state) => state.user);

  // state
  const [userImg, setUserImg] = useState("");
  const [userName, setUserName] = useState("");
  const [myScrapCnt, setMyScrapCnt] = useState(0);

  async function getUserData() {
    const userId = localStorage.getItem("userID");
    setUserImg(localStorage.getItem("userImg"));
    setUserName(localStorage.getItem("userName"));
    api.get(`/scraps/count/members/${userId}`).then((res) => {
      console.log("스크랩 수 설정 성공");
      setMyScrapCnt(res.data);
    }).catch((err) => {
      console.log("스크랩 수 설정 실패");
      console.log(err);
    })
  }

  useEffect(() => {
    if (!userData.isLogined) {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/login");
      return;
    } else {
      getUserData();
    }
  }, []);

  // 팔로우, 팔로워 페이지 이동
  function handleStatusCard(item) {
    switch (item) {
      case "스크랩수":
      return (
        <Link href={`/myscrap/${userName}`}>
          <a className="hover:bg-gray-400 hover:cursor-pointer transition-all duration-300">
            <div className={style.status_card}>
              <div className={style.status_card_header}>{item}</div>
              <div className={style.status_card_content}>{myScrapCnt}</div>
            </div>
          </a>
        </Link>
      );
      case "팔로우":
        return (
          <Link href={`/follow/${localStorage.getItem("userID")}`}>
            <a className="hover:bg-gray-200 hover:cursor-pointer transition-all duration-300">
              <div className={style.status_card}>
                <div className={style.status_card_header}>{item}</div>
                <div className={style.status_card_content}>0</div>
              </div>
            </a>
          </Link>
        );
      case "팔로워":
        return (
          <Link href="/follower/1">
            <a className="hover:bg-gray-400 hover:cursor-pointer transition-all duration-300">
              <div className={style.status_card}>
                <div className={style.status_card_header}>{item}</div>
                <div className={style.status_card_content}>0</div>
              </div>
            </a>
          </Link>
        );
      default:
        return (
          <div className={style.status_card}>
            <div className={style.status_card_header}>{item}</div>
            <div className={style.status_card_content}>0</div>
          </div>
        );
    }
  }
  // 팔로우, 팔로워 페이지 이동

  return (
    <>
      {userData.isLogined ? (
        <div className={style.all_wrapper}>
          <Nav />
          <div className={style.content_wrapper}>
            <div className={style.profile_wrapper}>
              <div className={style.profile_box}>
                <div className={style.profile_picture}>
                  <img
                    className="rounded-full"
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
                {/* 팔로우, 팔로워 페이지 이동 */}
                <div className={style.status_content}>
                  {myStatus.map((item) => (
                    <React.Fragment key={item}>
                      {handleStatusCard(item)}
                    </React.Fragment>
                  ))}
                </div>
                {/* 팔로우, 팔로워 페이지 이동 */}
                <div className={style.stastus_footer}>
                  <button
                    className={style.status_footer_button}
                    onClick={() => {
                      router.push(`/mypage/${userName}/edit`);
                    }}
                  >
                    프로필 수정
                  </button>
                </div>
              </div>
            </div>
            <div className={style.policyList_wrapper}>
              <div className={style.policyList_header}>
                <div>My 스크랩</div>
              </div>
              <div className={style.policyList_content}>
                <MyPageScrap />
              </div>
            </div>
            <div className={style.followerList_wrapper}>
              <div className={style.followerList_header}>팔로워 목록</div>
              <div className={style.followerList_content}>팔로워 리스트</div>
            </div>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
