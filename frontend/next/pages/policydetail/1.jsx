import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Nav from "../../components/Nav";
import { FaBell, IFaBellSlash, FaBars, FaBookmark } from "react-icons/fa";
import Image from "next/image";

import Style from "../../styles/PolicyDetail.module.css";
import LiveChat from "../../components/LiveChat";

export default function Page(props) {
  // const router = useRouter();
  const data = props.data;
  console.log(props);

  return (
    <div>
      <Nav />
      <div className={Style.wrap}>
        <div className={Style.container}>
          <div className={Style.title}>
            <div>
              <FaBars />
            </div>
            <div>
              <h3>청년 도약 계좌</h3>
            </div>
            <div className={Style.icon}>
              <div>
                <FaBell />
              </div>
              <div>
                <FaBookmark />
              </div>
            </div>
          </div>
          <div>
            <Image className={Style.img} src="/testImg.jpg" alt="testImg" />
          </div>
          <div className={Style.content}></div>
          <div className={Style.chat_box}>
            <div className={Style.chat}>
              <h4>채팅방</h4>
              <LiveChat />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getStaticProps() {
  const res = await axios.get("https://jsonplaceholder.typicode.com/posts/1");
  const data = res.data;

  return {
    props: { data },
  };
}
