import React from "react";
import style from "./styles/NoticeModal.module.css";
import { useEffect } from "react";
import { useState } from "react";
import OurAxios from "../config/ourAxios";
import axios from "axios";

export default function NoticeModal({
  type,
  title,
  modalClose,
  setRefreshFlag,
  eventIdProp,
  policyIdProp,
}) {
  const [mention, setMention] = useState("등록");
  const [eventId, setEventId] = useState([]);
  const [calendarId, setCalendarId] = useState("");
  const api = OurAxios();
  // type 을 받아와서, type 이 true면 삭제, false면 등록

  async function findJCG(calendars) {
    const calendar = calendars.find((calendar) => calendar.name === "정채기");
    if (calendar) {
      return calendar.id;
    }
    return calendar;
  }

  async function createKakaoEvent(events, index, kakaoToken) {
    console.log("카카오 일정 생성 시도! -> event 객체");
    const event = events[index];
    console.log(event);

    const accessToken = localStorage.getItem("accessToken");

    await axios({
      method: "post",
      url: "https://kapi.kakao.com/v2/api/calendar/create/event",
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
      params: {
        calendar_id: calendarId,
        event: JSON.stringify(event),
      },
    })
      .then(async (res) => {
        console.log(`카카오 일정${index} 생성 성공!`);
        console.log(res);
        // 일정 아이디와 정책 아이디로 일정 저장 -> 위에서 뱉어낸 eventID 로 마찬가지로 2번 보내야함.
        await api
          .post(`/events/${res.data.event_id}/save/policies/${policyIdProp}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log("일정 저장 성공!");
            console.log(res);
          })
          .catch((err) => {
            console.log("일정 저장 실패");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(`카카오 일정${index} 생성 실패`);
        console.log(err);
      });
  }

  async function getCalendarList(kakaoToken) {
    await axios({
      method: "get",
      url: "https://kapi.kakao.com/v2/api/calendar/calendars",
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    })
      .then(async (res) => {
        console.log("캘린더 목록 가져오기 성공!");
        console.log(res);
        // 캘린더 이름이 "정채기"인 거 찾기
        const calendarIdRet = await findJCG(res.data.calendars);
        setCalendarId(calendarIdRet);
      })
      .catch((err) => {
        console.log("캘린더 목록 가져오기 실패");
        console.log(err);
      });
    console.log("정채기인 거 찾았어?");
    console.log(calendarId);
  }

  async function createCalendar(kakaoToken) {
    console.log("캘린더 없음! 생성필요");
    await axios({
      method: "post",
      url: "https://kapi.kakao.com/v2/api/calendar/create/calendar",
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
      params: {
        name: "정채기",
        color: "ROYAL_BLUE",
        reminder: null,
        reminder_all_day: null,
      },
    })
      .then((res) => {
        console.log("캘린더 생성 성공!");
        setCalendarId(res.data);
      })
      .catch((err) => {
        console.log("캘린더 생성 실패");
        console.log(err);
      });
  }

  async function deleteEvent(kakaoToken, accessToken, index) {
    await axios({
      method: "delete",
      url: "https://kapi.kakao.com/v2/api/calendar/delete/event",
      params: {
        event_id: eventId[index],
      },
      headers: {
        Authorization: `Bearer ${kakaoToken}`,
      },
    })
      .then((res) => {
        console.log("카카오 일정 삭제 성공!");
        console.log(res);
        api
          .delete(`/events/${eventId[index]}/`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log("일정 삭제 성공!");
            console.log(res);
          })
          .catch((err) => {
            console.log("일정 삭제 실패");
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("카카오 일정 삭제 실패!");
        console.log(err);
      });
  }

  async function regist() {
    const kakaoToken = localStorage.getItem("kakaoToken");
    // 정책 아이디(policyIdProp)로 일정 생성폼 가져오기 -> 이벤트 폼 얻기
    await api
      .get(`/events/form/policies/${policyIdProp}/`)
      .then(async (res) => {
        console.log("생성폼 얻기 성공!");
        console.log(res);
        // 캘린더 아이디 + 이벤트 폼 으로 일정생성 -> 일정 아이디 발급 ([0]: 시작일, [1]: 마감일 -> 2번 요청보내야함
        await createKakaoEvent(res.data, 0, kakaoToken, calendarId);
        await createKakaoEvent(res.data, 1, kakaoToken, calendarId);
      })
      .catch((err) => {
        console.log("생성폼 얻기 실패!");
        console.log(err);
      });
    alert("성공적으로 등록되었습니다.");
    setRefreshFlag((prev) => !prev);
    modalClose();
  }

  function unregist() {
    const accessToken = localStorage.getItem("accessToken");
    const kakaoToken = localStorage.getItem("kakaoToken");
    if (eventId.length === 0) {
      console.log("eventId 없음");
    } else {
      deleteEvent(kakaoToken, accessToken, 0);
      deleteEvent(kakaoToken, accessToken, 1);
    }
    alert("성공적으로 삭제되었습니다.");
    setRefreshFlag((prev) => !prev);
    modalClose();
  }

  async function calendarRegist() {
    const kakaoToken = localStorage.getItem("kakaoToken");
    createCalendar(kakaoToken);
    alert("성공적으로 등록되었습니다.")
    modalClose();
    await getCalendarList(kakaoToken);
  }

  useEffect(() => {
    if (type === true) setMention("삭제");
    else setMention("등록");
  }, [type]);

  useEffect(() => {
    setEventId(eventIdProp);
    console.log("event_id 있는 경우");
    console.log(eventIdProp);
  }, [eventIdProp]);

  useEffect(async () => {
    const kakaoToken = localStorage.getItem("kakaoToken");
    await getCalendarList(kakaoToken);
  }, []);

  useEffect(() => {
    // 캘린더가 없는데 일정이 있으면 일정도 삭제해야함
    const accessToken = localStorage.getItem("accessToken");
    const kakaoToken = localStorage.getItem("kakaoToken");
    if (type === true && !calendarId) {
      deleteEvent(kakaoToken, accessToken, 0);
      deleteEvent(kakaoToken, accessToken, 1);
      setRefreshFlag(prev => !prev);
    }
  }, [])

  return (
    <div className={style.modal_box}>
      <div className={style.modal_header}>
        알림
        <button onClick={modalClose}>X</button>
      </div>
      {calendarId ? (
        <div className={style.modal_content}>
          {`"${title}" 을(를)`}
          <br />
          {`카카오 톡캘린더 에 ${mention}하시겠습니까?`}
        </div>
      ) : (
        <div className={style.modal_content}>
          {`"정채기"를`}
          <br />
          {`카카오 톡캘린더 에 추가하시겠습니까?`}
        </div>
      )}

      <div className={style.modal_footer}>
        <button
          className={style.modal_footer_action}
          onClick={calendarId ? (type ? unregist : regist) : calendarRegist}
        >
          {type ? "삭제" : "등록"}
        </button>
        <button className={style.modal_footer_cancel} onClick={modalClose}>
          취소
        </button>
      </div>
    </div>
  );
}
