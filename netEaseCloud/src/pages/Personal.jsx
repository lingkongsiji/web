import React, { useState, createContext } from 'react'
import './index.css'
import img from '../images/starry.jpg'
import { ArrowLeft, MoreOne } from '@icon-park/react';
import { Link, Navigate, NavLink, Outlet } from 'react-router-dom';

import MainCard from '../components/personal/MainCard'

function Header(props) {
  const { leave, setLeave } = props
  return (
    <header className='header'>
      <ArrowLeft
        onClick={() => {
          setLeave(true)
          setTimeout(() => {
            setLeave(false)
          }, 1000)
        }}
        theme="outline"
        size="22"
        fill="#fff"
        strokeWidth={3}
      />
      <MoreOne theme="outline"
        size="22"
        fill="#fff"
        strokeWidth={3}
      />
    </header>
  )
}

function NavItem() {
  const nav = [{
    name: '主页',
    path: '/personal/home'
  }, {
    name: '动态',
    path: '/personal/dynamic'
  }, {
    name: '播客',
    path: '/personal/broadcast'
  }]
  return (
    <div className='nav-item'>
      {nav.map((item, index) => {
        return (
          <NavLink to={item.path} key={index}>
            <span>{item.name}</span>
          </NavLink>
        )
      }
      )}
    </div>
  )
}

const dynamic = [{
  title: '动态标题',
  content: '动态内容'
}]

export const DynamicContext = createContext(dynamic)

import headpot from '../images/wanye.jpg'
const context = {
  dynamic: dynamic,
  user:{
    headPortrait: headpot,
    name: '阳寒凌'
  }
}

export default function Personal() {
  const [leave, setLeave] = useState(false)
  return (
    <div id='home'>
      {leave && <Navigate to='/' />}
      <Header leave={leave} setLeave={setLeave} />
      <main className='main'>
        <div className='background'>
          <img src={img} alt="" />
        </div>
        <div className='content'>
          <MainCard />
          <NavItem />
          <DynamicContext.Provider value={context}>
            <Outlet />
          </DynamicContext.Provider>
        </div>
      </main>
      <footer className='footer'></footer>
    </div>
  )
}
