import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Nav from "../../components/Nav";
import PolicyHeader from "../../components/PolicyHeader";

import Styles from "../../styles/PolicyDetail.module.css";
import Test from "../../styles/PolicyTop.module.css";
import LiveChat from "../../components/LiveChat";

export default function Page() {
  const router = useRouter();
  // console.log(router);

  const [testdata, settest] = useState("");

  function getFakeData() {
    // 더미 데이터 요청, 실험용
    axios({
      method: "get",
      url: "https://jsonplaceholder.typicode.com/posts/1",
    }).then((res) => {
      // console.log(res);
      settest(res.data);
    });
  }

  useEffect(() => {
    // 컴포넌트 생성시 시행, 죽을때 시행
    console.log("pcylist component create");
    getFakeData();
    return () => {
      console.log("pcylist component die");
    };
  }, []);

  return (
    <div className={Styles.wrapper}>
      <Nav />
      <div className={Styles.list_wrap}>
        <PolicyHeader />
        {/* 청년 이미지 */}
        <div className={Styles.pcylist}>
          <img src="http://via.placeholder.com/720x400" />
        </div>

        {/* <p>{router.query.id} </p> */}
        <h4>정책 설명</h4>
        <div className={Test.parent}>
          <div className={Test.child}>?????</div>
          <div className={Test.child}>!!!!</div>
        </div>
        <div className={Test.parent}>
          <div className={Test.child}>?????</div>
          <div className={Test.child}>!!!!</div>
        </div>
        <div className={Test.parent}>
          <div className={Test.child}>?????</div>
          <div className={Test.child}>!!!!</div>
        </div>
        <div className={Styles.chat}>
          <h4>채팅방</h4>
          <LiveChat />
        </div>
      </div>
    </div>
  );
}
