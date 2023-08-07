import React, { useCallback, useRef, useState, useEffect } from "react";
import useStompClient from "./hooks/useStompClient";
import axios from "axios";

export default function LiveChat(props) {
  const { client, messages, setMessages } = useStompClient(
    "http://localhost:8081/api/policychat",
    `/sub/policychat${props.pageId}`
  );
  // ws://3.36.131.236:8081/api/policy
  // http://localhost:8081/api/policy

  const sendMessage = (messageContent) => {
    if (client && client.connected) {
      const data = {
        message: messageContent,
        memberId: 13,
        nickName: "zzankor",
        policyId: props.pageId,
      };
      client.publish({
        destination: "/pub/policychat",
        body: JSON.stringify(data),
      });
    }
    console.log(typeof messages[0]);
  };

  const onClick = async () => {
    try {
      let data = {
        message: null,
        memberId: null,
        nickName: null,
        cursor: null,
      };

      if (messages && messages.length !== 0) {
        const firstMessage = JSON.parse(messages[0]);
        data = {
          message: firstMessage.message,
          memberId: firstMessage.memberId,
          nickName: firstMessage.nickName,
          cursor: firstMessage.cursor,
        };
      }

      const response = await axios.post(
        `http://localhost:8081/api/chats/${props.pageId}`,
        data
      );
      console.log(response.data);
      setMessages([response.data, ...messages]);
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
        {messages.map((msg, index) => (
          <li key={index}>{JSON.parse(msg).message}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage("super sexy 심경섭!")}>
        Send Message
      </button>
    </div>
  );
}
