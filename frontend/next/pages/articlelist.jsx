import React, { useEffect, useState } from "react";
import Nav from "../components/Nav";
import Link from "next/link";
import ArticleListItem from "../components/ArticleListItem";
import axios from "axios";
import { useRouter } from "next/router";

// 인증 관련
import { useDispatch, useSelector } from "react-redux";

let page = 1;
let lastPage = 999999;

export default function ArticleList() {
  const [articleData, setArticleData] = useState(null);
  const router = useRouter()
  const userData = useSelector(state => state.user);

  // 시작할때 데이터 받고 시작
  useEffect(() => {
    page = 1;
    lastPage = 999999;
    getArticleData(page);
  }, []);
  
  // 함수 목록 ===================================================================
  function getArticleData(page) {
    axios({
      method: "get",
      url: "http://3.36.131.236/api/posts",
      params: {
        pageIndex: page,
      },
    })
      .then((res) => {
        if (!articleData) {
          lastPage = res.data.totalPages;
          setArticleData([...res.data.content]);
        } else {
          lastPage = res.data.totalPages;
          setArticleData((articleData) => [
            ...articleData,
            ...res.data.content,
          ]);
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("finish article list request!!!!");
      });
  }

  function btnNextPage() {
    if (page < lastPage) {
      page += 1;
      getArticleData(page);
    }
  }

  function handleItemClick(itemId) {
    router.push(`/articledetail/${itemId}`);
    // Do whatever you want with the clicked item ID
  }

  function myPageRoute() {
    userData.isLogined ? (router.push(`/createarticle`)) : (() => {
      alert("로그인이 필요한 페이지입니다.");
      router.push("/login")
    })();
  }

  // 렌더링 되는 곳

  return (
    <>
      <Nav />
      <div style={{ marginTop: "5rem" }}>articlelist</div>
      {/* 게시글 리스트 */}
      {articleData ? <ArticleListItem obj={articleData} onItemClick={handleItemClick} /> : 'loading...'}
      <button onClick={btnNextPage}>more data</button>
      <br />
      {/* 게시글 생성 페이지로 이동 */}
      <button onClick={myPageRoute}>create</button>

    </>
  );
}
