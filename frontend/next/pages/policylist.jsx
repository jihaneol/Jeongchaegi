import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../styles/PolicyList.module.css";
import Nav from "../components/Nav";
import PcyListItem from "../components/PcyListItem";
import PolicyListSearch, { mySearchQuery } from "../components/PolicyListSearch";
import PolicyFilter, { searchAge, selectPcyTypes } from "../components/PolicyFilter";
import PolicyListCalendar from "../components/PolicyListCalendar";
import PolicyListSort from "../components/PolicyListSort";

import { sido } from "../components/SelectPlace";  // 컴포넌트 변수 가져옴
import OurAxios from "../config/ourAxios";

import axios from "axios";

export default function PolicyList() {
  const router = useRouter();
  const { calendarActive, calendarDate } = router.query;
  const api = OurAxios();

  // State 모음
  const [isCalendarActive, setIsCalendarActive] = useState(
    Boolean(calendarActive)
  );
  const [pcydata, setpcy] = useState('');  // 정책리스트 데이터
  const [isFetching, setFetching] = useState(1);  // 패치할지 감시, 1페이지부터
  const [lastPage, setLastPage] = useState(999999999999999999999);  // 귀찮아서 일단 이렇게 구현

    // filter 데이터 모음
  const [targetDate, setTargetDate] = useState(new Date());
  
  // useEffect 관리 모음
  useEffect(() => {
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 100);
    if (calendarDate) {
      setTargetDate(new Date(calendarDate));
    } else setTargetDate(new Date());

    return () => {  // 컴포넌트 생성시 스크롤 이벤트, 끝날때 없애기
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


  useEffect(() => {
    if (isFetching <= lastPage) getPcyData(isFetching);  // 변화 감지하면 그 페이지 실행, 막페이지 아니면
  }, [isFetching]);
  // 함수 모음


  function submitParamsToBack() {  // 검색 클릭시 filter 항목 ================현재 수정중!!!!!!!!!!!!!!!!!!!!!!!!!!!
    console.log('current filtering list...........');
    console.log(targetDate.getDate());
    console.log(sido);
    console.log(mySearchQuery);
    console.log(searchAge);
    console.log(selectPcyTypes);
  }

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
      console.log(res);
      if (!pcydata) {
        setLastPage(res.data.totalPages)
        setpcy(res.data.content);
      }
      else if (pcydata && page < lastPage) {
        setpcy(pcydata => [...pcydata, ...res.data.content])
      }
    }).catch((err) => {
      console.log(err);
    });
  }

  // 스크롤 이벤트 감시
  function handleScroll() {
    const { scrollTop, offsetHeight } = document.documentElement
    if (window.innerHeight + scrollTop + 0.5 >= offsetHeight) {  // 0.5  더한거는 왠지 모르겠는데 끝까지 않닿음
      console.log('next page...');
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
    console.log(targetDate.getDate());
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
        <PolicyListSearch
        submitParamsToBack = {submitParamsToBack}
        />

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
