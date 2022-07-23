import React, { useContext } from 'react'
import { UserContext } from '../../App'

export default function MessageCard() {
    const user = useContext(UserContext)
    const { gender, birthday, label, location, registrationTime } = user
    return (
        <div className='message-card'>
            <div className="msg-header">
                <p className='title'>基本信息</p>
                <p className='btn'>村民证</p>
            </div>
            <div className="content">
                <p>
                    <span>村龄：{new Date().getFullYear()-registrationTime.split('-')[0]}年</span>
                </p>
                <p>
                    <span>性别：{gender}</span>
                </p>
                <p>
                    <span>年龄：{new Date().getFullYear()-birthday.split('-')[0]}</span>
                </p>
                <p>
                    <span>个人简介：</span>
                </p>
            </div>
            <div className="msg-footer">
                <span>查看全部</span>
            </div>
        </div>
    )
}
