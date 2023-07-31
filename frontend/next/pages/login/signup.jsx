import React, { useState } from 'react'
import style from "../../styles/Signup.module.css"

export default function signup() {
  const [onOff, setOnOff] = useState(false);
  function change() {
    console.log(onOff);
    setOnOff(prev => !prev);
  }
  return (
    
    <div className={style.all_wrapper}>
      <button onClick={change}>클릭!</button>
      <div className={onOff === false ? style.test1 : style.test2}>Test</div>
      </div>
  )
}
