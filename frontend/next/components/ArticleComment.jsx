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
          console.log(res.data.slice(-1)[0]);
          newdata = res.data.slice(-1)[0]
        })
        .catch((err)=>{
          console.log(err);
        })
        .finally(()=>{
          if (articleComment) {
            setArticleComment([...articleComment, newdata])
          }
          else {
            setArticleComment([newdata])
          }
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

  // rendering the page ================================    
  return (

    <>
      <div>ArticleComment</div>
      {articleComment ? articleComment.map((item, index)=>(
        <div key={index} className='flex'>
          <p>{item.nickname}:</p>
          <p>{item.comment}</p>
        </div>
      )): 'no comment'}
      {userData.isLogined ? 
      <form onSubmit={commentSubmit}>
        <input type="text" onChange={handleComment} value={newComment}/>
        <button>submit</button>
      </form>
      :
      <p>login to submit comment</p>
      }
      
    </>
  )
}
