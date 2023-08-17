import { useEffect, useState } from "react";
import HomeCalendar from "../components/HomeCalendar";
import HomeList from "../components/HomeList";
import Nav from "../components/Nav";
import style from "../styles/Home.module.css";
import Modal from "../components/Modal";
import Carousel from "../components/Carousel";
import axios from "axios";
import Logout from "../components/Logout";

export default function Home() {
  const [modalFlag, setModalFlag] = useState(false);
  const [targetDate, setTargetDate] = useState("");
  const [isRefresh, setIsRefresh] = useState(false);
  const logout = Logout();

  const onClose = () => {
    if (modalFlag === true) setModalFlag(false);
  };

  const modalActive = (modalFlag) => {
    setModalFlag(modalFlag);
  };

  const getTargetDate = (dateProps) => {
    setTargetDate(dateProps);
  };

  function loginCheck() {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken)
      return ;
    axios({
      method: "get",
      url: "http://www.jeongchaegi.com/api/login/check",
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    }).catch((err) => {
      if (err.response?.status === 401) {
        logout();
        setIsRefresh(prev => !prev);
      }
    })
  }

  useEffect(() => {
    loginCheck();
  }, [isRefresh])

  return (
    <div>
      <Nav />
      <Modal modalFlag={modalFlag} onClose={onClose} targetDate={targetDate} />
      <div
        onClick={onClose}
        className={`${modalFlag === true ? style.modal_on : ""}`}
      >
        <Carousel />
        <HomeCalendar modalActive={modalActive} getTargetDate={getTargetDate} />
        <div
          className={`${style.outer_wrapper} flex justify-center space-x-4 mt-4`}
        >
          <HomeList title="마감 임박 정책" />
          <HomeList title="Hot 정책" />
        </div>
      </div>
    </div>
  );
}
