import React, { useCallback, useRef, useState, useEffect } from "react";

export default function LiveChat({ pageId }) {
  const [msg, setMsg] = useState("");
  const [name, setName] = useState("");
  const [chat, setChat] = useState([]);
  const [chkLog, setChkLog] = useState(false);
  const [socketData, setSocketData] = useState();

  const ws = useRef(null);

  const msgBox = chat.map((item, idx) => (
    <div key={idx} className={item.name === name ? "me" : "other"}>
      <span>
        <b>{item.name}</b>
      </span>{" "}
      [{item.date}]<br />
      <span>{item.msg}</span>
    </div>
  ));

  useEffect(() => {
    if (socketData != undefined) {
      const tempData = chat.concat(socketData);
      console.log(tempData);
      setChat(tempData);
    }
  }, [socketData]);

  // webSocket
  // webSocket
  const onText = (event) => {
    console.log(event.target.value);
    setMsg(event.target.value);
  };

  const webSocketLogin = useCallback(() => {
    ws.current = new WebSocket(`ws://localhost:8080/policydetail/${pageId}`);

    ws.current.onmessage = (message) => {
      const dataSet = JSON.parse(message.data);
      setSocketData(dataSet);
    };
  }, [pageId]);

  const send = useCallback(() => {
    if (!chkLog) {
      if (name === "") {
        alert("이름을 입력하세요.");
        document.getElementById("name").focus;
        return;
      }
      webSocketLogin();
      setChkLog(true);
    }

    if (msg !== "") {
      const data = {
        name,
        msg,
        date: new Date().toLocaleString(),
      };

      const temp = JSON.stringify(data);

      if (ws.current.readyState === 0) {
        ws.current.onopen = () => {
          console.log(ws.current.readyState);
          ws.current.send(temp);
        };
      } else {
        ws.current.send(temp);
      }
    } else {
      alert("메세지를 입력하세요.");
      document.getElementById("msg").focus();
      return;
    }
    setMsg("");
  });
  // webSocket
  // webSocket

  return (
    <div>
      <div id="chat-wrap">
        <div id="chat">
          <h1 id="title">WebSocket Chatting</h1>
          <br />
          <div id="talk">
            <div className="talk-shadow"></div>
            {msgBox}
          </div>
          <input
            disabled={chkLog}
            placeholder="이름을 입력하세요."
            type="text"
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
          />
          <div id="sendZone">
            <textarea
              id="msg"
              value="msg"
              onChange={onText}
              onKeyDown={(ev) => {
                if (ev.keyCode === 13) {
                  send();
                }
              }}
            ></textarea>
            <input type="button" value="전송" id="btnSend" onClick={send} />
          </div>
        </div>
      </div>
    </div>
  );
}
