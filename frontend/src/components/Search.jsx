import React, { useState } from 'react'
import home_styles from "../styles/Home.module.css"
import { useHistory } from 'react-router-dom';

export default function Search() {
  const [inputText, setInputText] = useState("")
  const history = useHistory();

  const onChange = (event) => {
    setInputText(event.target.value);
  }

  const onSubmit = () => {
    history.push(`/search/${inputText}`)
  }

  return (
    <form className={home_styles.search_bar} onSubmit={onSubmit}>
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
      <button onClick={onSubmit}>검색</button>
    </form>
  )
}
