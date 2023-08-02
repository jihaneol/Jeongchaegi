import React from 'react'
import { useState } from 'react';

export default function PolicyListPageBtn({pageCnt, clickPageNumb}) {
	const buttons = [];
	for (let i = 1; i <= pageCnt; i++) {
		buttons.push(
			<button key={i} onClick={() => handleClick(i)} >{i}</button>
		)
	}

	function handleClick(pageNumb) {
		clickPageNumb(pageNumb);
	}

	return (
		<div>
			{buttons}
		</div>
	)
}
