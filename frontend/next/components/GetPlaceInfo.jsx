import React, { useEffect, useState } from "react";
import Link from "next/link";

import Style from "./styles/GetPlaceInfo.module.css";
import SelectPlace from "./SelectPlace";

export default function GetPlaceInfo() {
  return (
    <div className={Style.wrap}>
      <div className={Style.container}>
        <div className={Style.form_box}>
          <form>
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
            <div className={Style.birth}>
              <label htmlFor="birth">출생 연도</label>
              <input type="date" id="birth" />
            </div>
            <div>
              <label htmlFor="place">거주지</label>
              <SelectPlace className={Style.place} id="place" />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
