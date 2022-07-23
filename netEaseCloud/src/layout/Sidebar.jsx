import React from 'react'
import '../styles/side.css'
import SideHeader from '../components/sidebar/SideHeader'
import SideContent from '../components/sidebar/SideContent'

export default function Sidebar(props) {
  const { className } = props;
  return (
    <div id='sidebar' className={className}>
      <SideHeader />
      <SideContent />
    </div>
  )
}
