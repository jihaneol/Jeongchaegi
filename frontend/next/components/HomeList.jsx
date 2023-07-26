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
    <div className={style.list_wrapper}>
      <div className={style.list_box}>
        <div className={style.list_header}>{header}</div>
        <div className={style.list_content_wrapper}>
          {contents ? (
            contents
              .filter((content) => content.id < 6)
              .map((content) => (
                <HomeListItem key={content.id} type={title} content={content} />
              ))
          ) : (
            <h5>Loading...</h5>
          )}
        </div>
      </div>
    </div>
  );
}
