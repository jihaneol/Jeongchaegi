import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Nav from "../../components/Nav";
import {
  FaBars,
  FaBookmark,
  FaRegBookmark,
  FaCalendarCheck,
  FaRegCalendar,
} from "react-icons/fa";
import Image from "next/image";

import Head from "next/head";

import Style from "../../styles/PolicyDetail.module.css";
import LiveChat from "../../components/LiveChat";
import OurAxios from "../../config/ourAxios";
import CannotRegistNotice from "../../components/CannotRegistNotice";
import CanRegistNotice from "../../components/CanRegistNotice";
import NoticeModal from "../../components/NoticeModal";
import { useSelector } from "react-redux";

export default function Page(props) {
  const router = useRouter();
  const post = props.post;
  const listId = router.query;
  const api = OurAxios();
  // const keys = Object.keys(post);
  // console.log(keys);

  // 북마크, 유저ID 상태 관리
  const [chkBookmark, setchkBookmark] = useState(null);
  const [userId, setUserId] = useState(null);

  // 알람 상태 관리
  const [chkNotice, setChkNotice] = useState();
  const [registerFlag, setRegisterFlag] = useState(false);
  const [modalFlag, setModalFlag] = useState(false);
  const userData = useSelector(state => state.user);
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [eventID, setEventID] = useState("");

  // 알림 설정 가능 여부
  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");
    console.log("At : ", accessToken);
    console.log("policyDetail: ", userData.isLogined);
    if (!userData.isLogined) {
      console.log("로그아웃 상태");
    } else {
      console.log(listId);
      if (!listId.id) {
        console.log("listId 없음!");
      } else {
        api
          .get(`/events/possible/policies/${listId.id}`, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log(res);
            setChkNotice(res.data);
          })
          .catch((err) => {
            console.log("알림 설정 가능 여부 에러(policy detail)");
            console.log(err);
          });
      }
    }
  }, [userData.isLogined, listId]);

  useEffect(() => {
    // 북마크 체크 확인
    setUserId(localStorage.getItem("userID"));

    if (post && post.id && userId) {
      axios
        .get(
          `http://3.36.131.236/api/scraps/check/members/${userId}/policies/${post.id}`
        )
        .then((response) => {
          setchkBookmark(response.data); // API 응답값을 chkBookmark 상태에 설정합니다.
        })
        .catch((error) => {
          console.error("API 호출 중 오류 발생:", error.message);
        });
    }
  }, [post]); // post가 변경될 때만 이 훅을 실행합니다.

  // 스크랩 제거
  const handleCancelBookmark = () => {
    axios
      .delete(
        `http://3.36.131.236/api/scraps/cancel/members/${userId}/policies/${post.id}`
      )
      .then((response) => {
        setchkBookmark(response.data); // API 응답값을 chkBookmark 상태에 설정합니다.
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error.message);
      });
  };

  // 스크랩 추가
  const handleAddBookmark = () => {
    axios
      .post(
        `http://3.36.131.236/api/scraps/scrap/members/${userId}/policies/${post.id}`
      )
      .then((response) => {
        setchkBookmark(response.data); // API 응답값을 chkBookmark 상태에 설정합니다.
      })
      .catch((error) => {
        console.error("API 호출 중 오류 발생:", error.message);
      });
  };

  function modalClose() {
    if (modalFlag === true) setModalFlag(false);
  }

  function registerSet(val, type) {
    // type : true -> 삭제, false -> 등록
    setModalFlag(val);
    setRegisterFlag(type);
  }

  function getEventID(val) {
    setEventID(val);
  }

  return (
    <div className={modalFlag ? Style.on : ""}>
      {post ? (
        <>
          <Head>
            <title>{post.polyBizSjnm}</title>
          </Head>
          <Nav />
          <div className={`${Style.wrap} max-w-6xl mx-auto p-6`}>
            <div
              className={`${Style.container} flex justify-between items-center mb-6`}
            >
              <div className={`${Style.title} flex items-center`}>
                <FaBars className="text-gray-600 mr-4 cursor-pointer" />
                <h3 className="text-2xl font-semibold">{post.polyBizSjnm}</h3>
                <div className={`${Style.icon} flex items-center`}>
                  {/* 알림 설정 파트 */}
                  {/* 알림 설정 되어 있는지 여부는 여기 파일에서 확인 */}
                  {/* 나머지 작업은 컴포넌트 만들어야 함 */}
                  {!chkNotice ? (
                    <>
                      <CannotRegistNotice className="cursor-pointer" />
                    </>
                  ) : (
                    <div>
                      <CanRegistNotice
                        className="cursor-pointer"
                        postNum={post.id}
                        registerSet={registerSet}
                        refreshFlag={refreshFlag}
                        getEventID={getEventID}
                      />
                      {modalFlag ? (
                        <NoticeModal
                          type={registerFlag}
                          title={post.polyBizSjnm}
                          modalClose={modalClose}
                          setRefreshFlag={setRefreshFlag}
                          eventIdProp={eventID}
                          listIdProp={listId.id}
                        />
                      ) : null}
                    </div>
                  )}
                  {/* 알림 끝 */}
                  {chkBookmark ? (
                    <FaBookmark
                      className="cursor-pointer"
                      onClick={handleCancelBookmark}
                    />
                  ) : (
                    <FaRegBookmark
                      className="cursor-pointer"
                      onClick={handleAddBookmark}
                    />
                  )}
                </div>
              </div>
              <div
                className={`${Style.making} bg-white rounded-lg p-4 shadow h-[desiredValue]`}
              >
                <div className={Style.ctt_title}>
                  <p>{post.polyItcnCn}</p>
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
                    <div className={Style.summary_ctt_right}>
                      {post.polyRlmCd}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>지원 내용</div>
                    <div className={Style.summary_ctt_right}>{post.sporCn}</div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>사업 운영 기간</div>
                    <div className={Style.summary_ctt_right}>
                      {post.bizPrdCn}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>사업 신청 기간</div>
                    <div className={Style.summary_ctt_right}>
                      {post.rqutPrdCn}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>지원 규모(명)</div>
                    <div className={Style.summary_ctt_right}>
                      {post.sporScvl}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>비고</div>
                    <div className={Style.summary_ctt_right}>
                      {post.rqutPrdCn}
                    </div>
                  </div>
                </div>
                <div className={Style.summary}>
                  <h2>신청자격</h2>
                </div>
                <div className={Style.summary_box}>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>연령</div>
                    <div className={Style.summary_ctt_right}>
                      {post.ageInfo}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>거주지 및 소득</div>
                    <div className={Style.summary_ctt_right}>{post.prcpCn}</div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>학력</div>
                    <div className={Style.summary_ctt_right}>
                      {post.accrRqisCn}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>전공</div>
                    <div className={Style.summary_ctt_right}>
                      {post.majrRqisCn}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>취업 상태</div>
                    <div className={Style.summary_ctt_right}>
                      {post.empmSttsCn}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>특화 분야</div>
                    <div className={Style.summary_ctt_right}>
                      {post.splzRlmRqisCn}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>추가 단서 사항</div>
                    <div className={Style.summary_ctt_right}>
                      {post.aditRscn}
                    </div>
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
                    <div className={Style.summary_ctt_right}>
                      {post.rqutProcCn}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>심사 및 발표</div>
                    <div className={Style.summary_ctt_right}>
                      {post.jdgnPresCn}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>신청 사이트</div>
                    <div className={Style.summary_ctt_right}>
                      {post.rqutUrla}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>제출 서류</div>
                    <div className={Style.summary_ctt_right}>
                      {post.pstnPaprCn}
                    </div>
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
                    <div className={Style.summary_ctt_right}>
                      {post.mngtMson}
                    </div>
                  </div>
                  <div className={Style.summary_ctt}>
                    <div className={Style.summary_ctt_left}>운영 기관</div>
                    <div className={Style.summary_ctt_right}>
                      {post.cnsgNmor}
                    </div>
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
              <div className={`max-w-6xl p-6`}>
                <div
                  className={`flex flex-col w-full m-4 mt-0 min-h-[24rem] bg-[#adc4ff]`}
                >
                  <h4>채팅방</h4>
                  <LiveChat pageId={post.id} userId={userId} />
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center min-h-screen">
          <p>Loading...</p>
        </div>
      )}
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
      `http://3.36.131.236:8081/api/policies/${params.id}`
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
