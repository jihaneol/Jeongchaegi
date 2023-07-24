import React from 'react'
import style from "../styles/Home.module.css"

export default function HomeListItem({type, content}) {
  return (
	<div className={style.list_content_box}>
		<div className={style.list_content_header}>
			{`${type} ${content.id}`}
		</div>
		<div className={style.list_content_body}>
			{`${content.title}`}
		</div>
	</div>
  )
}
