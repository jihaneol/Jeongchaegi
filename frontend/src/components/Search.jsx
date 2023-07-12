import React, { useState } from 'react'
import home_styles from "../styles/Home.module.css"
import { useHistory } from 'react-router-dom';

export default function Search() {
  const [inputText, setInputText] = useState("")
  const history = useHistory();

  const onChange = (event) => {
    setInputText(event.target.value);
  }

  // preventDefault 추가
  const onSubmit = (e) => {
    e.preventDefault()
    history.push(`/search/${inputText}`)
  }

  return (
    <form className={`${home_styles.search_bar}`} onSubmit={onSubmit}>
      <label className='input-group-text'>Search</label>

      <input
        value={inputText}
        type="text"
        placeholder='Enter text'

        className='form-control input-lg'
        onChange={onChange}
      />
      <button onClick={onSubmit} className='btn btn-primary'>검색</button>
    </form>
  )
}
