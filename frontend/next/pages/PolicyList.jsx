import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Calendar from "react-calendar";

import styles from "../styles/PolicyList.module.css";
import Nav from "../components/Nav";
import PcyListItem from "../components/PcyListItem";
import PolicyFilterList from "../components/PolicyFilterList";

export default function PolicyList() {
  const router = useRouter();
  const {calendarActive, calendarDate} = router.query;

  // State 모음
  const [isCalendarActive, setIsCalendarActive] = useState(Boolean(calendarActive));
  const [targetDate, setTargetDate] = useState(new Date());
  
  // 변수 모음

  // 필터 리스트 - 필터 종류 늘어날 때마다 여기에 추가
  const filterList = ["Default1", "Default2", "Default3"]

  // 데이터 테스트용 ===========================================아래쪽

  const [testdata, settest] = useState("");

  function getFakeData() {
    // 더미 데이터 요청, 실험용
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((res) => {
      // console.log(res);
      settest(res.data);
    });
  }
  // console.log(testdata);

  function prev(e) {
    // 클릭 이벤트 막기 / 엑시오스 재요청
    settest("");
    e.preventDefault();
    getFakeData();
  }

  function handleItemClick(itemId) {
    console.log(`Clicked item with ID: ${itemId}`);
    router.push(`/policydetail/${itemId}`);
    // Do whatever you want with the clicked item ID
  }

  useEffect(() => {
    if (calendarDate) {
      setTargetDate(new Date(calendarDate));
    }
    else
      setTargetDate(new Date())
  }, [])

  useEffect(() => {
    // 컴포넌트 생성시 시행, 죽을때 시행
    console.log("pcylist component create");
    getFakeData();
    return () => {
      console.log("pcylist component die");
    };
  }, []);
  // 데이터 테스트용 ===========================================위쪽

  function calendarBtnClick() {
    setIsCalendarActive((prev) => !prev);
  }

  function onClickDay(e) {
    setTargetDate(new Date(e.getFullYear(), e.getMonth(), e.getDate()))
  }

  return (
    <div className={styles.wrapper}>
      {/* navbar */}
      <Nav />
      {/* fixed calendar */}
      {isCalendarActive === true ? (
        <Calendar
          formatDay={(locale, date) =>
            date.toLocaleString("en", { day: "numeric" })
          }
          className={`${styles.fixed_calendar}`}
          minDetail="month"
          maxDetail="month"
          next2Label={null}
          prev2Label={null}
          showNeighboringMonth={false}
          value={targetDate}
          onClickDay={onClickDay}
        />
      ) : null}

      {/* 바깥쪽 랩 */}
      <div
        className={
          isCalendarActive === false
            ? styles.list_wrap_on
            : styles.list_wrap_off
        }
      >
        {/* 검색창 */}
        <form action="" className={`input-group mb-3 ${styles.search_query}`}>
          <input
            type="text"
            className="form-control"
            placeholder="search query"
          />
          <button
            className={`btn btn-outline-secondary btn-light`}
            onClick={prev}
          >
            search
          </button>
        </form>
        {/* 조건 검색 */}
        <div className={styles.filter_wrapper}>
          <div className={styles.filter_header}>
            Filter
            <button
              className={`${styles.filter_calendar_btn} ${
                isCalendarActive === true
                  ? styles.calendar_btn_on
                  : styles.calendar_btn_off
              }`}
              onClick={calendarBtnClick}
            >
              Calendar
            </button>
          </div>
          <div className={styles.policy_filter_list_wrapper}>
            {filterList.map((filter, idx) => 
              <PolicyFilterList key={idx} title={filter}/>
            )}
          </div>
        </div>

        {/* pcylist========================================================== */}
        <div className={styles.pcylist}>
          {testdata ? (
            <PcyListItem obj={testdata} onItemClick={handleItemClick} /> // 그냥 리스트 통째로 프롭함
          ) : (
            <h1>loading...</h1>
          )}
        </div>
        {/* pcylist========================================================== */}
      </div>
    </div>
  );
}
