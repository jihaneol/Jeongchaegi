import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";

import styles from "../styles/PolicyList.module.css";
import Nav from "../components/Nav";
import PcyListItem from "../components/PcyListItem";

export default function PolicyList() {
  const router = useRouter();
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

  function myClick(id) {
    // 자식 컴포넌트가 위로올린 아이디 데이터랑, 모든 리스트 아이디랑 비교
    testdata.map((item) => {
      item.id === id ? console.log(item.id) : false;
      item.id === id ? router.push(`/policydetail/${item.id}`) : false;
    });
  }

  useEffect(() => {
    // 컴포넌트 생성시 시행, 죽을때 시행
    console.log("pcylist component create");
    getFakeData();
    return () => {
      console.log("pcylist component die");
    };
  }, []);
  // 데이터 테스트용 ===========================================위쪽

  return (
    <div className={styles.wrapper}>
      <Nav />
      {/* 바깥쪽 랩 */}
      <div className={styles.list_wrap}>
        {/* 검색창 */}
        <form action="" className={`input-group mb-3 ${styles.search_query}`}>
          <input
            type="text"
            className="form-control"
            placeholder="search query"
          />
          <button
            className={`btn btn-outline-secondary btn-info`}
            onClick={prev}
          >
            search
          </button>
        </form>
        {/* 조건 검색 */}
        <div className={`form-check ${styles.filter}`}>
          <input
            className="form-check-input"
            type="checkbox"
            value=""
            id="flexCheckDefault"
          />
          <label className="form-check-label" htmlFor="flexCheckDefault">
            Default
          </label>
        </div>

        {/* pcylist========================================================== */}
        <div className={styles.pcylist}>
          {testdata ? (
            testdata.map((item) => (
              <PcyListItem key={item.id} obj={item} myClick={myClick} />
            ))
          ) : (
            <h1>loading...</h1>
          )}
        </div>
        {/* pcylist========================================================== */}
      </div>
    </div>
  );
}
