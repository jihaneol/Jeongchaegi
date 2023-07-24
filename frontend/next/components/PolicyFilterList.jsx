import React from "react";
import styles from "../styles/PolicyList.module.css"

export default function PolicyFilterList({title}) {
  return (
    <div className={`form-check ${styles.filter}`}>
      <input
        className="form-check-input"
        type="checkbox"
        value=""
        id="flexCheckDefault"
      />
      <label className="form-check-label" htmlFor="flexCheckDefault">
        {title}
      </label>
    </div>
  );
}
