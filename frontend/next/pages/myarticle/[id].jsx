import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";
import ArticleListItem from "../../components/ArticleListItem";
import { useRouter } from "next/router";

// 인증 관련
import OurAxios from "../../config/ourAxios";

let page = 1;
let lastPage = 999999;

export default function ArticleList() {
  const [articleData, setArticleData] = useState(null);
  const router = useRouter();
  const api = OurAxios()

  // 시작할때 데이터 받고 시작

  useEffect(()=>{
    page = 1
    lastPage = 999999
    setArticleData([])
      getArticleData()
  }, [])

  // 함수 목록 ===================================================================
  function getArticleData() {
    api.get(`/posts/my?pageIndex=1`)
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
  }

  // 다음 페이지로 이동
  function btnNextPage() {
    page += 1
    getArticleData()
    }

  // 클릭시 게시판상세 페이지로 이동
  function handleItemClick(itemId) {
    router.push(`/articledetail/${itemId}`);
    // Do whatever you want with the clicked item ID
  }

  // 렌더링 되는 곳

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center mt-24 px-4">
        <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg">
          {/* Header section */}
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
