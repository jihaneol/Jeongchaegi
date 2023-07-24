import React from "react";
import Styles from "../styles/PolicyTop.module.css";
import { FaBell, IFaBellSlash, FaBars, FaBookmark } from "react-icons/fa";

export default function PolicyHeader() {
  return (
    <div className={Styles.nav_wrap}>
      <div className={Styles.container}>
        <div className={Styles.box1}>
          <a>
            <FaBars />
          </a>
        </div>
        <div className={Styles.box2}>
          <a>정책 이름</a>
        </div>
        <div className={Styles.box3}>
          <a>
            <FaBell />
          </a>
        </div>
        <div className={Styles.box4}>
          <a>
            <FaBookmark />
          </a>
        </div>
      </div>
      <hr />
    </div>
  );
}
