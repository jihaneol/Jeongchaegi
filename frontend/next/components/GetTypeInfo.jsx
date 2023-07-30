import React, { useEffect, useState } from "react";

import Style from "../styles/GetTypeInfo.module.css";

export default function GetTypeInfo() {
  // 미선택 타입
  const [types, setTypes] = useState([]);
  //선택된 타입
  const [myTypes, setMyTypes] = useState([]);

  useEffect(() => {
    setTypes([
      { index: 0, name: "일자리" },
      { index: 1, name: "주거" },
      { index: 2, name: "복지ㆍ문화" },
      { index: 3, name: "참여ㆍ권리" },
      { index: 4, name: "교육" },
    ]);
  }, []);

  function onClick_left(index) {
    // 새로운 배열을 생성하여 types 상태를 업데이트
    setMyTypes([...myTypes, types.find((type) => type.index === index)]);

    // 새로운 배열을 생성하여 types 상태를 업데이트
    setTypes(types.filter((type) => type.index !== index));
  }

  function onClick_right(index) {
    setTypes([...types, myTypes.find((myType) => myType.index === index)]);

    setMyTypes(myTypes.filter((myType) => myType.index !== index));
  }

  function reset() {
    setTypes([
      { index: 0, name: "일자리" },
      { index: 1, name: "주거" },
      { index: 2, name: "복지ㆍ문화" },
      { index: 3, name: "참여ㆍ권리" },
      { index: 4, name: "교육" },
    ]);

    setMyTypes([]);
  }

  // useEffect(() => {
  //   console.log("미선택 : ", types);
  //   console.log("선택 : ", myTypes);
  // }, [types, myTypes]);

  return (
    <div className={Style.wrap}>
      <div className={Style.container}>
        <div className={Style.range}>
          <input type="range" min="0" max="100" step="50" />
        </div>
        <div>
          <div>
            <h3>관심 유형</h3>
          </div>
          <div>
            관심 있으신 유형을 모두 선택하면 유형 맞춤알림 및 여러가지 혜택을
            받을 수 있어요♥
          </div>
        </div>
        <div className={Style.sup}>
          <span>유형</span>
          <span
            className={Style.move}
            onClick={() => {
              reset();
            }}
          >
            ◆선택재설정
          </span>
        </div>
        <div className={Style.types}>
          <div className={Style.types_left}>
            {types.map((type) => (
              <div key={type.index} className={Style.content}>
                <div>●</div>
                <div>{type.name}</div>
                <div
                  className={Style.move}
                  onClick={() => onClick_left(type.index)}
                >
                  ▶
                </div>
              </div>
            ))}
          </div>
          <div className={Style.types_right}>
            {myTypes.length === 0
              ? null
              : myTypes.map((myType) => (
                  <div key={myType.index} className={Style.content}>
                    <div
                      className={Style.move}
                      onClick={() => onClick_right(myType.index)}
                    >
                      ◀
                    </div>
                    <div>{myType.name}</div>
                    <div>●</div>
                  </div>
                ))}
          </div>
        </div>
      </div>
    </div>
  );
}
