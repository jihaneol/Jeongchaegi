import React from 'react';

export default function ArticleListItem({ obj, onItemClick }) {
  console.log(obj);
  return (
    <>
      {obj.map((item) => (
        <div key={item.id} onClick={() => onItemClick(item.id)}>
          <p>{item.title}</p>
        </div>
      ))}
    </>
  );
}
