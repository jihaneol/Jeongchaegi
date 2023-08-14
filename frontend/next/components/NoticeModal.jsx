import React from "react";
import style from "./styles/NoticeModal.module.css";
import { useEffect } from "react";
import { useState } from "react";
import OurAxios from "../config/ourAxios";
import axios from "axios";

export default function NoticeModal({ type, title, modalClose, setRefreshFlag, eventIdProp }) {
	const [mention, setMention] = useState("등록");
	const [eventId, setEventId] = useState("");
	const [calendarID, setCalendarID] = useState("");
	const api = OurAxios();
  // type 을 받아와서, type 이 true면 삭제, false면 등록

  function regist() {

		setRefreshFlag(prev => !prev);
		modalClose();
	}
	
  function unregist() {
		const accessToken = localStorage.getItem("accessToken");
		if (!eventId) {
			console.log("eventId 없음");
		}
		else {
			axios({
				method: "delete",
				url: "https://kapi.kakao.com/v2/api/calendar/delete/event",
				params: {
					event_id: eventId,
				},
				headers: {
					Authorization: `Bearer ${accessToken}`,
				}
			}).then((res) => {
				console.log("일정 삭제 성공!");
				console.log(res);
			}).catch((err) => {
				console.log("일정 삭제 실패!");
				console.log(err);
			})
		}
		setRefreshFlag(prev => !prev);
		modalClose();
	}

	useEffect(() => {
		if (type === true)
			setMention("삭제");
		else
			setMention("등록");
	}, [type])

	useEffect(() => {
		setEventId(eventIdProp);
		console.log("event_id 있는 경우");
	}, [eventIdProp])

  return (
    <div className={style.modal_box}>
      <div className={style.modal_header}>알림
			<button onClick={modalClose}>
				X
			</button>
			</div>
      <div className={style.modal_content}>
        {`"${title}" 을(를)`}
				<br />
				{`카카오 캘린더 에 ${mention}하시겠습니까?`}
      </div>
			<div className={style.modal_footer}>
				<button className={style.modal_footer_action} onClick={type ? unregist : regist} >
      		{type ? "삭제" : "등록"}
				</button>
				<button className={style.modal_footer_cancel} onClick={modalClose}>
					취소
				</button>

			</div>
    </div>
  );
}
