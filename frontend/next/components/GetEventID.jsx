import React from 'react'
import OurAxios from '../config/ourAxios';

export default function GetEventID() {
	return;
}

export async function getEventID(postNum) {
	const api = OurAxios();

	api.get(`/events/check/policies/${postNum}`).then((res) => {
		// null 이면 아직 일정 등록 안된것
		console.log("getEventID 요청 성공");
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
