import React from 'react'

function List(props) {
    const { content } = props
    return (
        <div className="side-card-content">
            {content.map((item, index) => {
                return (
                    <div className="side-card-content-item" key={index}>{item.title}</div>
                )
            }
            )}
        </div>
    )
}

export default function SideCard(props) {
    const { list } = props
    const { title, content } = list
    if (!title) {
        return (
            <div className="side-card">
                <List content={content} />
            </div>
        )
    } else {
        return (
            <div className="side-card">
                <div className="side-card-title">{title}</div>
                <List content={content} />
            </div>
        )
    }
}
