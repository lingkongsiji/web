import React, { useContext } from 'react'
import { ArrowLeft } from '@icon-park/react';
import { UserContext } from '../../App';

function Item(props) {
    const { title, value } = props;
    return (
        <div>
            <p>{title}</p>
            <p>{value}</p>
        </div>
    )
}

export default function EditData() {
    const user = useContext(UserContext)
    const { headPortrait,
        name,
        gender,
        birthday,
        location,
        university,
        label,
        introduction, } = user
    return (
        <div className='edit-data'>
            <div className='edit-data-header'>
                <div className='btn'>
                    <ArrowLeft theme="outline" size="22" fill="#fff" strokeWidth={3} />
                </div>
                <div className='title'>
                    <p>我的资料</p>
                </div>
            </div>
            <div className='main-data'>
                <Item title='头像' value={headPortrait} />
                <Item title='昵称' value={name} />
                <Item title='性别' value={gender} />
            </div>
            <div className='sub-data'>
                <Item title='生日' value={birthday} />
                <Item title='地区' value={`${location.type} ${location.city}`} />
                <Item title='学校' value={university} />
                <Item title='标签' value={label.join(' ')} />
                {introduction && <Item title='简介' value={introduction} />}
            </div>
            <div className='personal-settings'>
                
            </div>
            <div className='account-settings'></div>
        </div>
    )
}
