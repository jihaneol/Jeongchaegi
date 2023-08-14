import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import OurAxios from '../config/ourAxios'

import { useDispatch, useSelector } from "react-redux";

let page = 1
let lastpage = 999

export default function ArticleComment() {
  // state list ==============================================
  const [articleComment, setArticleComment] = useState([])
  const [newComment, setNewComment] = useState('')
  // const [updateComment, setUpdateComment] = useState('')
  const router = useRouter()
  const api = OurAxios()

  const userData = useSelector((state) => state.user);

  // effect list ==============================================
  useEffect(()=>{
    page = 1
    lastpage = 999
  }, [])
  
  useEffect(()=>{
    if (router.query.id) {
      getComment(page)
    }
  },[router.query.id])
  // function list ===================================

  // 댓 리스트 첨에 가져오는 함수, 그리고 페이지 해줌, 재활용하려 했는디 생각 잘못해서 그냥 더씀
  function getComment(page) {
    axios({
      method:'get',
      url:`http://3.36.131.236/api/comments/${router.query.id}`,
      params:{
        pageIdx:page
      }
    })
    .then((res)=>{
      // 막페이지 가져옴, 근데 
      lastpage = res.data.totalPages
      if (res.status===204) {  //만약 댓이 없는 상태면 댓없다고 표시하고 막페이지 1을 줌
        setArticleComment(null)
        lastpage = 1
      }
      else{  // 댓이 잇으면 리스트 뒷부분에 추가함
        setArticleComment([...articleComment, ...res.data.content])
      }
    })
    .catch((err)=>{
      console.log(err);
    })
  }
  function handleComment(e) {
    setNewComment(e.target.value)
  }

  // 댓 추가하는 함수
  function commentSubmit(e) {
    e.preventDefault()
    // 댓글에 내용 있을때만 추가
    if (newComment.trim()) {
      api.post(`/comments`, {
        postId:router.query.id,
        comment:newComment
      })
      .then((res)=>{
        let newdata = null
        // 만약 댓 추가 요청이 성공했다면
        axios({
          method:'get',
          url:`http://3.36.131.236/api/comments/${router.query.id}`,
          params:{
            pageIdx:lastpage
          }
        })
        .then((res)=>{
          // 댓글 리스트 다시 요청해서 마지막 데이터만 가져옴
          console.log(res.data.content.slice(-1)[0]);
          newdata = res.data.content.slice(-1)[0]
          if (articleComment) {  // 만약 댓이 있었다면 댓 리스트 마지막에 추가
            setArticleComment([...articleComment, newdata])
          }
          else {  // 댓이 없으면 첫댓이니 그냥 추가
            setArticleComment([newdata])
          }
        })
        .catch((err)=>{
          console.log(err);
        })
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{  // 마지막은 댓창 비워줌
        setNewComment('')
      })
    }
  }

  function commentDel(cmtid, mbid) {
    // 로컬스토리지는 무조건 스트링, 귀차나서 그냥 자바스크립트한테 맞김
    if (mbid == localStorage.getItem("userID")) {
      api.delete(`/comments/${cmtid}`)
      .then(()=>{
        console.log('success')
        setArticleComment(articleComment.filter(cmt => cmt.id !== cmtid))
      })
      .catch((err)=>{
        console.log(err);
        alert('delete fail')
      })
    }
    else alert('cannot delete')
  }

  // function commentUpdate(cmtid, mbid) {  // 생각해보니 댓 업뎃이 필요한가...?
  //   if (mbid == localStorage.getItem("userID")) {
  //   }
  //   else alert('cannot delete')
  // }

  // rendering the page ================================    
  return (

    <>
      <div className="text-2xl font-bold mb-4">ArticleComment</div>
      
      {articleComment ? articleComment.map((item, index)=>(
        <div key={item.id} className='flex items-center space-x-4 mb-2 bg-gray-100 p-2 rounded'>
          <p className="font-semibold">{item.nickname}:</p>
          <p className="flex-1">{item.comment}</p>
          <button onClick={()=>commentDel(item.id, item.memberId)} type="button" className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
            <span className="sr-only">Close menu</span>
            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
          {/* <button onClick={()=>commentUpdate(item.id, item.memberId)} className="bg-blue-500 text-white rounded px-2 py-1">
            update comment
          </button> */}
        </div>
      )): 
      <div className="bg-red-200 p-4 rounded mt-2">
        No comments
      </div>}

      {userData.isLogined ? 
      <form onSubmit={commentSubmit} className="mt-4">
        <input 
          type="text" 
          onChange={handleComment} 
          value={newComment} 
          className="border p-2 rounded w-full mb-2"
          placeholder="Write your comment here..."
        />
        <button className="bg-green-500 text-white rounded px-4 py-2">Submit</button>
      </form>
      :
      <p className="mt-4 text-red-500">Login to submit a comment</p>
      }
    </>
  )
}
