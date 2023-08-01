import React, { useEffect, useState } from "react";
import Link from "next/link";

import Style from "./styles/GetPlaceInfo.module.css";
import SelectPlace from "./SelectPlace";

export default function GetPlaceInfo(props) {
  return (
    <div className={Style.wrap}>
      <div className={Style.container}>
        <div>
          <input
            className={Style.range}
            type="range"
            min="0"
            max="100"
            step="50"
          />
        </div>
        <div>
          <h4>마지막입니다. 개인 정보</h4>
          <span>정보를 입력하면 알맞는 정책을 추천해 드릴게요♣</span>
        </div>
        <div>
          <form>
            <div className={Style.birth}>
              <label htmlFor="birth">출생 연도</label>
              <input className={Style.input} type="date" id="birth" />
            </div>
            <div className={Style.place}>
              <label htmlFor="place">거주지</label>
              <SelectPlace id="place" />
            </div>
          </form>
        </div>
        <div className={Style.button_box}>
          <button className={Style.button} onClick={props.onClick_pre}>
            이전
          </button>
          <button className={Style.button} onClick={props.onClick_next}>
            다음
          </button>
        </div>
      </div>
    </div>
  );
}
