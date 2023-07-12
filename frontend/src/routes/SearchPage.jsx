import React from 'react'
import { useParams } from 'react-router-dom/cjs/react-router-dom.min'

export default function Search_page() {
  const {text} = useParams();
  return (
	  <h1>Text = {text}</h1>
  )
}
