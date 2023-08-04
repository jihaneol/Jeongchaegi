import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Nav from "../../components/Nav";
import { FaBell, IFaBellSlash, FaBars, FaBookmark } from "react-icons/fa";
import Image from "next/image";

import Style from "../../styles/PolicyDetail.module.css";
import LiveChat from "../../components/LiveChat";

export default function Page(props) {
  // const router = useRouter();
  const post = props.post;
  console.log(post);
  // const keys = Object.keys(post);
  // console.log(keys);

  return (
    <div>
      {post ? <>
      
        <Nav />
      <div className={Style.wrap}>
        <div className={Style.container}>
          <div className={Style.title}>
            <div>
              <FaBars />
            </div>
            <div>
              <h3>청년 도약 계좌</h3>
            </div>
            <div className={Style.icon}>
              <div>
                <FaBell />
              </div>
              <div>
                <FaBookmark />
              </div>
            </div>
          </div>
          <div className={Style.making}>
            <div className={Style.ctt_title}>
              {/* <h1>{post.polyBizSjnm}</h1>
              <p>{post.polyItcnCn}</p> */}
            </div>
            <div className={Style.summary}>
              <h2>한 눈에 보는 정책 요약</h2>
            </div>
            <div className={Style.summary_box}>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>정책 번호</div>
                <div className={Style.summary_ctt_right}>{post.id}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>정책 분야</div>
                <div className={Style.summary_ctt_right}>{post.polyRlmCd}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>지원 내용</div>
                <div className={Style.summary_ctt_right}>{post.sporCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>사업 운영 기간</div>
                <div className={Style.summary_ctt_right}>{post.bizPrdCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>사업 신청 기간</div>
                <div className={Style.summary_ctt_right}>{post.rqutPrdCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>지원 규모(명)</div>
                <div className={Style.summary_ctt_right}>{post.sporScvl}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>비고</div>
                <div className={Style.summary_ctt_right}>{post.rqutPrdCn}</div>
              </div>
            </div>
            <div className={Style.summary}>
              <h2>신청자격</h2>
            </div>
            <div className={Style.summary_box}>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>연령</div>
                <div className={Style.summary_ctt_right}>{post.ageInfo}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>거주지 및 소득</div>
                <div className={Style.summary_ctt_right}>{post.prcpCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>학력</div>
                <div className={Style.summary_ctt_right}>{post.accrRqisCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>전공</div>
                <div className={Style.summary_ctt_right}>{post.majrRqisCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>취업 상태</div>
                <div className={Style.summary_ctt_right}>{post.empmSttsCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>특화 분야</div>
                <div className={Style.summary_ctt_right}>
                  {post.splzRlmRqisCn}
                </div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>추가 단서 사항</div>
                <div className={Style.summary_ctt_right}>{post.aditRscn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>참여 제한 대상</div>
                <div className={Style.summary_ctt_right}>
                  {post.prcpLmttTrgtCn}
                </div>
              </div>
            </div>
            <div className={Style.summary}>
              <h2>신청방법</h2>
            </div>
            <div className={Style.summary_box}>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>신청 절차</div>
                <div className={Style.summary_ctt_right}>{post.rqutProcCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>심사 및 발표</div>
                <div className={Style.summary_ctt_right}>{post.jdgnPresCn}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>신청 사이트</div>
                <div className={Style.summary_ctt_right}>{post.rqutUrla}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>제출 서류</div>
                <div className={Style.summary_ctt_right}>{post.pstnPaprCn}</div>
              </div>
            </div>
            <div className={Style.summary}>
              <h2>기타</h2>
            </div>
            <div className={Style.summary_box}>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>기타 유익 정보</div>
                <div className={Style.summary_ctt_right}>{post.etct}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>주관 기관</div>
                <div className={Style.summary_ctt_right}>{post.mngtMson}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>운영 기관</div>
                <div className={Style.summary_ctt_right}>{post.cnsgNmor}</div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>
                  사업관련 참고 사이트1
                </div>
                <div className={Style.summary_ctt_right}>
                  {post.rfcSiteUrla1}
                </div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>
                  사업관련 참고 사이트2
                </div>
                <div className={Style.summary_ctt_right}>
                  {post.rfcSiteUrla2}
                </div>
              </div>
              <div className={Style.summary_ctt}>
                <div className={Style.summary_ctt_left}>첨부파일</div>
                <div className={Style.summary_ctt_right}>??</div>
              </div>
            </div>
          </div>
          {/* <div>
            <Image
              className={Style.img}
              src="/testImg.jpg"
              alt="testImg"
              width={500}
              height={300}
              objectFit="cover"
            />
          </div> */}
          {/* <ul className={Style.content}>
            {keys.map((key) => (
              <li key={key}>
                {key} : {post[key]}
              </li>
            ))}
          </ul> */}
          <div className={Style.chat_box}>
            <div className={Style.chat}>
              <h4>채팅방</h4>
              <LiveChat />
            </div>
          </div>
        </div>
      </div>
      
      </>: false}
      
    </div>
  );
}

// getStaticPaths
export async function getStaticPaths() {
  const paths = [];

  return { paths, fallback: true };
}

// getStaticProps
export async function getStaticProps({ params }) {
  try {
    // 동적 경로의 변수를 이용하여 데이터를 가져옵니다.
    const response = await axios.get(
      `http://3.36.131.236:8081/policies/${params.id}`
    );
    const post = response.data;

    // 데이터가 없는 경우 404 페이지를 보여주도록 처리합니다.
    if (!post) {
      return {
        notFound: true,
      };
    }

    // 데이터를 props로 반환하여 페이지 컴포넌트에 전달합니다.
    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("데이터를 가져오는 중 오류 발생:", error.message);
    return {
      notFound: true, // 데이터를 가져오지 못한 경우 404 페이지를 보여줄 수 있습니다.
    };
  }
}
