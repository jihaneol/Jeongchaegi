import React from 'react'
import home_styles from "../styles/Home.module.css"

export default function Search() {
  return (
    <div className={`${home_styles.search_bar}`}>
      <label className='input-group-text'>Search</label>
      <input
        type="text"
        placeholder='Enter text'
        className='form-control input-lg'
      />
    </div>
  )
}
