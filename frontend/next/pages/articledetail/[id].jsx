import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Nav from "../../components/Nav";

import { remark } from "remark";
import html from "remark-html";
import axios from "axios";

import { useDispatch, useSelector } from "react-redux";
import style from "../../styles/ArticleDetail.module.css";

// 잠깐 테스트용, 나중에 가능하면 ssr로 바꿀거임========================================================

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
// 테스트용 마지막줄 ======================================================================================

export default function Page({ params }) {
  const router = useRouter();
  const [detailData, setDetailData] = useState(null);
  const userData = useSelector((state) => state.user);
  const api = OurAxios();
  console.log(params);

  useEffect(() => {
    axios({
      method: "get",
      url: `http://3.36.131.236/api/posts/${router.query.id}`,
    })
      .then((res) => {
        console.log(res);
        setDetailData(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => {
        console.log("end detail data!");
      });
  }, []);

  // 수정, 삭제 버튼 함수

  function updateArticle() {
    // 다음 같은 사용자가 요청하는가
    if (localStorage.getItem("userID") == detailData.memberId) {
      router.push(`/articleupdate?id=${router.query.id}`);
    } else {
      alert("수정할수 없습니다!!!!!!!!!!");
    }
  }
  function deleteArticle() {
    // 사용자가 같으면 삭제 가능, 다르면 삭제 불가
    console.log(typeof localStorage.getItem("userID"));
    if (localStorage.getItem("userID") == detailData.memberId) {
      api
        .delete(`/posts/${router.query.id}`)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          router.push("/articlelist");
        });
    } else {
      alert("삭제할수 없습니다!!!");
    }
  }

  // 렌더링 태그들...

  return (
    <>
      <Nav />
      <div className="flex flex-col items-center p-4 space-y-6 mt-24">
        <div className="w-full max-w-4xl mt-12">
          {detailData ? (
            <>
              <h1 className="text-4xl font-bold text-center text-black-700 mb-6">
                {detailData.title}
              </h1>
              <div className="bg-white shadow-md p-6 rounded-lg space-y-4">
                <div className="p-4 bg-gray-100 rounded">
                  <EditerMarkdown source={detailData.content} />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-4 text-gray-400">Loading...</div>
          )}

          {userData.isLogined && (
            <div className="mt-6 space-x-4">
              <button
                onClick={updateArticle}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
              >
                수정
              </button>
              <button
                onClick={deleteArticle}
                className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 transition duration-200"
              >
                삭제
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
