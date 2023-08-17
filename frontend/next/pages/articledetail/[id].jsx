import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Nav from "../../components/Nav";

import { remark } from "remark";
import html from "remark-html";
import axios from "axios";
import OurAxios from "../../config/ourAxios";
import ArticleComment from "../../components/ArticleComment";

import { useDispatch, useSelector } from "react-redux";
import style from "../../styles/ArticleDetail.module.css";

// 잠깐 테스트용, 나중에 가능하면 ssr로 바꿀거임========================================================
// 일단 react-md 라이브러리 프리뷰는 주석처리, nextjs에서 말하는 renark라이브러리 써ㅅ기에 주석처리,
// const Markdown = dynamic(
//   () => import("@uiw/react-markdown-preview").then((mod) => mod.default),
//   { ssr: false }
// );

// import "@uiw/react-md-editor/markdown-editor.css";
// import "@uiw/react-markdown-preview/markdown.css";
// import dynamic from "next/dynamic";

// const EditerMarkdown = dynamic(
//   () =>
//     import("@uiw/react-md-editor").then((mod) => {
//       return mod.default.Markdown;
//     }),
//   { ssr: false }
// );
// 테스트용 마지막줄 ======================================================================================

export default function Page({ detailData, contentHtml }) {
  const router = useRouter();
  // const [detailData, setDetailData] = useState(null);
  const userData = useSelector((state) => state.user);
  const api = OurAxios();

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
    if (localStorage.getItem("userID") == detailData.memberId) {
      api
        .delete(`/posts/${router.query.id}`)
        .then((res) => {})
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

  function handleUserClick() {
    router.push(`/mypage/${detailData.nickname}`);
  }

  // 렌더링 태그들...

  return (
    <>
      <Nav />
      {/* 컨텐츠 보여주는 곳 */}
      <div className="flex flex-col items-center p-4 space-y-6 mt-24">
        <div className="w-full max-w-4xl mt-12">
          {detailData ? (
            <>
              <h1 className="text-4xl font-bold text-center text-black-700 mb-6 break-all">
                {detailData.title}
              </h1>
              {/* 사용자, 작성 시간 */}
              <div className="font-bold text-gray-500 m-1">
                <p className="cursor-pointer" onClick={handleUserClick}>
                  <Image
                    src={detailData.memberImg}
                    alt={detailData.nickname}
                    width={24}
                    height={24}
                    className="rounded-full mr-5"
                  />
                  {detailData.nickname} | {detailData.createdAt.slice(0, 10)}{" "}
                  {detailData.createdAt.slice(11)}
                </p>
              </div>
              <hr />
              <div className="bg-white shadow-md p-6 rounded-lg space-y-4">
                <div className="p-4 rounded">
                  {/* tailwind는 브라우저 기본 제공 css 날려먹음, 그래서 그냥 깃헙에 있는 마크다운 스타일 훔쳐옴 */}
                  <div
                    dangerouslySetInnerHTML={{ __html: contentHtml }}
                    className={style.markdown_body}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-4 text-gray-400">Loading...</div>
          )}
          {/* 수정, 삭제 버튼/ 로그인한 사용자한테만 보임/ 근데 다른사람이면 경고 */}
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
        <div className="w-full max-w-4xl">
          <ArticleComment />
        </div>
      </div>
    </>
  );
}

// ssr 적용
export async function getServerSideProps({ params }) {
  try {
    const response = await axios.get(
      `http://www.jeongchaegi.com/api/posts/${params.id}`
    );
    const detailData = response.data;

    // md to html
    const processdContent = await remark()
      .use(html)
      .process(detailData.content);
    const contentHtml = processdContent.toString();
    return {
      props: { detailData, contentHtml },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
}
