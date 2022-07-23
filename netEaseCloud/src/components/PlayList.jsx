import React from 'react'
import '../styles/playList.css'

export default function PlayList(props) {
    const { data } = props
    const list = data.map((item, index) => (
        <div className='play-list-item' key={index}>
            <div className="cover">
                <img src={item.imgUrl} alt="" />
            </div>
            <div className="info">
                <p className='info-title'>{item.title}</p>
                <p className='info-text'>{item.text}</p>
            </div>
        </div>
    ))
    return (
        <div className="play-list">{list}</div>
    )
}
