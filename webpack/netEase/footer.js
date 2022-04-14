const playImg = document.querySelector('.song img') //封面
const playName = document.querySelector('.song .name') //歌名
const playSinger = document.querySelector('.song .singer') //歌手
const audioSrc = document.querySelector('.song audio') //播放源
const range = document.querySelector('.range')
const main = document.querySelector('main');

// range.addEventListener('mouseover', function() {
//     range.children[0].className = '';
//     range.addEventListener('mouseout', function() {
//         range.children[0].className = 'hidden';
//     })
// })

const audio = document.getElementById('audio')
const player = document.querySelector('.play .icon-play3')

player.addEventListener('click', function() {
    if (audio.paused === true) {
        player.className = 'icon-pause2'
        audio.play()
    } else if (audio.paused === false) {
        player.className = 'icon-play3'
        audio.pause()
    }
})

const previous = document.querySelector('.icon-previous2')
const next = document.querySelector('.icon-next2')

const slider = document.querySelector('.range')
const thumb = document.querySelector('.thumb');
// console.log(thumb)

// audio.ontimeupdate = () => {
//     thumb.style.left = 420 * audio.currentTime / audio.duration + 'px'
// }

//进度条拖拽
thumb.onmousedown = function(event) {
    event.preventDefault();

    let shiftX = event.clientX - thumb.getBoundingClientRect().left;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;

        if (newLeft < 0) {
            newLeft = 0;
        }
        let rightEdge = slider.offsetWidth - thumb.offsetWidth;
        if (newLeft > rightEdge) {
            newLeft = rightEdge;
        }
        document.querySelector('.range div').style.width = newLeft + 'px'
    }

    let nowLeft = event.clientX - shiftX - slider.getBoundingClientRect().left;
    let duration = audio.duration
    let progress = duration * (420 - nowLeft) / 420

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
        audio.currentTime = progress
        audio.play()
        thumb.style.right = 0
    }
};

thumb.ondragstart = function() {
    return false;
};


const slider1 = document.querySelector('.volume>div')
const sliderHeight = document.querySelector('.volume>div>div')
const thumb1 = document.querySelector('.volume>div>div>div');

thumb1.onmousedown = function(event) {
    event.preventDefault();

    let shiftY = thumb1.getBoundingClientRect().top - event.clientY;

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
        let newBottom = event.clientY - shiftY - slider1.getBoundingClientRect().top;

        if (newBottom < 0) {
            newBottom = 0;
        }
        let topEdge = slider1.offsetHeight - thumb1.offsetHeight;
        if (newBottom > topEdge) {
            newBottom = topEdge;
        }

        sliderHeight.style.height = slider1.offsetHeight - newBottom + 'px'
            // thumb1.style.top = 0 + 'px';
        audio.volume = parseInt(sliderHeight.offsetHeight * 10 / slider1.offsetHeight) / 10
    }

    // let nowLeft = event.clientY - shiftY - slider.getBoundingClientRect().top;

    function onMouseUp() {
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
        // audio.play()
    }

};

thumb1.ondragstart = function() {
    return false;
};





const playDetails = document.querySelector('.playDetails')
    // playImg.addEventListener('click', () => {
    //     playDetails.classList.toggle("hidden")
    //     main.className = 'hidden';
    // })
document.querySelector('.song .cover').addEventListener('click', () => {
    playDetails.style.transition = 'translate(0) .3s ease-out'
    playDetails.classList.toggle("hidden")
    main.className = 'hidden';

    if (songsList.className === '') {
        main.className = 'hidden';
    } else if (songsList.className === 'hidden' && playDetails.className !== 'playDetails') {
        main.className = ''
    } else if (playDetails.className === 'playDetails' && songsList.className === '') {
        songsList.className = 'hidden'
    }
})

const lyricImg = document.querySelector('.playDetails .img img')
let d = 1
setInterval(() => {
    if (audio.paused === false) {
        if (d < 360) {
            d++
        } else if (d === 360) {
            d = 1
        }
        let deg = 'rotate(' + d + 'deg)'
        lyricImg.style.transition = '.1s'
        lyricImg.style.transform = deg
    }
}, 99);