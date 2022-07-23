import React from 'react'
import PlayList from '../PlayList'
import '../../styles/listCard.css'

export default function PlayListCard(props) {
    const { title, data,subtitle } = props
    return (
        <div className='list-card'>
            <div className="list-header">
                <p className='title'>{title}</p>
                {subtitle && <span className='subtitle'>{`(${subtitle})`}</span>}
            </div>
            <PlayList data={data} />
        </div>
    )
}
