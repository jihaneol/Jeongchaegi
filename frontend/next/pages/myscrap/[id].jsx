import React from 'react'
import Nav from '../../components/Nav'
import style from "../../styles/MyScrap.module.css"
import OurAxios from '../../config/ourAxios'
import { useState } from 'react';
import { useEffect } from 'react';
import Spin from "../../components/Spin"

export default function MyScrap () {
	const api = OurAxios();
	let page = 1;

	// state
	const [myScrap, setMyScrap] = useState([]);
	const [isLoading, setIsLoading] = useState(true);

	// function
	function getData() {
		const id = localStorage.getItem("userID");
		api.get(`/scraps/my-scrap/members/${id}/`, {
			params: {
				pageIndex: page,
			}
		}).then((res) => {
			console.log(res);
			setMyScrap(res.data.content);
			setIsLoading(false);
		}).catch((err) => {
			console.log(err);
		});
	}

	// effect
	useEffect(() => {
		getData();
	}, [page])


	return (
		<div className={style.all_wrapper}>
			<Nav />
			<div className={style.content_wrapper}>
				<div className={style.title}>나의 스크랩</div>
				{/* 헤더 */}
				<div className={style.content_header}>
				 	<div className={style.header_id}>
						ID
					</div>
					<div className={style.header_title}>
						제목
					</div>
					<div className={style.header_notice}>
						알람
					</div>
				</div>
				{/* 카드 목록 */}
				<div className={style.card_wrapper}>
					{isLoading ? (<Spin />) : (myScrap.map((scrap, idx) => {
						return (<div key={scrap.id} className={style.card_box_wrap}>
							<div className={style.card_box_id}>{idx + 1}</div>
							<div className={style.card_box_center}>
								<div className={style.card_title}>
									{scrap.polyBizSjnm}
								</div>
								<div className={style.card_content}>
									{scrap.polyItcnCn}
								</div>
							</div>
							<div className={style.card_box_notice}>X</div>
						</div>)
					}))}
				</div>
				{/* 페이지 버튼 */}
				<div className={style.pageButton_wrapper}>
					페이지 버튼
				</div>
			</div>
		</div>
	)
}
