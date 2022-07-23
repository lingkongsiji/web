import React from 'react'
import routes from './routes';
import { useRoutes } from "react-router-dom";

export default function RouterView() {
  return (
    <div className='router-view'>
      {useRoutes(routes)}
    </div>
  )
}
