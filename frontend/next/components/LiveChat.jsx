import React, { useCallback, useRef, useState, useEffect } from "react";
import useStompClient from "./hooks/useStompClient";

export default function LiveChat(props) {
  const { client, messages } = useStompClient(
    "http://localhost:8081/api/policy",
    `/sub/policychat${props.pageId}`
  );
  // ws://3.36.131.236:8081/api/policy

  const sendMessage = (messageContent) => {
    if (client && client.connected) {
      client.publish({ destination: "/pub/policy", body: messageContent });
    }
  };

  return (
    <div>
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
