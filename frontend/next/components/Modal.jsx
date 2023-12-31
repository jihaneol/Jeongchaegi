import React from "react";
import style from "../styles/Home.module.css";
import { useRouter } from "next/router";

export default function Modal({ modalFlag, onClose, targetDate }) {
  const router = useRouter();
  if (modalFlag === false) return null;

  const year = targetDate.getFullYear();
  const month = targetDate.getMonth();
  const day = targetDate.getDate();

  const moveToList = () => {
    function getToday(){  // 긁어온 yyyy-mm-dd형식으로 바꿔주는 함수
      if (targetDate) {
        var year = targetDate.getFullYear();
        var month = ("0" + (1 + targetDate.getMonth())).slice(-2);
        var day = ("0" + targetDate.getDate()).slice(-2);
    
        return year + "-" + month + "-" + day;
      }
      return null
    }
    const queryDate = getToday()
    router.push({
      pathname: "/policylist",
      query: { calendarActive: true, date: queryDate },
    });
  };

  return (
    <div className={`${modalFlag === true ? style.modal : ""}`}>
      <div className={style.modal_header}>
        알림
        <button onClick={onClose} className={style.modal_header_exit}>
          {" "}
          X{" "}
        </button>
      </div>
      <div className={style.modal_content}>
        <h3>{`${year}년 ${month + 1}월 ${day}일`}</h3>
        <h4>{`신청 가능한 정책 목록을 보시겠습니까?`}</h4>
      </div>
      <div className={style.modal_footer}>
        <button onClick={moveToList} className={style.modal_footer_move}>
          이동
        </button>
        <button onClick={onClose} className={style.modal_footer_cancel}>
          취소
        </button>
      </div>
    </div>
  );
}
