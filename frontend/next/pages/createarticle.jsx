import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useState } from "react";
import Nav from "../components/Nav";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);
// 일단 react-md 라이브러리 프리뷰는 주석처리, nextjs에서 말하는 renark라이브러리 써볼거임
// const EditerMarkdown = dynamic(
//   () =>
//     import("@uiw/react-md-editor").then((mod) => {
//       return mod.default.Markdown;
//     }),
//   { ssr: false }
// );
// const Markdown = dynamic(
//   () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
//   { ssr: false }
// );

export default function CreateArticle() {
  const [mytitle, setTitle] = useState("");
  const [value, setValue] = useState("**Hello world!!!**");

  // 함수 목록
  function mySubmit(e) {
    e.preventDefault();
    console.log(mytitle);
    console.log(value);
  }

  function handleTitle(e) {
    const curTitle = e.target.value
    setTitle(curTitle)
  }

  return (
    <>
      <Nav />
      <form style={{ marginTop: "5rem" }} onSubmit={mySubmit}>
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
          {/* <div style={{ paddingTop: 50 }}>
            <Markdown source={value} />
          </div>
          <EditerMarkdown source={value} /> */}
        </div>
        <button>submit</button>
      </form>
    </>
  );
}
