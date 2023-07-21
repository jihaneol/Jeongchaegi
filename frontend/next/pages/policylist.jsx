import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import styles from "../styles/policylist.module.css";
import axios from "axios";

export default function PolicyList() {
  // 데이터 테스트용 ===========================================아래쪽

  const [testdata, settest] = useState("");

  function getFakeData() {
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((res) => {
      // console.log(res);
      settest(res.data);
    });
  }
  console.log(testdata);

  function prev(e) {
    e.preventDefault();
    getFakeData();
  }

  useEffect(() => {
    console.log("pcylist component live");
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
            className={`btn btn-outline-secondary btn-danger`}
            onClick={prev}
          >
            Button
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
          {testdata &&
          testdata.map((item) => <li key={item.id}>{item.title}</li>)}
        </div>
        {/* pcylist========================================================== */}
      </div>
    </div>
  );
}
