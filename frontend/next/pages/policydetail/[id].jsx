import React from "react";
import { useRouter } from "next/router";
import Nav from "../../components/Nav";
import { FaBell, IFaBellSlash } from "react-icons/fa";
import PolicyHeader from "../../components/PolicyHeader";

import Styles from "../../styles/PolicyDetail.module.css";

export default function Page() {
  const router = useRouter();
  // console.log(router);

  return (
    <div className={Styles.wrapper}>
      <Nav />
      <div className={Styles.list_wrap}>
        <PolicyHeader />
        {/* 청년 이미지 */}
        <div className={Styles.pcylist}>
          <img src="http://via.placeholder.com/720x400" />
        </div>

        {/* <p>{router.query.id} </p> */}
        <div className={Styles.chat}>
          <h4>정책 설명</h4>
        </div>
        <div className={Styles.chat}>
          <h4>채팅방</h4>
        </div>
        <div className={Styles.pcylist}></div>
      </div>
    </div>
  );
}
