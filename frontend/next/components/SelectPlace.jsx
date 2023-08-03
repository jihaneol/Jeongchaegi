import React, { useEffect, useState } from "react";

import Style from "./styles/SelectPlace.module.css";

const sido = "";

export default function SelectPlace() {
  const [sidoOptions, setSidoOptions] = useState([]);
  const [gugunOptions, setGugunOptions] = useState([]);
  const gugunList = [
    [
      "강남구",
      "강동구",
      "강북구",
      "강서구",
      "관악구",
      "광진구",
      "구로구",
      "금천구",
      "노원구",
      "도봉구",
      "동대문구",
      "동작구",
      "마포구",
      "서대문구",
      "서초구",
      "성동구",
      "성북구",
      "송파구",
      "양천구",
      "영등포구",
      "용산구",
      "은평구",
      "종로구",
      "중구",
      "중랑구",
    ],
    [
      "계양구",
      "미추홀구",
      "남동구",
      "동구",
      "부평구",
      "서구",
      "연수구",
      "중구",
      "강화군",
      "옹진군",
    ],
    ["대덕구", "동구", "서구", "유성구", "중구"],
    ["광산구", "남구", "동구", "북구", "서구"],
    ["남구", "달서구", "동구", "북구", "서구", "수성구", "중구", "달성군"],
    ["남구", "동구", "북구", "중구", "울주군"],
    [
      "강서구",
      "금정구",
      "남구",
      "동구",
      "동래구",
      "부산진구",
      "북구",
      "사상구",
      "사하구",
      "서구",
      "수영구",
      "연제구",
      "영도구",
      "중구",
      "해운대구",
      "기장군",
    ],
    [
      "고양시",
      "과천시",
      "광명시",
      "광주시",
      "구리시",
      "군포시",
      "김포시",
      "남양주시",
      "동두천시",
      "부천시",
      "성남시",
      "수원시",
      "시흥시",
      "안산시",
      "안성시",
      "안양시",
      "양주시",
      "오산시",
      "용인시",
      "의왕시",
      "의정부시",
      "이천시",
      "파주시",
      "평택시",
      "포천시",
      "하남시",
      "화성시",
      "가평군",
      "양평군",
      "여주군",
      "연천군",
    ],
    [
      "강릉시",
      "동해시",
      "삼척시",
      "속초시",
      "원주시",
      "춘천시",
      "태백시",
      "고성군",
      "양구군",
      "양양군",
      "영월군",
      "인제군",
      "정선군",
      "철원군",
      "평창군",
      "홍천군",
      "화천군",
      "횡성군",
    ],
    [
      "제천시",
      "청주시",
      "충주시",
      "괴산군",
      "단양군",
      "보은군",
      "영동군",
      "옥천군",
      "음성군",
      "증평군",
      "진천군",
      "청원군",
    ],
    [
      "계룡시",
      "공주시",
      "논산시",
      "보령시",
      "서산시",
      "아산시",
      "천안시",
      "금산군",
      "당진군",
      "부여군",
      "서천군",
      "연기군",
      "예산군",
      "청양군",
      "태안군",
      "홍성군",
    ],
    [
      "군산시",
      "김제시",
      "남원시",
      "익산시",
      "전주시",
      "정읍시",
      "고창군",
      "무주군",
      "부안군",
      "순창군",
      "완주군",
      "임실군",
      "장수군",
      "진안군",
    ],
    [
      "광양시",
      "나주시",
      "목포시",
      "순천시",
      "여수시",
      "강진군",
      "고흥군",
      "곡성군",
      "구례군",
      "담양군",
      "무안군",
      "보성군",
      "신안군",
      "영광군",
      "영암군",
      "완도군",
      "장성군",
      "장흥군",
      "진도군",
      "함평군",
      "해남군",
      "화순군",
    ],
    [
      "경산시",
      "경주시",
      "구미시",
      "김천시",
      "문경시",
      "상주시",
      "안동시",
      "영주시",
      "영천시",
      "포항시",
      "고령군",
      "군위군",
      "봉화군",
      "성주군",
      "영덕군",
      "영양군",
      "예천군",
      "울릉군",
      "울진군",
      "의성군",
      "청도군",
      "청송군",
      "칠곡군",
    ],
    [
      "거제시",
      "김해시",
      "마산시",
      "밀양시",
      "사천시",
      "양산시",
      "진주시",
      "진해시",
      "창원시",
      "통영시",
      "거창군",
      "고성군",
      "남해군",
      "산청군",
      "의령군",
      "창녕군",
      "하동군",
      "함안군",
      "함양군",
      "합천군",
    ],
    ["서귀포시", "제주시"],
  ];

  useEffect(() => {
    setSidoOptions([
      { index: 0, value: "서울특별시", code: "003002001" },
      { index: 1, value: "인천광역시", code: "003002004" },
      { index: 2, value: "대전광역시", code: "003002006" },
      { index: 3, value: "광주광역시", code: "003002005" },
      { index: 4, value: "대구광역시", code: "003002003" },
      { index: 5, value: "울산광역시", code: "003002007" },
      { index: 6, value: "부산광역시", code: "003002002" },
      { index: 7, value: "경기도", code: "003002008" },
      { index: 8, value: "강원도", code: "003002009" },
      { index: 9, value: "충청북도", code: "003002010" },
      { index: 10, value: "충청남도", code: "003002011" },
      { index: 11, value: "전라북도", code: "003002012" },
      { index: 12, value: "전라남도", code: "003002013" },
      { index: 13, value: "경상북도", code: "003002014" },
      { index: 14, value: "경상남도", code: "003002015" },
      { index: 15, value: "제주특별자치도", code: "003002016" },
    ]);
  }, []);

  // 선택한 시/도에 따라 구/군 데이터를 가져오는 함수
  const handleSidoChange = (e) => {
    const selectedSido = e.target.value;
    // console.log(selectedSido);
    sido = sidoOptions[e.target.value].code;
    console.log(sido, 'component in');
    // console.log(sidoOptions[e.target.value].code);
    if (selectedSido) {
      const Sido = setGugunOptions(gugunList[selectedSido]);
    } else {
      setGugunOptions([]); // 시/도가 선택되지 않았을 때 구/군 옵션을 초기화합니다.
    }
  };

  return (
    <div className={Style.select_box}>
      <select
        className={Style.select}
        name="sido1"
        id="sido1"
        onChange={handleSidoChange}
      >
        <option value="">시/도 선택</option>
        {sidoOptions.map((option) => (
          <option key={option.index} value={option.index}>
            {option.value}
          </option>
        ))}
      </select>
      <select className={Style.select} name="gugun1" id="gugun1">
        <option value="">구/군 선택</option>
        {gugunOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export { sido };
