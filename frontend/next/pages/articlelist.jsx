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
        // console.log("finish article list request!!!!");
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
    userData.isLogined
      ? router.push(`/createarticle`)
      : (() => {
          alert("로그인이 필요한 페이지입니다.");
          router.push("/login");
        })();
  }

  // 렌더링 되는 곳

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center mt-24 px-4">
        <div className="w-full max-w-4xl bg-white shadow-md p-6 rounded-lg">
          {/* Header section */}
          <div className="flex justify-between items-center mb-6 border-b pb-4">
            <h1 className="text-2xl font-semibold">Article List</h1>
            <button
              onClick={myPageRoute}
              className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
            >
              Create
            </button>
          </div>

          {/* Article List */}
          {articleData ? (
            <div className="mb-6">
              <ArticleListItem
                obj={articleData}
                onItemClick={handleItemClick}
              />
            </div>
          ) : (
            <div className="text-center py-4 text-gray-400">Loading...</div>
          )}

          <button
            onClick={btnNextPage}
            className="w-full bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 transition duration-200"
          >
            More Data
          </button>
        </div>
      </div>
    </>
  );
}
