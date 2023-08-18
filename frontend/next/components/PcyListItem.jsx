import React from "react";
import styles from "../styles/PcyListItem.module.css";

export default function PcyListItem({ obj, onItemClick }) {
  // pcylist에서 프롭받은 이벤트 클릭시 부모로 데이터 이동

  return (
    <>
      {obj?.map((item, index) => (
        <div
          className="border rounded-lg overflow-hidden shadow-lg cursor-pointer mb-4 transition-transform transform hover:scale-105"
          onClick={() => onItemClick(item.id)}
          key={item.id}
        >
          {/* 제목 */}
          <div className="bg-gray-800 text-white text-lg font-semibold p-4">
            {item.polyBizSjnm}
          </div>
          {/* 요약 내용 */}
          <div className="p-4 bg-white">
            <div className="mb-2">{item.polyItcnCn}</div>
            {/* 기타 내용 */}
            {item.rqutPrdBegin && (
              <div className="mb-2">
                <p className="text-sm font-medium">
                  신청 기간 : {item.rqutPrdBegin} ~ {item.rqutPrdEnd}
                </p>
              </div>
            )}
            <div className="mb-2">
              <p className="text-sm font-medium">
                나이 : {item.minAge} ~ {item.maxAge}
              </p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium">분야 : {item.type}</p>
            </div>
            <div className="mb-2">
              <p className="text-sm font-medium">지역 : {item.region}</p>
            </div>
            <p
              className={`${
                item.isOngoing ? "text-green-500" : "text-red-500"
              } font-semibold`}
            >
              {item.isOngoing ? "신청 가능" : "신청 불가능"}
            </p>
          </div>
        </div>
      ))}
    </>
  );
}
