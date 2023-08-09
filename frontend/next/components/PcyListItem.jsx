import React from "react";
import styles from "../styles/PcyListItem.module.css";

export default function PcyListItem({ obj, onItemClick }) {
  // pcylist에서 프롭받은 이벤트 클릭시 부모로 데이터 이동

  return (
    <>
      {obj.map((item, index)=>(
      <div
        className={`card ${styles.card_wrapper}`}
        onClick={() => onItemClick(item.id)}
        key={item.id}
      >
        <div className="card-header">{item.polyBizSjnm}</div>
        <div className="card-body">
          <div>{item.mngtMson}</div>
          <div>{item.cnsgNmor}</div>
          <div>{item.polyItcnCn}</div>
          {item.id}
        </div>
      </div>
      ))}
    </>
  );
}
