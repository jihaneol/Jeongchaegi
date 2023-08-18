import React from "react";
import style from "../styles/Home.module.css";

export default function HomeListItem({ pcyName, pcyDesc }) {
  return (
    <div
      className={`${style.list_content_box} p-4 border bg-gray-100 hover:bg-gray-200 rounded-md shadow-md mb-1 transition duration-200`}
    >
      <div
        className={`${style.list_content_header} text-xl font-semibold mb-2 text-blue-700`}
      >
        {pcyName}
      </div>
      <div className={`${style.list_content_body} text-gray-700`}>
        {pcyDesc}
      </div>
    </div>
  );
}
