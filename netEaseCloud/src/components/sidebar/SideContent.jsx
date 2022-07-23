import React from 'react'
import SideVIP from './SideVIP'
import SideCard from './SideCard'

const mainCard = {
    title: '',
    content: [{
        title: '我的消息',
    }, {
        title: '云贝中心',
    }, {
        title: '创作者中心',
    }],
}

export default function SideContent() {
    return (
        <div className='side-content'>
            <SideVIP />
            <SideCard list={mainCard} />
        </div>
    )
}
