import React, { useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import axios from "axios";
import HomeListItem from "./HomeListItem";

export default function HomeList({ title }) {
  const [header, setHeader] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts",
    }).then((res) => {
      setContents(res.data);
    });
  }, []);

  useEffect(() => {
    setHeader(title);
  }, []);

  return (
    <div
      className={`${style.list_wrapper} p-6 bg-gray-200 rounded-lg shadow-lg`}
    >
      <div className={`${style.list_box} mb-4 p-4 rounded-lg`}>
        <div
          className={`${style.list_header} text-2xl font-bold mb-4 text-gray-700`}
        >
          {header}
        </div>
        <div className={`${style.list_content_wrapper} p-4 rounded-lg`}>
          {contents ? (
            contents
              .filter((content) => content.id < 10)
              .map((content) => (
                <HomeListItem key={content.id} type={title} content={content} />
              ))
          ) : (
            <h5 className="text-center text-gray-500">Loading...</h5>
          )}
        </div>
      </div>
    </div>
  );
}
