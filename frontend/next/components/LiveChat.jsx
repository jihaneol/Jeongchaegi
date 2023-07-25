import { useState, useEffect } from "react";

import Style from "../styles/PolicyDetail.module.css";

const LiveChat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const messageList = messages.map((msg) => <li>{msg}</li>);

  const onChange = (event) => {
    setMessage(event.target.value);
  };

  const onClick = () => {
    setMessages((preMessages) => [...preMessages, message]);
    setMessage("");
  };

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/api/socket");

    socket.onopen = () => {
      console.log("WebSocket connection established.");
      socket.send("Hello, WebSocket!");
    };

    socket.onmessage = (event) => {
      console.log("Message from server:", event.data);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div className={Style.chat_wrapper}>
      <h1>WebSockets Demo</h1>
      <div id="status">Connecting...</div>

      <ul id="messages">{messageList};</ul>

      <form onSubmit={onClick}>
        <div className={Style.chat_textarea}>
          <textarea
            value={message}
            onChange={onChange}
            id="message"
            placeholder="Write your message here..."
            required
          ></textarea>
        </div>
        <button type="submit">Send Message</button>
        <button type="reset">Close Connection</button>
      </form>
    </div>
  );
};

export default LiveChat;
