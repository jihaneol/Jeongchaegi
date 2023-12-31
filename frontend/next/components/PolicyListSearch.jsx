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
      className={`input-group px-4 mb-8`}
      onSubmit={submitParams}
    >
      <input
        type="text"
        className="form-control"
        placeholder="Search..."
        onChange={handleQuery}
      />
      <button className={`btn btn-outline-secondary btn-light`}>검색/적용</button>
    </form>
  );
}

export { mySearchQuery };
