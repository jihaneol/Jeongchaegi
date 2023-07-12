import React, { useState } from 'react'
import home_styles from "../styles/Home.module.css"
import { Link } from 'react-router-dom/cjs/react-router-dom.min'

export default function Search() {
  const [inputText, setInputText] = useState("")

  const onChange = (event) => {
    setInputText(event.target.value);
  }

  return (
    <div className={`${home_styles.search_bar}`}>
      <label className='input-group-text'>Search</label>
      <input
        value={inputText}
        type="text"
        placeholder='Enter text'

        className='form-control input-lg'
        onChange={onChange}
      />
      <Link to={`/search/${inputText}`}>검색</Link>
    </div>
  )
}
