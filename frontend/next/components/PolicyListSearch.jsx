import React from "react";
import styles from "../styles/PolicyList.module.css";

export default function PolicyListSearch() {
  return (
    <form action="" className={`input-group mb-3 ${styles.search_query}`}>
      <input type="text" className="form-control" placeholder="search query" />
      <button className={`btn btn-outline-secondary btn-light`}>
        search
      </button>
    </form>
  );
}