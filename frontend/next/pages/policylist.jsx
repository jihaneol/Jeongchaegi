import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../styles/PolicyList.module.css";
import Nav from "../components/Nav";
import PcyListItem from "../components/PcyListItem";
import PolicyListSearch from "../components/PolicyListSearch";
import PolicyFilter from "../components/PolicyFilter";
import PolicyListCalendar from "../components/PolicyListCalendar";
import PolicyListSort from "../components/PolicyListSort";
import PolicyListPageBtn from "../components/PolicyListPageBtn";

import axios from "axios";

export default function PolicyList() {
  const router = useRouter();
  const { calendarActive, calendarDate } = router.query;

  // State 모음
  const [isCalendarActive, setIsCalendarActive] = useState(
    Boolean(calendarActive)
  );
  const [targetDate, setTargetDate] = useState(new Date());
  const [pcydata, setpcy] = useState('');  // 정책리스트 데이터
  const [isFetching, setFetching] = useState(1);  // 패치할지 감시, 1페이지부터
  const [lastPage, setLastPage] = useState(999999999999999999999);  // 귀찮아서 일단 이렇게 구현

  // useEffect 관리 모음
  useEffect(() => {
    if (calendarDate) {
      setTargetDate(new Date(calendarDate));
    } else setTargetDate(new Date());
  }, []);

  useEffect(() => {
    if (isFetching <= lastPage) getPcyData(isFetching);  // 변화 감지하면 그 페이지 실행, 막페이지 아니면
    
  }, [isFetching]);

  useEffect(() => {    
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    return () => {
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  // 함수 모음

  // policy data 서버에서 받기, 나중에 수정 예정
  function getPcyData(page) {
    // console.log(page);
    // console.log(lastPage);
    axios({
      method: "get",
      url: "http://3.36.131.236:8081/policies",
      params:{
        pageIndex:page,
      }
    }).then((res) => {
      if (pcydata && page < lastPage) {  // 이미 데이터가 있으면(한번 이상 요청을 받았으면)
        setpcy(pcydata => [...pcydata, ...res.data.content])  // 뒤에 추가함
      }
      else if (!pcydata){  // 데이터가 없으면(처음이면) 바로 set함
        setLastPage(res.data.totalPages)  // 마지막 페이지
        setpcy(res.data.content);  
      }
    });
  }

  // 스크롤 이벤트 감시
  function handleScroll() {
    const { scrollTop, offsetHeight } = document.documentElement
    if (window.innerHeight + scrollTop + 0.5 >= offsetHeight) {  // 0.5  더한거는 왠지 모르겠는데 끝까지 않닿음
      // console.log(true);
      setFetching(isFetching => isFetching + 1)  // 닿는 순간 +1 위 useeffect에서 변화 감지
    }
  }

  function handleItemClick(itemId) {
    console.log(`Clicked item with ID: ${itemId}`);
    router.push(`/policydetail/${itemId}`);
    // Do whatever you want with the clicked item ID
  }

  function calendarBtnClick() {
    setIsCalendarActive((prev) => !prev);
  }

  function onClickDay(e) {
    setTargetDate(new Date(e.getFullYear(), e.getMonth(), e.getDate()));
  }

  function clickPageNumb(numb) {
    console.log(numb);
  }

  return (
    <div className={style.wrapper}>
      {/* navbar */}
      <Nav />
      {/* fixed calendar */}
      {isCalendarActive ?
        <div className={style.calendar_wrap}>
          <div className={style.calendar_wrap_header}>날짜를 설정하세요</div>
          {isCalendarActive === true ? (
            <PolicyListCalendar onClickDay={onClickDay} targetDate={targetDate} />
          ) : null}
        </div> : null
      }

      {/* 바깥쪽 랩 */}
      <div
        className={`${style.list_wrap_container}
          ${isCalendarActive ? style.list_wrap_on : style.list_wrap_off}`}
      >
        {/* 검색창 */}
        <PolicyListSearch />

        {/* 필터 */}
        <PolicyFilter
          isCalendarActive={isCalendarActive}
          calendarBtnClick={calendarBtnClick}
        />

        {/* 정렬 기능 */}
        <PolicyListSort />

        {/* pcylist */}
        <div className={style.pcylist}>
          {pcydata ? (
            <PcyListItem obj={pcydata} onItemClick={handleItemClick} /> // 그냥 리스트 통째로 프롭함
          ) : (
            <h1>loading...</h1>
          )}
        </div>
      </div>
    </div>
  );
}
