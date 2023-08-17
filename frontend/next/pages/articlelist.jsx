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
  const router = useRouter();
  const userData = useSelector((state) => state.user);
  const [searchData, setSearchData] = useState('')
  const [isloading, setisloading] = useState(false)

  // 시작할때 데이터 받고 시작

  useEffect(()=>{
    page = 1
    lastPage = 999999
    console.log(router.query);
    setArticleData([])
    setisloading(true)
    if (router.query.keyword) {
      getSearchData()
    }
    else{
      getArticleData()
    }
  }, [router.query])

  // 함수 목록 ===================================================================
  function getArticleData() {
    axios({
      method: "get",
      url: "http://www.jeongchaegi.com/api/posts",
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
        // console.log("finish article list request!!!!");
        setisloading(false)
      });
  }

  // api를 나눠놓아서 부득이하게 함수도 나눔;;;;
  function getSearchData() {
    axios({
      method: "get",
      url: "http://www.jeongchaegi.com/api/posts/search",
      params: {
        pageIndex: page,
        keyword:router.query.keyword
      },
    })
      .then((res) => {
        if (res.data.totalPages === 0) {
          lastPage = 1
        }
        else{
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
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        // console.log("finish article list request!!!!");
        setisloading(false)
      });
  }


  // 다음 페이지로 이동
  function btnNextPage() {
    setisloading(true)
    if (!router.query.keyword && page < lastPage) {
      page += 1
      getArticleData()
    }
    else if (router.query.keyword && page < lastPage){
      page += 1
      getSearchData()
    }
  }

  // 클릭시 게시판상세 페이지로 이동
  function handleItemClick(itemId) {
    router.push(`/articledetail/${itemId}`);
    // Do whatever you want with the clicked item ID
  }

  function myPageRoute() {
    userData.isLogined
      ? router.push(`/createarticle`)
      : (() => {
          alert("로그인이 필요한 페이지입니다.");
          router.push("/login");
        })();
  }

  // 게시판 검색 기능
  function articleSearch(e) {
    e.preventDefault()
    if (searchData.trim()) {
      router.push({
        pathname:'articlelist',
        query:{
          keyword:searchData.trim()
        },
      })
    }
    else{
      router.push({
        pathname:'articlelist',
      })
    }
    setSearchData('')
  }

  // 렌더링 되는 곳

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center mt-24 px-4">
        <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg">
          {/* Header section */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            {/* gpt님이 만들어주신 개이쁜 검색창 */}
            <form className="relative" onSubmit={articleSearch}>
              <input
                type="text"
                placeholder="Search..."
                className="border rounded-md pl-10 pr-4 py-2 w-full focus:outline-none focus:border-blue-300"
                onChange={e=>setSearchData(e.target.value)}
                value={searchData}
              />
              <svg
                className="absolute left-2 top-1/2 transform -translate-y-1/2 w-6 h-6 text-gray-400"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-6a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </form>
            <button
              onClick={myPageRoute}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              글쓰기
            </button>
          </div>

          {/* Article List / table*/}
          {articleData ? (
            <table className="mb-6 table-fixed w-full">
              <thead>
                <tr>
                  <th className="w-7/12 px-2 py-2 border-b border-gray-300">제목</th>
                  <th className="w-2/12 px-2 py-2 border-b border-gray-300">작성자</th>
                  <th className="w-3/12 pl-6 py-2 border-b border-gray-300">작성일</th>
                </tr>
              </thead>
              <tbody>
                <ArticleListItem
                  obj={articleData}
                  onItemClick={handleItemClick}
                />
              </tbody>
            </table>
          ) : (
            <div className="text-center py-4 text-gray-400">Loading...</div>
          )}
          {isloading ? 'loading' : false}
          {lastPage !== page ? (
            <div>
              <button
                onClick={btnNextPage}
                className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
              >
                다음 페이지
              </button>
            </div>
          ) : (
            false
          )}
        </div>
      </div>
    </>
  );
}
