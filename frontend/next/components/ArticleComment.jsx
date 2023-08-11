import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import OurAxios from '../config/ourAxios'

import { useDispatch, useSelector } from "react-redux";

let page = 1

export default function ArticleComment() {
  // state list ==============================================
  const [articleComment, setArticleComment] = useState([])
  const [newComment, setNewComment] = useState('')
  const router = useRouter()
  const api = OurAxios()

  const userData = useSelector((state) => state.user);

  // effect list ==============================================
  useEffect(()=>{
    if (router.query.id) {
      getComment()
    }
  },[router.query.id])

  // function list ===================================

  function getComment() {
    axios({
      method:'get',
      url:`http://3.36.131.236/api/comments/${router.query.id}`,
      params:{
        pageIdx:page
      }
    })
    .then((res)=>{
      if (res.status===204) {
        setArticleComment(null)
      }
      else{
        console.log(res.data.content);
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
    console.log(newComment);
    if (newComment.trim()) {
      api.post(`/comments`, {
        postId:router.query.id,
        comment:newComment
      })
      .then((res)=>{
        console.log(res);
      })
      .catch((err)=>{
        console.log(err);
      })
      .finally(()=>{
        const newdata = {
          nickname:localStorage.getItem('userName'),
          comment:newComment,
          memberId:localStorage.getItem('userID'),
        }
        if (articleComment) setArticleComment([...articleComment, newdata])
        else setArticleComment([newdata])
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
