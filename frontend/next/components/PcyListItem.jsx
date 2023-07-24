import React from "react";
import styles from "../styles/PcyListItem.module.css";

export default function PcyListItem({ obj, onItemClick }) {
  // pcylist에서 프롭받은 이벤트 클릭시 부모로 데이터 이동

  return (
    <>
      {obj.map((item)=>(
      <div
        className={`card ${styles.card_wrapper}`}
        onClick={() => onItemClick(item.id)}
        key={item.id}
      >
        <div className="card-header">{item.id}</div>
        <div className="card-body">
          <div>{item.title}</div>
          <div>{item.body}</div>
        </div>
      </div>
      ))}
    </>
  );
}
