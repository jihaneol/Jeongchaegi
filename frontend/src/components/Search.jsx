import React, { useState } from 'react'
import home_styles from "../styles/Home.module.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Search() {
  const [inputText, setInputText] = useState("")

  const onChange = (event) => {
    setInputText(event.target.value);
  }

  return (
    <div className={home_styles.search_bar}>
      <label>Search</label>
      <input
        value={inputText}
        type="text"
        placeholder='Enter text'
        style={{
          width: 500
        }}
        onChange={onChange}
      />
      <Link to={`/search/${inputText}`}>검색</Link>
    </div>
  )
}
