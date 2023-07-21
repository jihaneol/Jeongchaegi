import React from "react";
import styles from '../styles/PcyListItem.module.css'

export default function PcyListItem({ obj, myClick }) {  // pcylist에서 프롭받은 이벤트 클릭시 부모로 데이터 이동

  return (
    <div className={`card ${styles.card_wrapper}`} onClick={() => myClick(obj.id)}>
      <div className="card-header">{obj.id}</div>
      <div className="card-body">
        <div>{obj.title}</div>
        <div>{obj.body}</div>
      </div>
    </div>
  );
}
