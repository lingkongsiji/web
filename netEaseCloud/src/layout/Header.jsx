import React, { useContext } from 'react'
import { HamburgerButton } from '@icon-park/react';
import '@icon-park/react/styles/index.css';
import SearchBar from '../components/sidebar/SearchBar';
import { TheContext } from './Layout';

export default function Header(props) {
  const { isShow, setIsShow } = useContext(TheContext)
  return (
    <div id='header'>
      <div className="left" onClick={(e) => {
        e.stopPropagation()
        setIsShow(!isShow)
      }}>
        <HamburgerButton theme="outline" size="20" fill="#333" strokeWidth={2} />
      </div>
      <div className="middle">
        <SearchBar />
      </div>
      <div className="right"></div>
    </div>
  )
}
