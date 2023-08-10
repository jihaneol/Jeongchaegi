import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";

import { remark } from 'remark';
import html from 'remark-html';
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";

// 잠깐 테스트용, 나중에 가능하면 ssr로 바꿀거임

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
import OurAxios from "../../config/ourAxios";


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
  const userData = useSelector(state => state.user);
  const api = OurAxios();
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

  // 수정, 삭제 버튼 함수

  function updateArticle() {
    if (localStorage.getItem("userID") == detailData.memberId){
      router.push(`/articleupdate?id=${router.query.id}`)
    }
    else{
      alert('수정할수 없습니다!!!!!!!!!!')
    }
  }
  function deleteArticle() {
    console.log(typeof localStorage.getItem("userID"));
    if (localStorage.getItem("userID") == detailData.memberId) {
      api.delete(`/posts/${router.query.id}`)
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        router.push('/articlelist')
      })
    }
    else{
      alert('삭제할수 없습니다!!!')
    }
  }

  // 렌더링 태그들...

  return (
    <>
      <Nav />
      <div style={{ marginTop: "120px" }}>{router.query.id}</div>
      {detailData ? 
      <>
        <div>title : {detailData.title} </div>
        <EditerMarkdown source={detailData.content} />
      </> : false}
      {/* {userData.isLogined ? <>
        <button onClick={updateArticle}>수정</button>
        <br />
        <button onClick={deleteArticle}>삭제</button>
      </> : false} */}
      <button onClick={updateArticle}>수정</button>
      <br />
      <button onClick={deleteArticle}>삭제</button>
    </>
    );
}
