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
  const [updateComment, setUpdateComment] = useState('')
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

  function getComment(page) {
    axios({
      method:'get',
      url:`http://3.36.131.236/api/comments/${router.query.id}`,
      params:{
        pageIdx:page
      }
    })
    .then((res)=>{
      lastpage = res.data.totalPages
      if (res.status===204) {
        setArticleComment(null)
        lastpage = 1
      }
      else{
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

  function commentSubmit(e) {
    e.preventDefault()
    if (newComment.trim()) {
      api.post(`/comments`, {
        postId:router.query.id,
        comment:newComment
      })
      .then((res)=>{
        let newdata = null
        axios({
          method:'get',
          url:`http://3.36.131.236/api/comments/${router.query.id}`,
          params:{
            pageIdx:lastpage
          }
        })
        .then((res)=>{
          console.log(res.data.content.slice(-1)[0]);
          newdata = res.data.content.slice(-1)[0]
          if (articleComment) {
            setArticleComment([...articleComment, newdata])
          }
          else {
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
      .finally(()=>{
        setNewComment('')
      })
    }
  }

  function commentDel(cmtid, mbid) {
    if (mbid === localStorage.getItem("userID")) {
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

  function commentUpdate(cmtid, mbid) {
    if (mbid === localStorage.getItem("userID")) {
    }
    else alert('cannot delete')
  }

  // rendering the page ================================    
  return (

    <>
      <div className="text-2xl font-bold mb-4">ArticleComment</div>
      
      {articleComment ? articleComment.map((item, index)=>(
        <div key={item.id} className='flex items-center space-x-4 mb-2 bg-gray-100 p-2 rounded'>
          <p className="font-semibold">{item.nickname}:</p>
          <p className="flex-1">{item.comment}</p>
          <button onClick={()=>commentDel(item.id, item.memberId)} className="bg-red-500 text-white rounded px-2 py-1">
            delete comment
          </button>
          <button onClick={()=>commentUpdate(item.id, item.memberId)} className="bg-blue-500 text-white rounded px-2 py-1">
            update comment
          </button>
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
