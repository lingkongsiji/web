const url='http://localhost:3000'
const lyricImg = document.querySelector('.playDetails .img img')
const main = document.querySelector('main');
const recommend = document.querySelector('.recommend>ul');
const songsList = document.getElementById('songsList');
const find = document.querySelector('.cloud');
const previous = document.querySelector('.icon-previous2')
const next = document.querySelector('.icon-next2')

const slider = document.querySelector('.range')
const thumb = document.querySelector('.thumb');
const audio = document.getElementById('audio')
const player = document.querySelector('.play .icon-play3')
const playImg = document.querySelector('.song img') //封面
const playName = document.querySelector('.song .name') //歌名
const playSinger = document.querySelector('.song .singer') //歌手
const audioSrc = document.querySelector('.song audio') //播放源
const range = document.querySelector('.range')

const day = recommend.children[0].querySelector('span');
const day1 = songsList.querySelector('span');


const down = document.getElementById('list') //列表
const comments = document.getElementById('comments') //评论
const showList = document.querySelectorAll('.listNav span')
const listHead = document.querySelector('.listHead') //歌单列表页首
const playlist = document.querySelectorAll('.recommend li') //歌单
const playList_name = document.querySelectorAll('.recommend p') //歌单标题
const coverImg = document.querySelectorAll('.recommend img') //歌单封面
const playCount = document.querySelectorAll('.recommend span') //播放量

let myDate = new Date().getDate();
day.innerHTML = myDate;
day1.innerHTML = myDate;

showList[1].addEventListener('click', () => {
    down.style.display = 'none'
    comments.style.display = 'block'
})
showList[0].addEventListener('click', () => {
    down.style.display = 'block'
    comments.style.display = 'none'
})

recommend.children[0].addEventListener('click', function() { //日推歌单点击进入
    listHead.className = 'listHead hidden' //隐藏普通歌单列表页首
    main.className = 'hidden';
    songsList.className = '';
    find.children[0].className = ''
    document.querySelector('.day').className = 'day'
});


function shift(num) {
    // 播放量换单位
    if (num < 100000) {
        num = num
    } else if (num >= 100000 && num < 100000000) {
        num = parseInt(num / 100000) + '万'
    } else if (num > 100000000) {
        num = parseInt(num / 100000000) + '亿'
    }
    return num
}







// fetch(url + '/personalized') //获取推荐歌单
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })


playList_get()
async function playList_get() {
    // await fetch('http://localhost:3000/top/playlist') //获取歌单
    await fetch(url + '/top/playlist') //获取歌单
        .then(res => res.json())
        .then(data => {
            let arr = data.playlists
                // let listArr = new Array

            for (let i = 1; i < playList_name.length; i++) { //选中所有歌单
                //歌单封面
                playList_name[i].textContent = arr[i].name //标题
                coverImg[i].src = arr[i].coverImgUrl //封面
                playCount[i].textContent = shift(arr[i].playCount) //播放量

                //点击歌单进入
                playlist[i].addEventListener('click', async function() {

                    document.querySelector('.day').className = 'day hidden' //日推列表头隐藏
                    find.children[0].className = '' //侧边栏聚焦清除
                    listHead.className = 'listHead' //显示普通歌单列表页首
                    down.innerHTML = '<li class="headLine"><span></span><span>标题</span><span>歌手</span><span>专辑</span><span>时间</span></li>' //清除上一次搜索结果
                        //获取歌单详情
                    await fetch(url + '/comment/playlist?id=' + arr[i].id) //歌单评论
                        // await fetch('http://redrock.udday.cn:2022/comment/playlist?id=' + arr[i].id) //歌单评论
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            return result = data.comments
                        })
                    console.log(result)
                    for (let i = 0; i < result.length; i++) {
                        let li = document.createElement('li')
                        li.innerHTML = result[i].content
                        document.querySelector('.comments').appendChild(li)
                    }
                    await fetch(url + '/playlist/detail?id=' + arr[i].id)
                        // await fetch('http://redrock.udday.cn:2022/playlist/detail?id=' + arr[i].id)
                        .then(res => res.json())
                        .then(data => {
                            console.log(data)
                            console.log(data.playlist.tracks)
                                //歌单信息
                            listHead.querySelector('.title').textContent = data.playlist.name
                            listHead.querySelector('img').src = data.playlist.coverImgUrl
                            listHead.querySelectorAll('.details p')[0].textContent = '标签:' + data.playlist.tags
                            listHead.querySelectorAll('.details p')[2].textContent = '简介:' + data.playlist.description

                            // for (let i = 0; i < arr.length; i++) {
                            //     console.log('标题:' + arr[i].name + '歌手:' + arr[i].ar[0].name)
                            // }
                            return result = data.playlist.tracks
                        })

                    listShow() //歌单展示
                        //显示歌曲列表
                    main.className = 'hidden';
                    songsList.className = '';
                })
            }
        })
        // listShow()
}





