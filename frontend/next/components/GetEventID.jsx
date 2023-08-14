import React from 'react'

export default function GetEventID() {
	return;
}

export function getEventID(postNum) {
	api.get(`/events/check/policies/${postNum}`).then((res) => {
		// null 이면 아직 일정 등록 안된것
		console.log("getEventID.res");
		console.log(res);
		if (res.data === "") {
			console.log("이벤트ID 없음!");
			return null;
		}   
		// 이벤트 아이디 있으면 ID 리턴
		return res.data;
	}).catch((err) => {
		console.log("이벤트 ID 받아오기 실패");
		console.log(err);
	});
}