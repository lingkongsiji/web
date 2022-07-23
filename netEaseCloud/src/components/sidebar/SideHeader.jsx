import React, { useContext, useState } from 'react'
import img from '../../images/wanye.jpg'
import { ScanCode } from '@icon-park/react';
import { ScanOutlined } from '@ant-design/icons';
import { TheContext } from '../../layout/Layout';
import { Link, Navigate } from 'react-router-dom';

export default function SideHeader() {
    const { isShow, setIsShow } = useContext(TheContext)
    const [leave, setLeave] = useState(false)
    return (
        <div className='side-header'
            onClick={() => {
                setIsShow(!isShow)
            }}
        >
            {leave && <Navigate to='/personal' />}
            <div className="user"
                onClick={() => {
                    setLeave(true)
                    setTimeout(() => {
                        setLeave(false)
                    }, 1000)
                }}
            >
                <img src={img} alt="" />
                <span className="user-name">阳寒凌&gt;</span>
            </div>
            <div className="content">
                <ScanOutlined />
            </div>
        </div>
    )
}
