import React, { useState } from 'react'
import MessageCard from '../../components/personal/MessageCard';
import PlayListCard from '../../components/personal/PlayListCard';
import { NavLink } from 'react-router-dom';
import getData from '../../tools/getData'

import coverurl from '../../images/wanye.jpg'

export default function Home() {
    const [playList, setPlayList] = useState([])
    if (playList.length === 0)
        getData('/personalized')
            .then(data => {
                const { result } = data
                setPlayList(result)
            })
    const data = playList.map(play => {
        const { name, id, picUrl, playCount,trackCount } = play
        
        return {
            imgUrl: picUrl,
            title: name.length > 12 ? name.slice(0, 12) + '...' : name,
            playCount: playCount,
            id: id,
            text: `${trackCount}首,播放${
                playCount>10**9?parseInt(playCount/10**10)+'亿':
                playCount>10**6?parseInt(playCount/10**6)+'万':playCount
            }次`
        }
    })
    return (
        <div className='home'>
            <MessageCard />
            <PlayListCard data={[
                { title: '听歌排行', text: '累计听歌4779首', id: 1, imgUrl: coverurl },
                { title: '我喜欢的音乐', text: '167首,播放494次', id: 2, imgUrl: coverurl },
            ]}
                title='音乐品味'
            />
            <PlayListCard data={[]} title='创建的歌单' />
            <PlayListCard data={data.filter((item, index) => index < 10)} title='收藏的歌单' />
            <div className='dream'>
                <p className='title'>愿望清单</p>
                <span>发布愿望&gt;</span>
            </div>
        </div>
    )
}
