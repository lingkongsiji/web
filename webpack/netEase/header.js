const url='http://localhost:3000'

const songComments = document.querySelector('.songComments ul')
const baner = document.querySelector('.nav>ul');
const left = document.querySelector('.left1');
const right = document.querySelector('.right1');
const li = document.querySelectorAll('.nav>ul>li');
const ol = document.querySelector('.nav>ol')
const bannersImg = document.querySelectorAll('.nav>ul img')
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
const slider1 = document.querySelector('.volume>div')
const sliderHeight = document.querySelector('.volume>div>div')
const thumb1 = document.querySelector('.volume>div>div>div');
const mine = document.querySelector('.myMusic');
const dropdown = document.querySelectorAll('button.head')
const show = document.querySelectorAll('.playList>ul')
const hotBox = document.querySelector('.start_search')
const search = document.querySelectorAll('.start_search li')
const lyricImg = document.querySelector('.playDetails .img img')
const listHead = document.querySelector('.listHead') //歌单列表页首
const playDetails = document.querySelector('.playDetails')


for (let i = 0; i < 3; i++) {
    search[i].className = 'top_3'
}
const oder = document.querySelectorAll('.start_search a>span')
for (let i = 0; i < oder.length; i++) {
    oder[i].textContent = i + 1 //插入榜单序数
}

// let search_hot = fetch('http://localhost:3000/search/hot/detail') //获取热搜榜
// let search_hot = fetch('http://redrock.udday.cn:2022/search/hot/detail')

//热搜榜
const searchWord = document.querySelectorAll('.searchWord') //标题;
const score = document.querySelectorAll('.score'); //播放量
const content = document.querySelectorAll('.content'); //描述

const searchBox = document.querySelectorAll('.search input') //搜索框
const searchBtn = document.querySelectorAll('.search button')

const sleep = t => new Promise(r => setTimeout(r, t)) //计时器



for (let i = 0; i < searchBox.length; i++) {
    searchBox[i].onfocus = function() {
        hotBox.style.visibility = 'visible' //聚焦显示
        document.addEventListener('keydown', async(event) => {
            if (event.code == 'Enter') {
                event.preventDefault()
                find.children[0].className = '' //侧边栏聚焦清除
                listHead.className = 'listHead hidden'
                document.querySelector('.day').className = 'day hidden'
                playDetails.className = 'playDetails hidden'

                let keyWords = searchBox[i].value

                if (keyWords === '') {
                    console.log('请输入关键词')
                }
                // console.log(keyWords)
                await fetch(url + '/search?keywords=' + keyWords) //搜索
                    .then(res => res.json())
                    .then(data => {
                        console.log(data)
                        return result = data.result.songs
                    }) //搜索结果
                down.innerHTML = '<li class="headLine"><span></span><span>音乐标题</span><span>歌手</span><span>专辑</span><span>时长</span><span>热度</span></li>' //清除上一次搜索结果
                startSearch()
            }
        })
    }
    searchBox[i].onblur = function() {
        setTimeout(() => {
            hotBox.style.visibility = 'hidden'
        }, 520); //使得搜索完成后隐藏
    }
    searchBtn[i].addEventListener('click', async function() { //搜索框关键词检索
        find.children[0].className = '' //侧边栏聚焦清除
        listHead.className = 'listHead hidden'
        document.querySelector('.day').className = 'day hidden'
        playDetails.className = 'playDetails hidden'

        let keyWords = searchBox[i].value

        if (keyWords === '') {
            console.log('请输入关键词')
        }
        // console.log(keyWords)
        await fetch(url + '/search?keywords=' + keyWords) //搜索
            .then(res => res.json())
            .then(data => {
                console.log(data)
                return result = data.result.songs
            }) //搜索结果
        down.innerHTML = '<li class="headLine"><span></span><span>音乐标题</span><span>歌手</span><span>专辑</span><span>时长</span><span>热度</span></li>' //清除上一次搜索结果
        startSearch()
    })
}

