import React from "react";

export default function ArticleListItem({ obj, onItemClick }) {
  console.log(obj);
  return (
    <>
      {obj.map((item) => (
        <div
          key={item.id}
          onClick={() => onItemClick(item.id)}
          className="flex justify-between items-center p-4 border-b hover:bg-gray-100 cursor-pointer transition duration-200"
        >
          <p className="text-sm text-gray-600">
            제목: {item.title ? item.title : "제목 없음"}
          </p>
          <p className="text-sm text-gray-600">작성자: {item.nickname}</p>
        </div>
      ))}
    </>
  );
}
