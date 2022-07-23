import React, { useContext } from 'react'
import { DynamicContext } from '../Personal'
import { MoreOne } from '@icon-park/react';

function DynamicItem(props) {
    const { user } = useContext(DynamicContext)
    const { title, content } = props.item
    const { headPortrait, name } = user

    return (
        <div className='dynamic-item'>
            <div className='dynamic-item-header'>
                <div className='left'>
                    <img src={headPortrait} alt="" />
                </div>
                <div className="center">
                    <span>{name}</span>
                </div>
            </div>
            <div className="title">
                <p className="center">{title}</p>
            </div>
            <div className="content">
                <p className="center">{content}</p>
            </div>
            <div className='dynamic-item-footer'>
                <div className="center">
                    <span>转发</span>
                    <span>评论</span>
                    <span>赞</span>
                </div>
                <div className='right'>
                    <MoreOne />
                </div>
            </div>
        </div>
    )
}

export default function Dynamic(props) {
    const { dynamic } = useContext(DynamicContext)
    const list = dynamic.map((item, index) => (
        <DynamicItem key={index} item={item} />
    ))
    return (
        <div className='dynamic'>
            {dynamic.length == 0 && <p>暂时还没有动态哦</p>}
            {list}
        </div>
    )
}
