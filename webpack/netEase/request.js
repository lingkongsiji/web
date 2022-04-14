// 'http://redrock.udday.cn:2022/'

// fetch('http://localhost:3000/likelist?uid=' + 1621578716) //歌单详情
//     .then(res => res.json())
//     .then(data => {
//         console.log(data)
//     })

const url = 'http://localhost:3000'
// const url = 'http://redrock.udday.cn:2022'

const baner = document.querySelector('.nav>ul');
const left = document.querySelector('.left1');
const right = document.querySelector('.right1');
const li = document.querySelectorAll('.nav>ul>li');
const ol = document.querySelector('.nav>ol')
const bannersImg = document.querySelectorAll('.nav>ul img')
const box = document.querySelector('.xbox')
const listHead = document.querySelector('.listHead') //歌单列表页首
const landing = document.getElementById('getUser');
const down = document.getElementById('list') //列表
const audioSrc = document.querySelector('.song audio') //播放源
const audio = document.getElementById('audio')
const main = document.querySelector('main');

const listShow=require('./songsList').listShow
landing.addEventListener('click', getUser)
async function getUser() {
    let userName = document.querySelector('.login a')
    let img = document.querySelector('.login img')
    let myList = document.getElementById('myList')
    let collection = document.getElementById('collection')
    // let myLike = myList.querySelectorAll('a')

    let myArr = new Array
    let myArr1 = new Array
    let myArr2 = new Array

    let email = document.getElementById('email').value
    let password = document.getElementById('password').value

    await fetch(url + '/login?email=' + email + '&password=' + password, { credentials: 'include' })
        // await fetch(url+'/login?email='+email+'&password='+password, { credentials: 'include' })
        .then(res => res.json())
        .then(data => {
            console.log(data)
            return result = data
        }) //登录
    await fetch(url + '/user/detail?uid=' + result.account.id + '?cookie=' + result.cookie) //用户详情
        // await fetch(url +'/user/detail?uid=' + result.account.id) //用户详情
        .then(res => res.json())
        .then(data => {
            userName.textContent = data.profile.nickname //用户名
            img.src = data.profile.avatarUrl //头像
            console.log('用户详情')
            console.log(data)
        })

    await fetch(url + '/user/playlist?uid=' + result.account.id) //用户歌单
        // await fetch(url +'user/playlist?uid=1621578716') //用户歌单
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.playlist.length; i++) {
                myArr[i] = data.playlist[i].id
                myArr1[i] = data.playlist[i].name
                myArr2[i] = data.playlist[i].creator.nickname
            }
            console.log('用户歌单')
            console.log(data)
        })
    console.log(myArr[0])

    let myLike = myList.querySelector('a')
    myLike.innerHTML = '我喜欢的音乐'

    await fetch(url + '/likelist?uid=' + result.account.id + '&cookie=' + encodeURIComponent(result.cookie))
        .then(res => res.json())
        .then(data => {
            console.log(data)

            myLike.addEventListener('click', async () => {
                document.querySelector('.day').className = 'day hidden' //日推列表头隐藏
                find.children[0].className = '' //侧边栏聚焦清除
                listHead.className = 'listHead' //显示普通歌单列表页首
                down.innerHTML = '<li class="headLine"><span></span><span>标题</span><span>歌手</span><span>专辑</span><span>时间</span></li>' //清除上一次搜索结果

                main.className = 'hidden';
                songsList.className = '';
            })
        })

    // await fetch(url +'/playlist/detail?id=' + myArr[1])//歌单详情
    for (let i = 1; i < myArr.length; i++) {
        if (myArr2[i] !== result.profile.nickname)
            break
        let li = document.createElement('li')
        li.innerText = '♪' + myArr1[i]
        myList.appendChild(li) //节点插入

        li.addEventListener('click', async function () {
            listHead.className = 'listHead' //显示普通歌单列表页首
            down.innerHTML = '<li class="headLine"><span></span><span>标题</span><span>歌手</span><span>专辑</span><span>时间</span></li>' //清除上一次搜索结果
            await fetch(url + '/playlist/detail?id=' + myArr[i]) //歌单详情
                .then(res => res.json())
                .then(data => {
                    listHead.querySelector('.title').textContent = data.playlist.name
                    listHead.querySelector('img').src = data.playlist.coverImgUrl
                    listHead.querySelectorAll('.details p')[0].textContent = '标签:' + data.playlist.tags
                    listHead.querySelectorAll('.details p')[2].textContent = '简介:' + data.playlist.description

                    let arr = data.playlist.tracks
                    console.log(arr)
                    for (let i = 0; i < arr.length; i++) {
                        console.log('标题:' + arr[i].name + '歌手:' + arr[i].ar[0].name)
                    }
                    return result = arr
                })
            //播放器展示歌曲信息
            await fetch(url + '/song/url?id=' + result[i].id) //获取音乐url
                .then(res => res.json())
                .then(data => {
                    audio.pause()
                    audioSrc.src = data.data[0].url //音乐地址
                })

            // playImg.src = result[0].al.picUrl
            // playName.textContent = result[0].name
            // playSinger.textContent = result[0].ar[0].name
            // console.log(listArr[i])

            listShow() //歌单展示
            //显示歌曲列表
            main.className = 'hidden';
            songsList.className = '';
        })
    }

    for (let i = 1; i < myArr.length; i++) {
        if (myArr2[i] !== result.profile.nickname) {
            let li = document.createElement('li')
            li.innerText = '♪' + myArr1[i]
            collection.appendChild(li) //节点插入

            li.addEventListener('click', async function () {
                listHead.className = 'listHead' //显示普通歌单列表页首
                down.innerHTML = '<li class="headLine"><span></span><span>标题</span><span>歌手</span><span>专辑</span><span>时间</span></li>' //清除上一次搜索结果
                await fetch(url + '/playlist/detail?id=' + myArr[i]) //歌单详情
                    // await fetch('http://localhost:3000/playlist/detail?id=' + myArr[i]) //歌单详情
                    .then(res => res.json())
                    .then(data => {
                        listHead.querySelector('.title').textContent = data.playlist.name
                        listHead.querySelector('img').src = data.playlist.coverImgUrl
                        listHead.querySelectorAll('.details p')[0].textContent = '标签:' + data.playlist.tags
                        listHead.querySelectorAll('.details p')[2].textContent = '简介:' + data.playlist.description

                        let arr = data.playlist.tracks
                        console.log(arr)
                        for (let i = 0; i < arr.length; i++) {
                            console.log('标题:' + arr[i].name + '歌手:' + arr[i].ar[0].name)
                        }
                        return result = arr
                    })
                //播放器展示歌曲信息

                listShow() //歌单展示
                //显示歌曲列表
                main.className = 'hidden';
                songsList.className = '';
            })
        }
    }
    box.className = 'xbox hidden'
}

// getUser()

fetch(url + '/countries/code/list')
    .then(res => res.json())
    .then(data => {
        console.log(data)
    })


function setCookie(cname, cvalue, exdays) {
    let d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
}

function getCookie(cname) {
    let name = cname + "=";
    let ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i].trim();
        if (c.indexOf(name) == 0) { return c.substring(name.length, c.length); }
    }
    return "";
}
let user = getCookie("username");
let userId = getCookie('ID')
async function checkCookie() {
    if (user != "") {
        alert("欢迎 " + user + " 再次访问");
        console.log('用户id:' + userId)
    } else {
        await fetch(url + '/login?email=yhl20021117@163.com&password=20021117@yhl', { credentials: 'include' })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                console.log(data.account.userName)
                console.log(data.account.id)
                return result = data.account
            })
        user = result.userName;
        userId = result.id
        if (user != "" && user != null) {
            setCookie("username", user, 30);
            setCookie('ID', userId, 30);
        }
    }
}