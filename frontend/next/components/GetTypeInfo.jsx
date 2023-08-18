import { useDispatch, useSelector } from "react-redux";
import style from "./styles/GetTypeInfo.module.css";
import { userActions } from "../store/user";
import { useState } from "react";
import { useEffect } from "react";

export default function GetTypeInfo() {
  const dispatch = useDispatch();
  const [myTypes, setMyTypes] = useState([]);
  
  const types = [
    { index: "023010", name: "일자리" },
    { index: "023020", name: "주거" },
    { index: "023040", name: "복지ㆍ문화" },
    { index: "023050", name: "참여ㆍ권리" },
    { index: "023030", name: "교육" },
  ];

  function onCheck(e) {
    if (e.target.checked === true) {
      setMyTypes([...myTypes, e.target.id]);
    }
    else {
      const newArray = [];
      myTypes.map((type) => {
        if (type !== e.target.id)
          newArray.push(type);
      })
      setMyTypes(newArray);
    }
  }
  
  useEffect(() => {
    dispatch(userActions.setPolicyType(myTypes));
  }, [myTypes])

  return (
    <div className={style.container}>
      <div className={style.type_header}>관심 있는 정책을 골라주세요</div>
      <div className={style.type_content_wrapper}>
        {types.map((item) => (
          <span className={style.type_content} key={item.index}>
            <input id={item.index} type="checkbox" onClick={onCheck}/>
            <label htmlFor={item.index}>{item.name}</label>
          </span>
        ))}
      </div>
    </div>
  );
}
