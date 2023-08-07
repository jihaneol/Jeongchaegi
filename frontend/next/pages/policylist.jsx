import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import style from "../styles/PolicyList.module.css";
import Nav from "../components/Nav";
import PcyListItem from "../components/PcyListItem";
import PolicyListSearch, {
  mySearchQuery,
} from "../components/PolicyListSearch";
import PolicyFilter, {
  searchAge,
  selectPcyTypes,
} from "../components/PolicyFilter";
import PolicyListCalendar from "../components/PolicyListCalendar";
import PolicyListSort from "../components/PolicyListSort";

import { sido } from "../components/SelectPlace"; // 컴포넌트 변수 가져옴
import OurAxios from "../config/ourAxios";

import axios from "axios";

let page = 1;
let lastPage = 999999999999;

export default function PolicyList() {
  console.log('rerendering...........');
  const router = useRouter();
  const { calendarActive, calendarDate } = router.query;
  const api = OurAxios();

  // State 모음
  const [isCalendarActive, setIsCalendarActive] = useState(
    Boolean(calendarActive)
  );

  const [pcydata, setpcy] = useState();  // 정책리스트 데이터, 수정잦음
  const [targetDate, setTargetDate] = useState(new Date());  // 날짜 데이터 상태관리

  // useEffect 관리 모음
  useEffect(() => {
    page = 1;
    lastPage = 9999999;

    console.log(router.query);
    getPcyData(page, router.query);
  }, [router.query]);  // url 쿼리 바뀔 시 실행, 

  useEffect(() => {
    // 컴포넌트 생성시 할것들

    // if (calendarDate) {
    //   setTargetDate(new Date(calendarDate));
    // } else setTargetDate(new Date());
    page = 1;
    lastPage = 9999999;
  }, []);


  useEffect(()=>{  // 스크롤 이벤트는 처음 했던거 기준으로만 됨 그래서 계속 함수 최신화 할거임 근데 계속 함수 생성하니까 문제, 어떻게 하지?
    const timer = setInterval(() => {
      window.addEventListener("scroll", handleScroll);
    }, 500);
    return () => {
      // 컴포넌트 생성시 스크롤 이벤트, 끝날때 없애기
      clearInterval(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll])

  function submitParamsToBack() {
    // 검색 클릭시 filter 항목 ================현재 수정중!!!!!!!!!!!!!!!!!!!!!!!!!!!

    const types = selectPcyTypes.join(",");
    const region = sido;
    const age = searchAge;
    const keyword = mySearchQuery;

    const paramobj = { types, region, age, keyword };
    for (const key in paramobj) {
      // 없으면 한번 처리
      if (!paramobj[key]) {
        delete paramobj[key];
      }
    }
    console.log(paramobj); // 완성된 params

    // 1페이지부터 돌아가서 검색해야됨 그래서 수정
    page = 1;
    lastPage = 999999999999999;
    setpcy(); // 그리고 검색시 기존 데이터는 비울거임

    router.replace({
      // url 변경함 그리고 가져올거임
      pathname: "/policylist",
      query: paramobj,
    });
  }

  // policy data 서버에서 받기, 나중에 수정 예정
  function getPcyData(page, paramobj = "") {
    console.log(page);
    console.log(lastPage);
    axios({
      method: "get",
      url: "http://3.36.131.236:8081/policies",
      params: {
        ...paramobj,
        pageIndex: page,
      },
    })
      .then((res) => {
        if (!pcydata) {
          console.log(res.request.responseURL);
          lastPage = res.data.totalPages;
          setpcy([...res.data.content]);
        } else {
          console.log(res.request.responseURL);
          lastPage = res.data.totalPages;
          setpcy((pcydata) => [...pcydata, ...res.data.content]);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  // 스크롤 이벤트 감시
  function handleScroll() {
    const { scrollTop, offsetHeight } = document.documentElement
    if (window.innerHeight + scrollTop + 0.5 >= offsetHeight) {  // 0.5  더한거는 왠지 모르겠는데 끝까지 않닿음
      console.log('next page...');
      page += 1
      if (page <= lastPage) getPcyData(page, router.query)
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
      {isCalendarActive ? (
        <div className={style.calendar_wrap}>
          <div className={style.calendar_wrap_header}>날짜를 설정하세요</div>
          {isCalendarActive === true ? (
            <PolicyListCalendar
              onClickDay={onClickDay}
              targetDate={targetDate}
            />
          ) : null}
        </div>
      ) : null}

      {/* 바깥쪽 랩 */}
      <div
        className={`${style.list_wrap_container}
          ${isCalendarActive ? style.list_wrap_on : style.list_wrap_off}`}
      >
        {/* 검색창 */}
        <PolicyListSearch submitParamsToBack={submitParamsToBack} />

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
            <>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
              <h1>loading...</h1>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
