import React, { useCallback, useRef, useState, useEffect } from "react";
import useStompClient from "./hooks/useStompClient";
import axios from "axios";

export default function LiveChat(props) {
  const [inputMessage, setInputMessage] = useState("");
  const { client, messages, setMessages } = useStompClient(
    "http://localhost:8081/api/policychat",
    `/sub/policychat${props.pageId}`
  );
  // ws://3.36.131.236:8081/api/policy
  // http://localhost:8081/api/policy

  const handleMessage = (e) => {
    setInputMessage(e.target.value);
  };

  const sendMessage = () => {
    if (client && client.connected && inputMessage) {
      const data = {
        message: inputMessage,
        memberId: 13,
        nickname: "zzankor",
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
        `http://localhost:8081/api/chats/${props.pageId}`,
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
    <div>
      <div>
        <button type="button" onClick={onClick}>
          이전 내역
        </button>
      </div>
      <ul>
        {messages.map((msg, index) => {
          let content = typeof msg === "string" ? JSON.parse(msg) : msg;
          return (
            <li key={index}>
              내용: {content.message} ///////시간: {content.createdAt}
            </li>
          );
        })}
      </ul>
      <input
        onChange={handleMessage}
        placeholder="응애~"
        value={inputMessage}
      ></input>
      <button onClick={() => sendMessage("super sexy 심경섭!")}>
        Send Message
      </button>
    </div>
  );
}
