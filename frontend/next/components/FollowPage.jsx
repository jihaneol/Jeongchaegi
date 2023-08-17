import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import OurAxios from "../config/ourAxios";
import Link from "next/link";

export default function FollowPage(props) {
  const user = props.user;
  const [myNickname, setMyNickname] = useState("");
  const [isFollow, setIsFollow] = useState(true);
  const [followInfo, setFollowInfo] = useState({
    follower: 0,
    followee: 0,
    post: 0,
  });
  const router = useRouter();
  const api = OurAxios();

  useEffect(() => {
    // 팔로우 여부 확인 (게시판에서 접근했을 때)
    if ("memberId" in user) {
      api.get(`/members/${user.memberId}/check/follow`).then((res) => {
        setIsFollow(res.data);
      });

      const myData = localStorage.getItem("persist:root");

      if (myData) {
        // 2. 가져온 값을 JavaScript 객체로 변환합니다.
        const parsedValue = JSON.parse(myData);
        const userObject = JSON.parse(parsedValue.user);

        // 3. 변환된 객체에서 "nickname" 값을 추출합니다.
        setMyNickname(userObject.nickname);
      }
    }

    api
      .get(`members/followInfo`, {
        params: { memberid: "memberId" in user ? user.memberId : user.id },
      })
      .then((res) => {
        setFollowInfo(res.data);
      });
  }, []);

  const handleMypage = () => {
    router.push(`/mypage/${user.nickname}`);
  };

  const handleUnFollow = () => {
    api
      .delete(
        "memberId" in user
          ? `/members/${user.memberId}/unFollow`
          : `/members/${user.id}/unFollow`
      )
      .then((res) => {
        setIsFollow(false);
      });
  };

  const handleFollow = () => {
    api
      .post(
        "memberId" in user
          ? `/members/${user.memberId}/follow`
          : `/members/${user.id}/follow`
      )
      .then((res) => {
        setIsFollow(true);
      });
  };

  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <Image
              src={"memberId" in user ? user.memberImg : user.img}
              alt={user.nickname}
              width={52}
              height={52}
              className="rounded-full"
            />
          </div>
          <div>
            <div className="text-lg font-bold">{user.nickname}</div>
            <div className="text-sm text-gray-500">{user.id}</div>
          </div>
        </div>
        <div className="flex justify-between mb-4">
          <div className="text-center mr-2">
            <div className="text-lg font-semibold">
              <Link
                href={
                  "memberId" in user
                    ? `/myarticle/${user.memberId}`
                    : `/myarticle/${user.id}`
                }
              >
                <a className="hover:bg-gray-400 hover:cursor-pointer transition-all duration-300">
                  {followInfo.post}
                </a>
              </Link>
            </div>
            <div className="text-sm text-gray-500">게시글</div>
          </div>
          <div className="text-center mr-2">
            <div className="text-lg font-semibold">{followInfo.followee}</div>
            <div className="text-sm text-gray-500">팔로우</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">{followInfo.follower}</div>
            <div className="text-sm text-gray-500">팔로워</div>
          </div>
        </div>
        <div className="flex justify-center">
          {myNickname === user.nickname ? (
            <button
              onClick={() => handleMypage()}
              className="w-full text-white font-bold bg-gray-500 py-1 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              마이페이지
            </button>
          ) : isFollow ? (
            <button
              onClick={() => handleUnFollow()}
              className="w-full text-white font-bold bg-blue-500 py-1 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              언팔로우
            </button>
          ) : (
            <button
              onClick={() => handleFollow()}
              className="w-full text-white font-bold bg-gray-500 py-1 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              팔로우
            </button>
          )}
        </div>
      </div>
    </>
  );
}
