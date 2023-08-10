import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import OurAxios from "../config/ourAxios";
import axios from "axios";
import { useRouter } from "next/router";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function ArticleUpdate() {
  const [mytitle, setTitle] = useState("");
  const [value, setValue] = useState("");
  const api = OurAxios();
  const router = useRouter()

  // usestate(업데이트 할때 기본 데이터 넣어줘야 함)
  useEffect(() => {
    axios({
      url:`http://3.36.131.236/api/posts/${router.query}`
    })
    .then((res)=>{
      console.log(res);
    })
  }, []);

  // 함수 목록
  function mySubmit(e) {
    e.preventDefault();
    console.log("title :", mytitle);
    console.log("value :", value);
    api
      .post("/posts", {
        title: mytitle,
        content: value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleTitle(e) {
    const curTitle = e.target.value;
    setTitle(curTitle);
  }

  return (
    <>
      <Nav />
      <form onSubmit={mySubmit} style={{ marginTop: "5rem" }}>
        {/* 제목은 그냥 텍스트 */}
        <div className="d-flex">
          <h1>title</h1>
          <input type="text" onChange={handleTitle} value={mytitle} />
        </div>
        {/* md editor */}
        <div data-color-mode="dark">
          <MDEditor
            value={value}
            onChange={setValue}
            visibleDragbar={false}
            height={500}
          />
        </div>
        <button>submit</button>
      </form>
    </>
  );
}
