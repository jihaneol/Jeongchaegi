import React, { useEffect, useState } from "react";
import OurAxios from "../../config/ourAxios";
import Nav from "../../components/Nav";
import Image from "next/image";
import FollowPage from "../../components/FollowPage";

export default function Follow() {
  const [followNum, setFollowNum] = useState(0);
  const [followList, setFollowList] = useState([]);
  const [showModal, setShowModal] = useState(null);
  const userInfo = [
    {
      refreshToken: "Token",
      userName: "심경섭",
      userAge: 26,
      userCity: "파주",
      userImg: "/testImg.jpg",
      userID: 17,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
    {
      refreshToken: "Token",
      userName: "김창희",
      userAge: 27,
      userCity: "서울",
      userImg: "/testImg.jpg",
      userID: 18,
      userPolicy: [123, 322, 111],
    },
  ];

  // ①팔로우 수 ②팔로우 리스트 받아오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const ourAxios = OurAxios();
        const responseNum = await ourAxios.get("/members/followInfo");
        setFollowNum(responseNum.data);
        const responseList = await ourAxios.get("/members/followeeList");
        setFollowList(responseList.data);
      } catch (error) {
        console.error("There was an error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  const handleFollow = (e) => {
    console.log(e);
  };

  // console.log(followLIst);
  console.log(userInfo);
  return (
    <>
      <Nav />
      <div className="bg-gray-100 min-h-screen p-4 mt-24">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-gray-800">팔로우 리스트</h1>
        </div>
        {userInfo.map((user, index) => {
          return (
            <div
              className="relative flex items-center bg-white p-4 mb-4 rounded-md shadow-sm"
              key={user.userID}
            >
              <Image
                src={user.userImg}
                alt={user.userName}
                width={48}
                height={48}
                className="rounded-full mr-6"
                onMouseEnter={() => setShowModal(index)} // index를 사용하여 어떤 이미지에 대한 모달인지 구분
                // onMouseLeave={() => setShowModal(null)}
              />
              <div className="flex-grow pl-6">
                <div className="font-semibold text-gray-700">
                  {user.userName}
                </div>
                <div className="text-sm text-gray-500">{user.userCity}</div>
              </div>
              <button
                onClick={() => handleFollow(user.userID)}
                className="text-black font-bold bg-gray-200 py-1 px-4 rounded-md"
              >
                팔로잉
              </button>

              {/* Modal */}
              {showModal === index && (
                <div className="absolute top-10 left-20 mt-4 bg-white rounded-md shadow-lg z-10">
                  <FollowPage user={user} />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
}
