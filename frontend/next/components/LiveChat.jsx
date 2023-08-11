import React, { useCallback, useRef, useState, useEffect } from "react";
import useStompClient from "./hooks/useStompClient";
import axios from "axios";

export default function LiveChat(props) {
  const [inputMessage, setInputMessage] = useState("");
  const { client, messages, setMessages } = useStompClient(
    "http://3.36.131.236/ws/policychat",
    `/sub/policychat${props.pageId}`
  );
  // ws://3.36.131.236/api/policychat
  // http://localhost/api/policychat

  const handleMessage = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {
    if (client && client.connected && inputMessage && props.userId) {
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

  const onClick = async () => {
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

      console.log(data);
      const response = await axios.post(
        `http://3.36.131.236/api/chats/${props.pageId}`,
        data
      );
      console.log(response.data); // 객체 배열
      if (response.data.length !== 0)
        setMessages([...response.data, ...messages]);
      console.log(messages);
    } catch (error) {
      console.error("Error sending POST request:", error);
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen p-5 h-96">
      <div className="mb-4">
        <button
          type="button"
          onClick={onClick}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-700 focus:outline-none"
        >
          이전 내역
        </button>
      </div>
      <ul className="bg-white shadow-md rounded p-4 mb-4 overflow-y-auto max-h-150">
        {messages.map((msg, index) => {
          let content = typeof msg === "string" ? JSON.parse(msg) : msg;
          console.log(typeof content.createdAt);
          const timePart = content.createdAt.split(" ")[1];
          const [hours, minutes] = timePart.split(":");

          const timeString = `${hours}:${minutes}`;

          const isCurrentUser = content.memberId === props.userId;
          return (
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
          );
        })}
      </ul>
      <div className="flex items-center">
        <input
          onChange={handleMessage}
          placeholder="채팅을 입력해주세요!!"
          value={inputMessage}
          className="flex-grow p-2 rounded border focus:outline-none focus:border-blue-500 mr-2"
        />
        <button
          onClick={sendMessage}
          className="bg-green-500 text-white p-2 rounded hover:bg-green-700 focus:outline-none"
        >
          Send Message
        </button>
      </div>
    </div>
  );
}
