import style from "../styles/Nav.module.css";
import Link from "next/link";
import Image from "next/image";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";

export default function Nav() {
  const [nickname, setNickname] = useState("");
  const [minutes, setMinutes] = useState(30);
  const [seconds, setSeconds] = useState(0);

  const logout = Logout();
  const userData = useSelector((state) => state.user);
  const router = useRouter();

  const logoutHandler = () => {
    logout();
    alert("정상적으로 로그아웃 되었습니다.");
    router.push("/");
  };

  useEffect(() => {
    const name = localStorage.getItem("userName");
    setNickname(name);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0)
        setSeconds(prev => prev - 1);
      else if (minutes > 0) {
        setMinutes(prev => prev - 1);
        setSeconds(59);
      }
      else {
        clearInterval(interval);
        alert("로그아웃 되었습니다.");
        logout();
      }
    }, 1000)
    return () => clearInterval(interval);
  }, [minutes, seconds])

  function resetTimer() {
    setMinutes(30);
    setSeconds(0);
  }

  function myPageRoute() {
    userData.isLogined
      ? router.push(`/mypage/${nickname}`)
      : (() => {
          alert("로그인이 필요한 페이지입니다.");
          router.push("/login");
        })();
  }

  return (
    <div className={`${style.nav_wrap} bg-gray-800 text-white p-3`}>
      <div className={`flex items-center`}>
        <div className="flex items-center space-x-6">
          <Link href="/">
            <a>
              <Image
                src="/Logo.PNG"
                width="130px"
                height="64px"
                alt="정채기"
                style={{ borderRadius: "10px" }}
              />
            </a>
          </Link>

          <Link href="/articlelist">
            <a className="text-2xl hover:text-blue-500">게시판</a>
          </Link>

          <Link href="/policylist">
            <a className="text-2xl hover:text-blue-500">정책 리스트</a>
          </Link>

          {/* 일단 기본값 1로 라우팅 */}
          <button
            className="text-2xl hover:text-blue-500"
            onClick={myPageRoute}
          >
            MyPage
          </button>
        </div >
        {!userData.isLogined ? (
          <div className={style.nav_logout_box}>
            <Link href="/login">
              <a
                className={`${style.nav_login} bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-2xl`}
                >
                Login
              </a>
            </Link>
          </div>
        ) : (
          <div className={style.nav_logout_box}>
            <div className={style.nav_reset_box}>
              로그인 유지 시간 
              <br></br>
              {` ${minutes} : `}
              {seconds < 10 ? "0" : ""}
              {seconds}
              <button  onClick={resetTimer}>재설정</button>
            </div> 
            <button
              className={` bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-2xl`}
              onClick={logoutHandler}
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
