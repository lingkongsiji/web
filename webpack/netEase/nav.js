const url='http://localhost:3000'
let a = 0
const baner = document.querySelector('.nav>ul');
const left = document.querySelector('.left1');
const right = document.querySelector('.right1');
const li = document.querySelectorAll('.nav>ul>li');
const ol = document.querySelector('.nav>ol')
const bannersImg = document.querySelectorAll('.nav>ul img')

window.onload = async function() {
    await fetch(url + '/banner')
        .then(res => res.json())
        .then(data => { return result = data.banners })

    let imageUrl = []
    for (let i = 0; i < 5; i++) {
        imageUrl[i] = result[i].imageUrl
        bannersImg[i].src = imageUrl[i]
    }

    for (let i = 0; i < li.length; i++) {
        //创建小圆点
        let li1 = document.createElement('li');
        li1.setAttribute('index', i)
        ol.appendChild(li1);
        //圆点添加点击事件
        ol.children[i].addEventListener('click', function() {
            for (let i = 0; i < li.length; i++) {
                ol.children[i].className = '';
                // 小圆圈添加类名
                this.className = 'current';
                let index = this.getAttribute('index')
                baner.style.left = -index * 730 + 'px';
            }
        })
    }
    ol.children[0].className = 'current';

    let a = li.length;
    let b = 0
    right.addEventListener('click', function() {
        if (b < a - 1) {
            b++
            baner.style.transition = '.3s ease-out';
        } else if (b === a - 1) {
            b = 0
            baner.style.transition = 'none';
        }
        baner.style.left = -b * 730 + 'px';
        for (let i = 0; i < li.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[b].className = 'current'
    })

    left.addEventListener('click', function() {
        if (b > 0) {
            b--;
            baner.style.transition = '.3s ease-out';
        } else if (b === 0) {
            b = a - 1
            baner.style.transition = 'none';
        }
        baner.style.left = -b * 730 + 'px';
        for (let i = 0; i < li.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[b].className = 'current'
    })

    setInterval(function() {
        if (b < a - 1) {
            b++
            baner.style.transition = '.3s ease-out';
        } else if (b === a - 1) {
            b = 0
            baner.style.transition = 'none';
        }
        baner.style.left = -b * 730 + 'px';
        for (let i = 0; i < li.length; i++) {
            ol.children[i].className = '';
        }
        ol.children[b].className = 'current'
    }, 5000)

}

// 推荐歌单鼠标经过显示播放按钮
const recommend_img = document.querySelectorAll('.recommend>ul img');
const recommend_play = document.querySelectorAll('.recommend div.icon-play3');
for (let i = 0; i < recommend_img.length; i++) {
    recommend_img[i].addEventListener('mouseover', function() {
        recommend_play[i].addEventListener('mouseover', function() {
            recommend_play[i].style.opacity = 1;
        })
        recommend_play[i].style.opacity = 1;
        recommend_img[i].addEventListener('mouseout', function() {
            recommend_play[i].style.opacity = 0;
        })
    })
}