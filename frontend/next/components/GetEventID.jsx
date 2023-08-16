import React from 'react'
import OurAxios from '../config/ourAxios';

export default function GetEventID() {
	return;
}

export async function getEventID(postNum) {
  const api = OurAxios();
  
  try {
    const res = await api.get(`/events/check/policies/${postNum}`);
    console.log("getEventID 요청 성공");
    console.log(res);

    if (res.data.length === 0) {
      console.log("이벤트ID 없음!");
      return null;
    }

    return res.data;

  } catch (err) {
    console.log("이벤트 ID 받아오기 실패");
    console.log(err);
    throw err; // 에러를 다시 던져서 상위 함수에서 처리할 수 있게 합니다.
  }
}