async function submit() { //搜索框关键词检索
    let form = document.form.text

    find.children[0].className = '' //侧边栏聚焦清除
    listHead.className = 'listHead hidden'
    document.querySelector('.day').className = 'day hidden'
    playDetails.className = 'playDetails hidden'

    let keyWords = form.value

    if (keyWords === '') {
        console.log('请输入关键词')
    }
    // console.log(keyWords)
    await fetch(url + '/search?keywords=' + keyWords) //搜索
        .then(res => res.json())
        .then(data => {
            console.log(data)
            return result = data.result.songs
        }) //搜索结果
    down.innerHTML = '<li class="headLine"><span></span><span>音乐标题</span><span>歌手</span><span>专辑</span><span>时长</span><span>热度</span></li>' //清除上一次搜索结果
    startSearch()
}

hot()
async function hot() {
    await fetch(url + '/search/hot/detail')
        // await fetch('http://redrock.udday.cn:2022/search/hot/detail')
        .then(res => res.json())
        .then(data => {
            let arr = data.data
            for (let i = 0; i < oder.length; i++) { //HTML插入内容
                searchWord[i].textContent = arr[i].searchWord //热搜榜
                score[i].textContent = arr[i].score //播放量
                content[i].textContent = arr[i].content //描述
            }
            return hotSearch = arr
        })
    for (let i = 0; i < search.length; i++) {
        search[i].addEventListener('click', async function() { //热搜榜点击搜索
            find.children[0].className = '' //侧边栏聚焦清除

            //隐藏歌单列表页首
            listHead.className = 'listHead hidden'
            document.querySelector('.day').className = 'day hidden'

            await fetch(url + '/search?keywords=' + hotSearch[i].searchWord) //搜索
                .then(res => res.json())
                .then(data => {
                    return result = data.result.songs
                }) //搜索结果
            down.innerHTML = '<li class="headLine"><span></span><span>音乐标题</span><span>歌手</span><span>专辑</span><span>时长</span><span>热度</span></li>' //清除上一次搜索结果
            startSearch()
        })
    }
}

async function startSearch() {
    console.log(result)
    let songsId = new Array
        // let imgUrl = new Array
        // let musicUrl = new Array
    let artistsName = new Array
    for (let i = 0; i < result.length; i++) {
        songsId[i] = result[i].id
        const li = document.createElement('li') //创建歌曲列表
        li.setAttribute('index', i)
        if (i % 2 === 0) {
            li.style.backgroundColor = 'rgb(249,249,249)'
        }
        artistsName[i] = result[i].artists[0].name //歌手名
        li.innerHTML = '<span></span><span>' + result[i].name + '</span><span>' + artistsName[i] + '</span><span>' + result[i].album.name + '</span><span></span><span></span>'
        down.appendChild(li) //节点插入



        li.addEventListener('click', async function() {
            thumb.style.left = 0
            await fetch(url + '/song/detail?ids=' + songsId[i]) //获取歌曲详情
                .then(res => res.json())
                .then(data => {
                    // imgUrl[i] = data.songs[0].al.picUrl //图片地址
                    playImg.src = data.songs[0].al.picUrl //图片地址
                    lyricImg.src = data.songs[0].al.picUrl

                })
            await fetch(url + '/song/url?id=' + songsId[i]) //获取音乐url
                .then(res => res.json())
                .then(data => {
                    // musicUrl[i] = data.data[0].url
                    audioSrc.src = data.data[0].url //音乐地址
                })
            document.querySelector('.lyrics h1').textContent = result[i].name //歌名
            document.querySelector('.lyrics h3').textContent = artistsName[i]
            playName.textContent = result[i].name
            playSinger.textContent = artistsName[i]
                // playImg.src = imgUrl[i] //图片地址
                // audioSrc.src = musicUrl[i] //音乐地址
            audio.play()
            player.className = 'icon-pause2'

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
                    console.log(lyric)
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
                            // console.log(data.lrc)
                        let str = data.lrc.lyric.split('\n') //歌词拆分
                        let lyric = new Array //歌词存入数组
                        for (let i = 0; i < str.length; i++) {
                            lyric[i] = str[i].split(']')[1]
                        }
                        console.log(lyric)
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
                thumb.style.left = 0
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
                        console.log(lyric)
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

    //显示歌曲列表
    main.className = 'hidden';
    songsList.className = '';
}

const login = document.querySelector('.login')
const box = document.querySelector('.xbox')
const loginBox = document.querySelector('.loginBox')
const closeBox = document.querySelector('.close')
login.addEventListener('click', function() {
    box.className = 'xbox'
})
closeBox.addEventListener('click', function() {
    box.className = 'xbox hidden'
})