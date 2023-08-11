import React from 'react';

export default function ArticleListItem({ obj, onItemClick }) {
  console.log(obj);
  return (
    <>
      {obj.map((item) => (
        <div key={item.id} onClick={() => onItemClick(item.id)} className='d-flex'>
          <p>제목 : {item.title ? item.title : '제목 없음'}/</p>
          <p>작성자 : {item.nickname}</p>
        </div>
      ))}
    </>
  );
}
