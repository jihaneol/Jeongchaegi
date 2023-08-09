import style from "../styles/Nav.module.css";
import Link from "next/link";
import Image from "next/image";
import Logout from "./Logout";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function Nav() {
  const [nickname, setNickname] = useState("");
  const logout = Logout();
  const userData = useSelector(state => state.user);

  return (
    <div className={`${style.nav_wrap} bg-gray-800 text-white p-4`}>
      <div className={`${style.nav_menu} flex justify-between items-center`}>
        <div className="flex items-center space-x-6">
          <Link href="/">
            <a>
              <Image src="/Logo.PNG" width="130px" height="64px" alt="정채기" />
            </a>
          </Link>

          <Link href="/articlelist">
            <a className="text-2xl hover:text-blue-500">게시판</a>
          </Link>

          <Link href="/policylist">
            <a className="text-2xl hover:text-blue-500">정책 리스트</a>
          </Link>

          {/* 일단 기본값 1로 라우팅 */}
          <Link href={`userData.isLogined ? /mypage/${nickname} : /login`}>
            <a className="text-2xl hover:text-blue-500">My Page</a>
          </Link>
        </div>
        {!userData.isLogined ? (
          <Link href="/login">
            <a
              className={`${style.nav_login} bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-2xl`}
            >
              Login
            </a>
          </Link>
        ) : (
          <button
            className={`${style.nav_logout} bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded text-2xl`}
            onClick={logout}
          >
            Logout
          </button>
        )}
      </div>
    </div>
  );
}
