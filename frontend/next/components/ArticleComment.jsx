import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import OurAxios from "../config/ourAxios";
import Image from "next/image";

import { useDispatch, useSelector } from "react-redux";

let page = 1;
let lastpage = 999;

export default function ArticleComment() {
  // state list ==============================================
  const [articleComment, setArticleComment] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [totalComments, setTotalComments] = useState(0);
  // const [updateComment, setUpdateComment] = useState('')
  const router = useRouter();
  const api = OurAxios();

  const userData = useSelector((state) => state.user);

  // effect list ==============================================
  useEffect(() => {
    page = 1;
    lastpage = 999;
  }, []);

  useEffect(() => {
    if (router.query.id) {
      getComment();
    }
  }, [router.query.id]);
  // function list ===================================

  // 댓 리스트 첨에 가져오는 함수, 그리고 페이지 해줌
  // 그냥 전역에 설정해놓은 page 변수 가져와서 씀, 상태관리 따위 안함
  async function getComment() {
    try {
      const res = await axios({
        method: "get",
        url: `http://3.36.131.236/api/comments/${router.query.id}`,
        params: {
          pageIdx: page,
        },
      });

      // 댓글들 가져옴, 근데
      if (res.status === 204) {
        //만약 db에 댓이 없는 상태면 댓없다고 표시하고 막페이지 1을 줌
        setArticleComment(null);
        setTotalComments(0);
        lastpage = 1;
      } else {
        // 댓이 db에 잇으면 for문 돌려서 id가 같거나 작으면 삭제하고 추가함
        const newreply = [...res.data.content]; // 깊은 복사 필요
        if (articleComment.length !== 0 && lastpage !== 999) {
          // 적어도 두번째 요청일 때 / 댓글이 있을때만 자를 필요가 있음
          res.data.content.forEach((element) => {
            if (element.id <= articleComment.slice(-1)[0].id) newreply.shift();
          });
        }
        lastpage = res.data.totalPages; // 일단 막페이지 표시
        if (articleComment){
          setArticleComment((articleComment) => [
            ...articleComment,
            ...newreply,
          ]);
        }
        else setArticleComment([...newreply]);
        setTotalComments(res.data.totalElements);
        if (lastpage > page) {
          // 막페이지가 현재 페이지보다 크면 페이지 +1을 해줌
          page += 1;
        }
      }
      /*
      그러니까 현재 페이지가 막페이지랑 같은데 댓글 목록 요청을 보냈다면 아직 페이지내이션 안쪽에 있다는 뜻,
      그러니까 현재 페이지 값을 추가하면 안됨, 왜냐면 댓글이 5개인데 그 사이 8개가 된 경우,
      아직 나머지 댓글은 1페이지에 생성될 것이기 때문/
  
      댓글 생성시에는 무조건 자기 댓글을 확인해야 함, 원래는 그 하나만 보여줄려 했는데 좀 이상해서 그 사이 생성된 모든 댓 보여줄려고 결정
      즉 댓글 생성시 페이지네이션 무시하고 모든 댓글을 표시
      */
    } catch (err) {
      console.error(err);
    }
  }

  // 댓글 추가 상태관리 함수
  function handleComment(e) {
    setNewComment(e.target.value);
  }

  // 댓 추가하는 함수
  function commentSubmit(e) {
    e.preventDefault();
    // 댓글에 내용 있을때만 추가
    if (newComment.trim()) {
      api
        .post(`/comments`, {
          postId: router.query.id,
          comment: newComment,
        })
        .then((res) => {
          // 댓글을 입력하면 댓글을 몇개 불러오던 자기 댓글을 무조건 확인해야 함
          fetchComment();
        })
        .finally(() => {
          // 마지막은 댓창 비워줌
          setNewComment("");
        });
    }
  }

  function commentDel(cmtid, mbid) {
    // 로컬스토리지는 무조건 스트링, 귀차나서 그냥 암묵적 처리
    if (mbid == localStorage.getItem("userID")) {
      api
        .delete(`/comments/${cmtid}`)
        .then(() => {
          setArticleComment(articleComment.filter((cmt) => cmt.id !== cmtid));
        })
        .catch((err) => {
          alert("delete fail");
        });
    } else alert("다른 사용자의 댓글을 삭제할 수 없습니다.");
  }

  // function handleUserClick(item) {
  //   router.push(`/mypage/${item.nickname}`);
  // }

  function loadReply() {
    getComment();
  }

  async function fetchComment() {
    // 비동기 처리
    while (page < lastpage) {
      // 만약 현재 페이지가 막페이지보다 작으면 댓글 계속 요청
      await getComment();
    }
    if (page === lastpage) await getComment();
  }

  // function commentUpdate(cmtid, mbid) {  // 생각해보니 댓 업뎃이 필요한가...?
  //   if (mbid == localStorage.getItem("userID")) {
  //   }
  //   else alert('cannot delete')
  // }

  // rendering the page ================================
  return (
    <>
      <div className="text-2xl font-bold mb-4">댓글 목록({totalComments})</div>

      {articleComment ? (
        articleComment.map((item, index) => (
          <div
            key={item.id}
            className="flex items-center space-x-4 mb-2 bg-gray-100 p-2 rounded"
          >
            <Image
              src={item.memberImg}
              alt={item.nickname}
              width={24}
              height={24}
              className="rounded-full"
            />
            <p className="font-semibold">{item.nickname}:</p>
            <p className="flex-1 break-all">{item.comment}</p>
            {/* 댓삭버튼 */}
            {userData.isLogined && (localStorage.getItem("userID") == item.memberId) ? 
            <button
              onClick={() => commentDel(item.id, item.memberId)}
              type="button"
              className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Close menu</span>
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button> : false
            }
            {/* <button onClick={()=>commentUpdate(item.id, item.memberId)} className="bg-blue-500 text-white rounded px-2 py-1">
            update comment
          </button> */}
          </div>
        ))
      ) : (
        <div className="bg-red-200 p-4 rounded mt-2">댓글이 없습니다..</div>
      )}

      <button onClick={loadReply}>댓글 불러오기</button>

      {userData.isLogined ? (
        <form onSubmit={commentSubmit} className="mt-4 flex">
          <input
            type="text"
            onChange={handleComment}
            value={newComment}
            className="border p-2 rounded w-full"
            placeholder="Write your comment here..."
          />
          <button className="bg-green-700 text-white rounded w-32 py-2">
            댓글 쓰기
          </button>
        </form>
      ) : (
        <p className="mt-4 text-red-500">댓글을 달려면 로그인 하세요!</p>
      )}
    </>
  );
}
