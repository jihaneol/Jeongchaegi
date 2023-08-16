import Image from "next/image";
import { useRouter } from "next/router";

export default function FollowPage(props) {
  const user = props.user;
  const router = useRouter();

  const visitUserPage = () => {
    router.push(`/mypage/${user.nickname}`);
  };

  return (
    <>
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center mb-4">
          <div className="mr-4">
            <Image
              src={user.img}
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
          <button
            onClick={() => visitUserPage()}
            className="w-full text-white font-bold bg-blue-500 py-1 px-4 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400"
          >
            방문하기
          </button>
        </div>
      </div>
    </>
  );
}
