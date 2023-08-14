import React from "react";
import style from "./styles/NoticeModal.module.css";
import { useEffect } from "react";
import { useState } from "react";

export default function NoticeModal({ type, title, modalClose, setRefreshFlag }) {
	const [mention, setMention] = useState("등록");
	let eventID = "";
	let calendarID = "";
  // type 을 받아와서, type 이 true면 삭제, false면 등록

  function regist() {

		setRefreshFlag(prev => !prev);
	}
	
  function unregist() {
		
		setRefreshFlag(prev => !prev);
	}

	useEffect(() => {
		if (type === true)
			setMention("삭제");
		else
			setMention("등록");
	}, [type])

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
