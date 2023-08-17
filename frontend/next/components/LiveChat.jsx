import React, { useCallback, useRef, useState, useEffect } from "react";
import useStompClient from "./hooks/useStompClient";
import axios from "axios";

export default function LiveChat(props) {
  const [inputMessage, setInputMessage] = useState("");
  const { client, messages, setMessages } = useStompClient(
    "http://www.jeongchaegi.com/ws/policychat",
    `/sub/policychat${props.pageId}`
  );
  // "http://3.36.131.236/ws/policychat", 서버
  // "http://localhost:8081/ws/policychat", 로컬
  // "http://www.jeongchaegi.com/ws/policychat", 정채기

  useEffect(() => {
    handlePreMessage();
  }, []);

  const textareaRef = useRef(null); // 웹소켓 채팅입력
  // 채팅입력 높이 조절 함수
  const handleTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"; // 늘어난 scrollHeight를 초기화하는 기능
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleMessage = (e) => {
    setInputMessage(e.target.value);
    handleTextareaHeight();
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      // 엔터 키를 눌렀을 때 (Shift + Enter를 누르지 않았을 경우)
      sendMessage();
    }
  };

  const sendMessage = () => {
    if (
      client &&
      client.connected &&
      inputMessage.trim().length > 0 &&
      props.userId
    ) {
      const data = {
        message: inputMessage,
        memberId: props.userId,
        nickname: localStorage.getItem("userName"),
        policyId: props.pageId,
      };
      client.publish({
        destination: "/pub/policychat",
        body: JSON.stringify(data),
      });
    }
    setInputMessage("");
  };

  const handlePreMessage = async () => {
    try {
      let data = {
        message: null,
        memberId: null,
        nickname: null,
        cursor: null,
      };
      // let data = null;

      if (messages && messages.length !== 0) {
        const firstMessage =
          typeof messages[0] === "string"
            ? JSON.parse(messages[0])
            : messages[0];

        data = {
          message: firstMessage.message,
          memberId: firstMessage.memberId,
          nickname: firstMessage.nickname,
          cursor: firstMessage.createdAt,
        };

        console.log(firstMessage);
      }

      // console.log(data);
      const response = await axios.post(
        `http://www.jeongchaegi.com/api/chats/${props.pageId}`,
        data
      );
      // console.log(response.data); // 객체 배열
      if (response.data.length !== 0)
        setMessages([...response.data, ...messages]);
      // console.log(messages);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };
  // `http://www.jeongchaegi.com/api/chats/${props.pageId}`, 정채기
  // `http://3.36.131.236/api/chats/${props.pageId}`, 서버
  // `http://localhost:8081/api/chats/${props.pageId}`, 로컬

  return (
    <div className="bg-gray-100 min-h-screen p-5 h-96">
      <div className="mb-4">
        <button
          type="button"
          onClick={handlePreMessage}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          이전 내역
        </button>
      </div>
      <ul className="bg-white shadow-md rounded p-4 mb-4 overflow-y-auto max-h-96">
        {messages.map((msg, index) => {
          let content = typeof msg === "string" ? JSON.parse(msg) : msg;

          const currentDate = content.createdAt.split(" ")[0];
          const prevDate =
            index > 0
              ? (typeof messages[index - 1] === "string"
                  ? JSON.parse(messages[index - 1])
                  : messages[index - 1]
                ).createdAt.split(" ")[0]
              : null;

          console.log(typeof content.createdAt);
          const timePart = content.createdAt.split(" ")[1];
          const [hours, minutes] = timePart.split(":");
          const timeString = `${hours}:${minutes}`;
          const isCurrentUser = content.memberId == props.userId;
          return (
            <>
              {index === 0 || (prevDate && currentDate !== prevDate) ? (
                <li className="text-center mb-2 text-gray-400">
                  ---------------------------{currentDate}
                  ---------------------------
                </li>
              ) : null}
              <li key={index} className="mb-2">
                <div
                  className={
                    isCurrentUser
                      ? "flex justify-end items-end"
                      : "flex items-end"
                  }
                >
                  {isCurrentUser && (
                    <span className="text-gray-500 text-xs mr-2">
                      {timeString}
                    </span>
                  )}
                  <div
                    className={
                      isCurrentUser
                        ? "bg-yellow-100 text-gray-700 p-2 rounded-bl rounded-tl rounded-tr max-w-xs"
                        : "bg-gray-200 text-gray-700 p-2 rounded-br rounded-tr rounded-tl max-w-xs"
                    }
                  >
                    {content.message}
                  </div>
                  {!isCurrentUser && (
                    <span className="text-gray-500 text-xs ml-2">
                      {timeString}
                    </span>
                  )}
                </div>
              </li>
            </>
          );
        })}
      </ul>
      <div className="flex items-center">
        <textarea
          ref={textareaRef}
          onChange={handleMessage}
          onKeyDown={handleKeyDown} // 엔터도 허용
          placeholder="로그인 후 이용가능!!"
          value={inputMessage}
          className="flex-grow p-2 rounded border focus:outline-none focus:border-blue-500 mr-2 overflow-hidden"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none "
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
