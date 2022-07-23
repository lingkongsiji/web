import React, { useContext }from 'react'
import { Down } from '@icon-park/react';
import { UserContext } from '../../App';

export default function MainCard() {
    const user = useContext(UserContext)
    const { name, headPortrait,label,location } = user
    return (
        <div className='main-card'>
            <div className='head-portrait'>
                <img src={headPortrait} alt="" />
            </div>
            <h5>{name}</h5>
            <div className='level'>
                <span>关注</span>
                <span>粉丝</span>
                <span>Lv.8</span>
            </div>
            <div className="details">
                <span>00后 天蝎座</span>
                <span>{location.city}</span>
                <span>{label[0]}</span>
                <span>&gt;</span>
            </div>
            <div className="dropdown">
                <span className='text'>编辑资料</span>
                <Down theme="outline" size="20" fill="#333" strokeWidth={2} />
            </div>
        </div>
    )
}
