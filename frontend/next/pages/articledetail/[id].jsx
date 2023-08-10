import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";

import { remark } from 'remark';
import html from 'remark-html';
import axios from "axios";

// 잠깐 테스트용

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

import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";


const EditerMarkdown = dynamic(
  () =>
    import("@uiw/react-md-editor").then((mod) => {
      return mod.default.Markdown;
    }),
  { ssr: false }
);
// 테스트용 마지막줄

export default function Page({ params }) {
  const router = useRouter()
  const [detailData, setDetailData] = useState(null)
  console.log(params);

  useEffect(()=>{
    axios({
      method:'get',
      url:`http://3.36.131.236/api/posts/${router.query.id}`,
    })
    .then((res)=>{
      console.log(res);
      setDetailData(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
    .finally(()=>{
      console.log('end detail data!');
    })
  }, [])

  return (
    <>
      <Nav />
      <div style={{ marginTop: "5rem" }}>{router.query.id}</div>
      {detailData ? 
      <>
        <div>title : {detailData.title} </div>
        <EditerMarkdown source={detailData.content} />
      </> : false}
    </>
    );
}
