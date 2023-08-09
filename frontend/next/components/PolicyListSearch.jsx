import React, { useEffect, useState } from "react";
import style from "../styles/PolicyList.module.css";

let mySearchQuery = ""; // 변화 가능 변수

export default function PolicyListSearch({ submitParamsToBack }) {
  useEffect(() => {
    // 시작할때 비움
    mySearchQuery = "";
  }, []);

  function handleQuery(e) {
    // 타겟 바뀌면 그것을 위에 mySearchQuery 변수에 담음, 그리고 맨 아래서 export함
    const curQuery = e.target.value;
    mySearchQuery = curQuery;
  }

  function submitParams(e) {
    e.preventDefault();
    submitParamsToBack();
  }

  return (
    <form
      action=""
      className={`input-group mb-3 ${style.search_query}`}
      onSubmit={submitParams}
    >
      <input
        type="text"
        className="form-control"
        placeholder="search query"
        onChange={handleQuery}
      />
      <button className={`btn btn-outline-secondary btn-light`}>search</button>
    </form>
  );
}

export { mySearchQuery };
