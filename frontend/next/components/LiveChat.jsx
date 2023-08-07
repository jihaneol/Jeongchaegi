import React, { useCallback, useRef, useState, useEffect } from "react";
import useStompClient from "./hooks/useStompClient";

export default function LiveChat(props) {
  const { client, messages } = useStompClient(
    "http://localhost:8081/api/policychat",
    `/sub/policychat${props.pageId}`
  );
  // ws://3.36.131.236:8081/api/policy
  // http://localhost:8081/api/policy

  const sendMessage = (messageContent) => {
    if (client && client.connected) {
      const data = {
        message: messageContent,
        memberId: "333",
        nickName: "심경섭",
        policyId: props.pageId,
      };

      client.publish({
        destination: "/pub/policychat",
        body: JSON.stringify(data),
      });
    }
  };

  const onClick = () => {
    return null;
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
          <li key={index}>{msg}</li>
        ))}
      </ul>
      <button onClick={() => sendMessage("Hello from Next.js with STOMP!")}>
        Send Message
      </button>
    </div>
  );
}
