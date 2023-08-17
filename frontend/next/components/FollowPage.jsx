import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import OurAxios from "../config/ourAxios";

export default function FollowPage(props) {
  const user = props.user;
  const [isFollow, setIsFollow] = useState(true);
  const router = useRouter();
  const api = OurAxios();

  useEffect(() => {
    // 팔로우 여부 확인 (게시판에서 접근했을 때)
    if ("memberId" in user) {
      api
        .get(`/members/${user.memberId}/check/follow`)
        .then((res) => {
          setIsFollow(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  const handleUnFollow = () => {
    api
      .delete(
        "memberId" in user
          ? `/${user.memberId}/unFollow`
          : `/${user.id}/unFollow`
      )
      .then((res) => {
        setIsFollow(res.data);
        console.log("언팔로우");
      })
      .catch((err) => {
        console.log(err);
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
        setIsFollow(res.data);
        console.log("팔로우");
      })
      .catch((err) => {
        console.log(err);
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
            <div className="text-lg font-semibold">450</div>
            <div className="text-sm text-gray-500">게시글</div>
          </div>
          <div className="text-center mr-2">
            <div className="text-lg font-semibold">3923만</div>
            <div className="text-sm text-gray-500">팔로우</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-semibold">29</div>
            <div className="text-sm text-gray-500">팔로잉</div>
          </div>
        </div>
        <div className="flex justify-center">
          {isFollow ? (
            <button
              onClick={() => handleUnFollow()}
              className="w-full text-white font-bold bg-blue-500 py-1 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
            >
              팔로잉
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