dayList()
async function dayList() {
    // await fetch('http://redrock.udday.cn:2022/personalized/newsong', { credentials: 'include' })
    await fetch(url + '/personalized/newsong', { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            // console.log(data)
            return result = data.result
        })
        // console.log(result)
    let songsId = new Array
        // let imgUrl = new Array
        // let musicUrl = new Array
    let artistsName = new Array
    for (let i = 0; i < result.length; i++) {
        songsId[i] = result[i].id
        let li = document.createElement('li') //创建歌曲列表
        li.setAttribute('index', i)
        if (i % 2 === 0) {
            li.style.backgroundColor = 'rgb(249,249,249)'
        }
        artistsName[i] = result[i].song.artists[0].name //歌手名
        li.innerHTML = '<span></span><span>' + result[i].name + '</span><span>' + artistsName[i] + '</span><span>' + '专辑' + '</span><span></span><span></span>'
        down.appendChild(li) //节点插入



        li.addEventListener('click', async function() {
            thumb.style.left = 0
            await fetch(url + '/song/detail?ids=' + songsId[i]) //获取歌曲详情
                .then(res => res.json())
                .then(data => {
                    playImg.src = data.songs[0].al.picUrl //图片地址
                })

            await fetch(url + '/song/url?id=' + songsId[i]) //获取音乐url
                .then(res => res.json())
                .then(data => {
                    // musicUrl[i] = data.data[0].url
                    audio.pause()
                    audioSrc.src = data.data[0].url //音乐地址
                    audio.play()
                })

            await fetch(url + '/lyric?id=' + songsId[i]) //获取歌词
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log(data.lrc)
                    let str = data.lrc.lyric.split('\n') //歌词拆分
                    let lyric = new Array //歌词存入数组
                    for (let i = 0; i < str.length; i++) {
                        lyric[i] = str[i].split(']')[1]
                    }
                    // console.log(lyric)
                    let lyrics = document.querySelector('.lyrics ul')
                    lyrics.innerHTML = ''
                        // lyrics.textContent = data.lrc.lyric
                    for (let i = 0; i < lyric.length; i++) {
                        let li = document.createElement('li')
                        li.textContent = lyric[i]
                        lyrics.appendChild(li)
                    }
                })

            await fetch(url + '/comment/music?id=' + songsId[i]) //歌曲评论
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    songComments.innerHTML = ''
                    for (let i = 0; i < data.comments.length; i++) {
                        let li = document.createElement('li')
                        li.innerHTML = data.comments[i].content
                        songComments.appendChild(li)
                    }
                })

            document.querySelector('.lyrics h1').textContent = result[i].name //歌名
            document.querySelector('.lyrics h2').textContent = artistsName[i]
            playName.textContent = result[i].name
            playSinger.textContent = artistsName[i]
                // playImg.src = imgUrl[i] //图片地址
                // audioSrc.src = musicUrl[i] //音乐地址
            player.className = 'icon-pause2'

            let index = this.getAttribute('index')

            next.addEventListener('click', async function() {
                thumb.style.left = 0
                if (index < songsId.length) {
                    index++
                } else {
                    index = 0
                }
                // console.log(index)

                await fetch(url + '/comment/music?id=' + songsId[index])
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        songComments.innerHTML = ''
                        for (let i = 0; i < data.comments.length; i++) {
                            let li = document.createElement('li')
                            li.innerHTML = data.comments[i].content
                            songComments.appendChild(li)
                        }
                    })

                await fetch(url + '/song/detail?ids=' + songsId[index]) //获取歌曲详情
                    .then(res => res.json())
                    .then(data => {
                        // imgUrl[i] = data.songs[0].al.picUrl //图片地址
                        playImg.src = data.songs[0].al.picUrl //图片地址

                    })
                await fetch(url + '/song/url?id=' + songsId[index]) //获取音乐url
                    .then(res => res.json())
                    .then(data => {
                        // musicUrl[i] = data.data[0].url
                        audioSrc.src = data.data[0].url //音乐地址
                    })
                document.querySelector('.lyrics h1').textContent = result[index].name //歌名
                document.querySelector('.lyrics h2').textContent = artistsName[index]
                playName.textContent = result[index].name
                playSinger.textContent = artistsName[index]
                    // playImg.src = imgUrl[i] //图片地址
                    // audioSrc.src = musicUrl[i] //音乐地址
                audio.play()
            })
            previous.addEventListener('click', async function() {
                if (index > 0) {
                    index--
                } else {
                    index = songsId.length
                }
                // console.log(index)
                await fetch(url + '/song/detail?ids=' + songsId[index]) //获取歌曲详情
                    .then(res => res.json())
                    .then(data => {
                        // imgUrl[i] = data.songs[0].al.picUrl //图片地址
                        playImg.src = data.songs[0].al.picUrl //图片地址

                    })
                await fetch(url + '/comment/music?id=' + songsId[index])
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        songComments.innerHTML = ''
                        for (let i = 0; i < data.comments.length; i++) {
                            let li = document.createElement('li')
                            li.innerHTML = data.comments[i].content
                            songComments.appendChild(li)
                        }
                    })

                await fetch(url + '/song/url?id=' + songsId[index]) //获取音乐url
                    .then(res => res.json())
                    .then(data => {
                        // musicUrl[i] = data.data[0].url
                        audio.pause()
                        audioSrc.src = data.data[0].url //音乐地址
                        audio.play()
                    })
                document.querySelector('.lyrics h1').textContent = result[index].name //歌名
                document.querySelector('.lyrics h3').textContent = artistsName[index]
                playName.textContent = result[index].name
                playSinger.textContent = artistsName[index]
                    // playImg.src = imgUrl[i] //图片地址
                    // audioSrc.src = musicUrl[i] //音乐地址
            })
        });

    }
}





