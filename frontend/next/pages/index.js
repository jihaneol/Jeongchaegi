import { useEffect, useState } from "react";
import HomeCalendar from "../components/HomeCalendar";
import HomeList from "../components/HomeList";
import Nav from "../components/Nav";
import style from "../styles/Home.module.css";
import Modal from "../components/Modal";
import Carousel from "../components/Carousel";

export default function Home() {
  const [modalFlag, setModalFlag] = useState(false);
  const [targetDate, setTargetDate] = useState("");

  const onClose = () => {
    if (modalFlag === true) setModalFlag(false);
  };

  const modalActive = (modalFlag) => {
    setModalFlag(modalFlag);
    console.log(modalFlag);
  };

  const getTargetDate = (dateProps) => {
    setTargetDate(dateProps);
  };

  return (
    <div className={style.all_wrapper}>
      <Nav />
      <Modal modalFlag={modalFlag} onClose={onClose} targetDate={targetDate} />
      <div
        onClick={onClose}
        className={`${modalFlag === true ? style.modal_on : ""}`}
      >
        <Carousel />
        <HomeCalendar modalActive={modalActive} getTargetDate={getTargetDate} />
        <div className={style.outer_wrapper}>
          <HomeList title="마감 임박 정책" />
          <HomeList title="Hot 정책" />
        </div>
      </div>
    </div>
  );
}
