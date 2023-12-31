import React, { useEffect, useState } from "react";
import { FaBell, FaRegBell } from "react-icons/fa";
import OurAxios from "../config/ourAxios";
import axios from "axios";
import { getEventID }from "./GetEventID";

export default function CanRegistNotice({ postNum, registerSet, refreshFlag, getEventIdProps }) {
  const api = OurAxios();
  const [registerFlag, setRegisterFlag] = useState(false); // true 면 등록됨, false 면 등록 안됨

  let eventID = "";

  async function getEventDetail(eventId) {
    const kakaoToken = localStorage.getItem("kakaoToken");
    axios
      .get(
        `https://kapi.kakao.com/v2/api/calendar/event`,
        {
          headers: {
            Authorization: `Bearer ${kakaoToken}`,
          },
          params: {
            event_id: eventId,
          },
        }
      )
      .then((res) => {
        // 200이면 이미 일정 등록되어 있는 경우

        getEventIdProps(eventID);
        setRegisterFlag(true);
      })
      .catch((err) => {
        // 400이면 일정이 없는 것. delete 요청 보내야함.
        api.delete(`/events/${eventId}`).then((res) => {
          setRegisterFlag(false);
        }).catch((err) => {
          if (err.response.status === 500)
            setRegisterFlag(false);
        });
      });
  }

  useEffect(() => {
    async function fetchEventID() {
      try {
        eventID = await getEventID(postNum);
        if (!eventID)
          setRegisterFlag(false);
        else {
          await getEventDetail(eventID[0]);
          await getEventDetail(eventID[1]);
        }
      } catch (error) {
        console.error(error);
      }
    }

    fetchEventID();
  }, [refreshFlag]);

  function onClickImg() {
    registerSet(true, registerFlag);
  }

  return (
    <div>
      {registerFlag ? (
        <div>
          <FaBell className="cursor-pointer" onClick={onClickImg} />
        </div>
      ) : (
        <FaRegBell className="cursor-pointer" onClick={onClickImg} />
      )}
    </div>
  );
}
