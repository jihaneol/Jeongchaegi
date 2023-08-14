import React, { useEffect, useState } from "react";
import { FaBell, FaBellSlash } from "react-icons/fa";
import OurAxios from "../config/ourAxios";
import axios from "axios";

export default function CanNoticeRegister({ postNum }) {
  const api = OurAxios();
  const [registerFlag, setRegisterFlag] = useState(false); // true 면 등록됨, false 면 등록 안됨

  const kakaoToken = localStorage.getItem("kakaoToken");

  function getEventDetail(eventId) {
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
        setRegisterFlag(true);
      })
      .catch((err) => {
        // 400이면 일정이 없는 것. delete 요청 보내야함.
        console.log("일정이 없음 -> delete 요청");
        api.delete(`/api/events/${eventId}`).catch((err) => {
          console.log("delete 요청 실패");
          console.log(err);
        });
      });
  }

  function getEventID() {
    api.get(`/events/check/policies/${postNum}`).then((res) => {
      // null 이면 아직 일정 등록 안된것
      if (res.data === null) setRegisterFlag(false);
      // 이벤트 아이디 있으면 일정 상세 확인
      else getEventDetail(res.data);
    }).catch((err) => {
      console.log("이벤트 ID 받아오기 실패");
      console.log(err);
    });
  }

  useEffect(() => {
    getEventID();
  }, []);

  return (
    <div>
      {/* 일정 등록은 가능한 정책 컴포넌트 */}
      {/* 이미 등록되어 있을 때, 안되어 있을 때를 기준으로 나뉠듯 */}
      {registerFlag ? (
        <FaBell className="cursor-pointer" />
      ) : (
        // 등록 되어 있으면
        // 클릭 시 일정 삭제해야 함.
        <FaBellSlash className="cursor-pointer" />
        // 등록 안 되어 있으면
        // 클릭 시 일정 등록해야 함.
      )}
    </div>
  );
}