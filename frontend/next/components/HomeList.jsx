import React, { useEffect, useState } from "react";
import style from "../styles/Home.module.css";
import axios from "axios";
import HomeListItem from "./HomeListItem";
import { FaFire } from "react-icons/fa";

export default function HomeList({ title }) {
  const [header, setHeader] = useState("");
  const [contents, setContents] = useState("");

  useEffect(() => {
    let isMounted = true; // 컴포넌트가 마운트되었는지 여부를 추적합니다.

    axios({
      method: "get",
      url: "http://jeongchaegi.com/api/scraps/hot",
    }).then((res) => {
      if (isMounted) {
        // 컴포넌트가 여전히 마운트되어 있다면 상태를 설정합니다.
        setContents(res.data);
      }
    });

    return () => {
      isMounted = false; // 컴포넌트가 언마운트될 때 플래그를 false로 설정합니다.
    };
  }, []);

  useEffect(() => {
    setHeader(title);
  }, []);

  return (
    <div className={`${style.list_wrapper} p-6 rounded-lg shadow-lg`}>
      <div className={`${style.list_box} mb-4 p-4 rounded-lg`}>
        <div
          className={`${style.list_header} text-2xl font-bold mb-4 text-gray-700`}
        >
          {header} <FaFire />
        </div>
        <div className={`${style.list_content_wrapper} p-4 rounded-lg`}>
          {contents ? (
            contents.map((content) => (
              <HomeListItem
                key={content.polyBizSjnm}
                pcyName={content.polyBizSjnm}
                pcyDesc={content.polyItcnCn}
              />
            ))
          ) : (
            <h5 className="text-center text-gray-500">Loading...</h5>
          )}
        </div>
      </div>
    </div>
  );
}
