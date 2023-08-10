import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Style from "./styles/Carousel.module.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 2000,
    slidesToShow: 1,
    slidesToScroll: 1,
    // fade: true, // 슬라이드 전환 시 페이드 효과
    adaptiveHeight: true, // 슬라이드의 높이에 따라 Carousel의 높이를 동적으로 조절
    autoplay: true, // 자동 재생 활성화
    autoplaySpeed: 3000, // 3초 간격으로 사진 변경
  };

  return (
    <>
      <div className="mx-auto max-w-screen-lg">
        <Slider {...settings}>
          <div
            className={`${Style.carousel_slide} relative w-full h-64 overflow-hidden rounded-lg shadow-lg`}
          >
            <img
              className={`${Style.carousel_slide_img} w-full h-full object-cover`}
              src="/testImg.jpg"
              alt="Image 1"
            />
          </div>
          <div
            className={`${Style.carousel_slide} relative w-full h-64 overflow-hidden rounded-lg shadow-lg`}
          >
            <img
              className={`${Style.carousel_slide_img} w-full h-full object-cover`}
              src="/testImg.jpg"
              alt="Image 2"
            />
          </div>
          <div
            className={`${Style.carousel_slide} relative w-full h-64 overflow-hidden rounded-lg shadow-lg`}
          >
            <img
              className={`${Style.carousel_slide_img} w-full h-full object-cover`}
              src="/testImg.jpg"
              alt="Image 3"
            />
          </div>
          {/* 여러분의 이미지를 계속 추가하세요 */}
        </Slider>
      </div>
    </>
  );
};

export default Carousel;