const songComments = document.querySelector('.songComments ul')

async function listShow() {
    let songsId = new Array
        // let imgUrl = new Array
        // let musicUrl = new Array
    let artistsName = new Array
    for (let i = 0; i < result.length; i++) {
        songsId[i] = result[i].id //歌曲id
        artistsName[i] = result[i].ar[0].name //歌手名
    }
    for (let i = 0; i < result.length; i++) {
        let li = document.createElement('li') //创建歌曲列表
        li.setAttribute('index', i)
        if (i % 2 === 0) {
            li.style.backgroundColor = 'rgb(249,249,249)'
        }
        li.innerHTML = '<span></span><span>' + result[i].name + '</span><span>' + artistsName[i] + '</span><span>' + '专辑' + '</span><span></span><span></span>'
        down.appendChild(li) //节点插入

        li.addEventListener('click', async function() {
            function showMessage() {
                document.querySelector('.lyrics h1').textContent = result[i].name //歌名
                document.querySelector('.lyrics h3').textContent = artistsName[i]
                playName.textContent = result[i].name //歌名
                playSinger.textContent = artistsName[i] //歌手
                    // playImg.src = imgUrl[i] //图片地址
                    // audioSrc.src = musicUrl[i] //音乐地址
                player.className = 'icon-pause2'
            }

            thumb.style.left = 0
            await fetch(url + '/song/detail?ids=' + songsId[i]) //获取歌曲详情
                .then(res => res.json())
                .then(data => {
                    // console.log(data)
                    playImg.src = data.songs[0].al.picUrl //图片地址
                    lyricImg.src = data.songs[0].al.picUrl
                })
            await fetch(url + '/song/url?id=' + songsId[i]) //获取音乐url
                .then(res => res.json())
                .then(data => {
                    // musicUrl[i] = data.data[0].url
                    audio.pause()
                    audioSrc.src = data.data[0].url //音乐地址
                    audio.play()
                })
            showMessage()

            await fetch(url + '/lyric?id=' + songsId[i]) //获取歌词
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    console.log(data.lrc)
                    let str = data.lrc.lyric.split('\n') //歌词拆分
                    let lyric = new Array //歌词存入数组
                    for (let i = 0; i < str.length; i++) {
                        lyric[i] = str[i].split(']')[1]
                    }
                    // console.log(lyric)
                    let lyrics = document.querySelector('.lyrics ul')
                    lyrics.innerHTML = ''
                        // lyrics.textContent = data.lrc.lyric
                    for (let i = 0; i < lyric.length; i++) {
                        let li = document.createElement('li')
                        li.textContent = lyric[i]
                        lyrics.appendChild(li)
                    }
                })

            await fetch(url + '/comment/music?id=' + songsId[i])
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    songComments.innerHTML = ''
                    for (let i = 0; i < data.comments.length; i++) {
                        let li = document.createElement('li')
                        li.innerHTML = data.comments[i].content
                        songComments.appendChild(li)
                    }
                })

            let index = this.getAttribute('index')

            next.addEventListener('click', async function() {
                thumb.style.left = 0
                if (index < songsId.length) {
                    index++
                } else {
                    index = 0
                }
                // console.log(index)
                await fetch(url + '/song/detail?ids=' + songsId[index]) //获取歌曲详情
                    .then(res => res.json())
                    .then(data => {
                        // imgUrl[i] = data.songs[0].al.picUrl //图片地址
                        playImg.src = data.songs[0].al.picUrl //图片地址
                        lyricImg.src = data.songs[0].al.picUrl

                    })
                await fetch(url + '/song/url?id=' + songsId[index]) //获取音乐url
                    .then(res => res.json())
                    .then(data => {
                        // musicUrl[i] = data.data[0].url
                        audioSrc.src = data.data[0].url //音乐地址
                    })
                document.querySelector('.lyrics h1').textContent = result[index].name //歌名
                document.querySelector('.lyrics h3').textContent = artistsName[index]
                playName.textContent = result[index].name
                playSinger.textContent = artistsName[index]
                    // playImg.src = imgUrl[i] //图片地址
                    // audioSrc.src = musicUrl[i] //音乐地址

                await fetch(url + '/comment/music?id=' + songsId[index])
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        songComments.innerHTML = ''
                        for (let i = 0; i < data.comments.length; i++) {
                            let li = document.createElement('li')
                            li.innerHTML = data.comments[i].content
                            songComments.appendChild(li)
                        }
                    })

                await fetch(url + '/lyric?id=' + songsId[index]) //获取歌词
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        console.log(data.lrc)
                        let str = data.lrc.lyric.split('\n') //歌词拆分
                        let lyric = new Array //歌词存入数组
                        for (let i = 0; i < str.length; i++) {
                            lyric[i] = str[i].split(']')[1]
                        }
                        // console.log(lyric)
                        let lyrics = document.querySelector('.lyrics ul')
                        lyrics.innerHTML = ''
                            // lyrics.textContent = data.lrc.lyric
                        for (let i = 0; i < lyric.length; i++) {
                            let li = document.createElement('li')
                            li.textContent = lyric[i]
                            lyrics.appendChild(li)
                        }
                    })
                audio.play()
            })

            previous.addEventListener('click', async function() {
                if (index > 0) {
                    index--
                } else {
                    index = songsId.length
                }
                console.log(index)
                await fetch(url + '/song/detail?ids=' + songsId[index]) //获取歌曲详情
                    .then(res => res.json())
                    .then(data => {
                        // imgUrl[i] = data.songs[0].al.picUrl //图片地址
                        playImg.src = data.songs[0].al.picUrl //图片地址
                        lyricImg.src = data.songs[0].al.picUrl
                    })
                await fetch(url + '/song/url?id=' + songsId[index]) //获取音乐url
                    .then(res => res.json())
                    .then(data => {
                        // musicUrl[i] = data.data[0].url
                        audio.pause()
                        audioSrc.src = data.data[0].url //音乐地址
                        audio.play()
                    })
                document.querySelector('.lyrics h1').textContent = result[index].name //歌名
                document.querySelector('.lyrics h3').textContent = artistsName[index]
                playName.textContent = result[index].name
                playSinger.textContent = artistsName[index]
                    // playImg.src = imgUrl[i] //图片地址
                    // audioSrc.src = musicUrl[i] //音乐地址

                await fetch(url + '/comment/music?id=' + songsId[index])
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        songComments.innerHTML = ''
                        for (let i = 0; i < data.comments.length; i++) {
                            let li = document.createElement('li')
                            li.innerHTML = data.comments[i].content
                            songComments.appendChild(li)
                        }
                    })

                await fetch(url + '/lyric?id=' + songsId[index]) //获取歌词
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        console.log(data.lrc)
                        let str = data.lrc.lyric.split('\n') //歌词拆分
                        let lyric = new Array //歌词存入数组
                        for (let i = 0; i < str.length; i++) {
                            lyric[i] = str[i].split(']')[1]
                        }
                        // console.log(lyric)
                        let lyrics = document.querySelector('.lyrics ul')
                        lyrics.innerHTML = ''
                            // lyrics.textContent = data.lrc.lyric
                        for (let i = 0; i < lyric.length; i++) {
                            let li = document.createElement('li')
                            li.textContent = lyric[i]
                            lyrics.appendChild(li)
                        }
                    })
            })
        });

    }

}
module.exports={
    listShow
}