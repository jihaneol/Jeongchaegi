import React, { useEffect, useState } from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import OurAxios from "../config/ourAxios";
import axios from "axios";
import { getEventID }from "./GetEventID";

export default function CanRegistNotice({ postNum, registerSet, refreshFlag }) {
  const api = OurAxios();
  const [registerFlag, setRegisterFlag] = useState(false); // true 면 등록됨, false 면 등록 안됨

  let eventID = "";

  function getEventDetail(eventId) {
    const kakaoToken = localStorage.getItem("kakaoToken");
    console.log("getEventDetail 호출! (이벤트 ID 있음)");
    axios
      .get(
        `https://kapi.kakao.com/v2/api/calendar/event`,
        {
          headers: {
            Authorization: `Bearer ${kakaoToken}`,
          },
          params: {
            event_id: eventId,
          },
        }
      )
      .then((res) => {
        // 200이면 이미 일정 등록되어 있는 경우
        console.log("이미 일정 등록 되어 있음!");
        setRegisterFlag(true);
      })
      .catch((err) => {
        // 400이면 일정이 없는 것. delete 요청 보내야함.
        console.log("일정이 없음 -> delete 요청");
        api.delete(`/api/events/${eventId}`).then((res) => {
          console.log("delete 요청 성공!");
          console.log(res);
          setRegisterFlag(false);
        }).catch((err) => {
          console.log("delete 요청 실패");
          console.log(err);
        });
      });
  }

  // function getEventID() {
  //   api.get(`/events/check/policies/${postNum}`).then((res) => {
  //     // null 이면 아직 일정 등록 안된것
  //     console.log("getEventID.res");
  //     console.log(res);
  //     if (res.data === "") {
  //       console.log("이벤트ID 없음!");
  //       setRegisterFlag(false);
  //     }   
  //     // 이벤트 아이디 있으면 일정 상세 확인
  //     else getEventDetail(res.data);
  //   }).catch((err) => {
  //     console.log("이벤트 ID 받아오기 실패");
  //     console.log(err);
  //   });
  // }

  useEffect(() => {
    getEventID(postNum).then((res) => {
      console.log("useEffect getEventID");
      console.log(res);
      eventID = res;
      if (eventID === null)
        setRegisterFlag(false);
      else
        getEventDetail(eventID);
    })
  }, [refreshFlag]);

  function onClickImg() {
    registerSet(true, registerFlag);
  }

  return (
    <div>
      {/* 일정 등록은 가능한 정책 컴포넌트 */}
      {/* 이미 등록되어 있을 때, 안되어 있을 때를 기준으로 나뉠듯 */}
      {registerFlag ? (
        <div>
          <FaBell className="cursor-pointer" onClick={onClickImg} />
          {/* // 등록 되어 있으면
          // 클릭 시 일정 삭제해야 함.
          // 일정 삭제 모달 띄우기 */}
        </div>
      ) : (
        <FaRegBell className="cursor-pointer" onClick={onClickImg} />
        // 등록 안 되어 있으면
        // 클릭 시 일정 등록해야 함.
      )}
    </div>
  );
}
