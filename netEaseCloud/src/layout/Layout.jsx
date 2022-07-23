import React, { useState, createContext } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'
import Content from './Content'
import Footer from './Footer'
import '../styles/layout.css'

export const TheContext = createContext()

export default function Layout() {
    const [isShow, setIsShow] = useState(false)
    const [mouseStart, setMouseStart] = useState(0)
    const context = {
        isShow,
        setIsShow: setIsShow
    }
    return (
        <TheContext.Provider value={context}>
            <div id='layout'
                onMouseDown={(e) => {
                    setMouseStart(e.clientX)
                }}
                onMouseUp={(e) => {
                    const mouseEnd = e.clientX
                    if (mouseStart - mouseEnd > 80) {
                        setIsShow(false)
                    } else if (mouseStart - mouseEnd < -80) {
                        setIsShow(true)
                    }
                }}
            >
                <Header />
                <Sidebar className={isShow ? 'show' : ''} />
                <Content />
                <Footer />
                <div
                    className={isShow ? 'mask show' : 'mask'}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsShow(false)
                    }}
                ></div>
            </div>
        </TheContext.Provider>
    )
}
