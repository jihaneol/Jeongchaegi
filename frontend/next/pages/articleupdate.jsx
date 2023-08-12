import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import Nav from "../components/Nav";
import OurAxios from "../config/ourAxios";
import axios from "axios";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";

const MDEditor = dynamic(
  () => import("@uiw/react-md-editor").then((mod) => mod.default),
  { ssr: false }
);

export default function ArticleUpdate() {
  const [detailData, setDetailData] = useState(null)
  const [mytitle, setTitle] = useState(null);
  const [value, setValue] = useState(null);
  const api = OurAxios();
  const router = useRouter();
  const userData = useSelector(state => state.user);

  // usestate(업데이트 할때 기본 데이터 넣어줘야 함)
  useEffect(() => {
    axios({
      method:'get',
      url: `http://3.36.131.236/api/posts/${router.query.id}`,
    })
    .then((res) => {
      console.log(res);
      setTitle(res.data.title);
      setValue(res.data.content);
      setDetailData(res.data)
    })
    .catch((err)=>{
      console.log(err);
    })
    
  }, []);

  // 함수 목록
  function mySubmit(e) {
    if (localStorage.getItem("userID") != detailData.memberId) {
      alert('수정할 수 없습니다!')
      router.push('/articlelist')
    }
    e.preventDefault();
    if (!mytitle) {
      alert('제목을 입력하세요!')
      return
    }
    else if(!value){
      alert('내용을 입력하세요!')
      return
    }
    api
      .put("/posts", {
        id:router.query.id,
        memberId:localStorage.getItem("userID"),
        title: mytitle,
        content: value,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(()=>{
        router.push('/articlelist')
      })
  }

  function handleTitle(e) {
    const curTitle = e.target.value;
    setTitle(curTitle);
  }

  return (
    <>
      <Nav />
      <div className="container mx-auto mt-24">
        {detailData ? (
          <form onSubmit={mySubmit} className="max-w-3xl mx-auto">
            <div className="mb-4">
              <h1 className="text-2xl font-semibold mb-2">Update Title</h1>
              <input 
                type="text" 
                onChange={handleTitle} 
                value={mytitle} 
                className="w-full border rounded p-2"
                placeholder="Update article title here..."
              />
            </div>
            <div className="mb-4" data-color-mode="dark">
              <MDEditor
                value={value}
                onChange={setValue}
                visibleDragbar={false}
                height={400}
              />
            </div>
            <button className="bg-blue-500 text-white rounded px-4 py-2 hover:bg-blue-600">
              Update
            </button>
          </form>
        ) : (
          <div className="text-center py-8">
            Loading...
          </div>
        )}
      </div>
    </>
  );
}
