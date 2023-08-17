import React from 'react'
import OurAxios from '../config/ourAxios';

export default function GetEventID() {
	return;
}

export async function getEventID(postNum) {
  const api = OurAxios();
  
  try {
    const res = await api.get(`/events/check/policies/${postNum}`);
    if (res.data.length === 0) {
      return null;
    }

    return res.data;

  } catch (err) {
    throw err; // 에러를 다시 던져서 상위 함수에서 처리할 수 있게 합니다.
  }
}

