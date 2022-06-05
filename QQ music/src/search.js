const search = document.getElementById('search');
const search_box = search.querySelector('.box');
const search_bar = search.querySelector('.box input');
const search_card = search.querySelector('.card');
const search_results = search.querySelector('.results ul');
const search_history = search.querySelector('.history');
const search_hot = search.querySelector('.hot');
const search_cancel = search.querySelector('.search_cancel');
const btn = search.querySelector('.icon-search');

const content = document.getElementById('content');

//搜索历史
let searchHistory = (function getData() {
    let data = localStorage.getItem('music_search_history')
    if (data !== null) {
        return JSON.parse(data)
    } else {
        return []
    }
}())

// localStorage.setItem('music_search_history', JSON.stringify([]));//清除存缓

class Label {
    constructor(text, container) {
        this.p = document.createElement('p');
        this.p.textContent = text;
        this.p.className = 'label';
        this.render(container);
    }

    getSearch(fn) {
        this.p.addEventListener('click', fn.bind(null, url, text));//绑定搜索函数
    }

    render(container) {
        container.appendChild(this.p);
    }
}

//搜索框
search_bar.onfocus = function () {
    search_box.classList.add('show');
    search.classList.add('focus');
    search_bar.classList.add('focus');
    if(search_results.style.display === 'block')return 0;
    search_history.style.display = 'block';
    search_card.style.display = 'block';
    search_hot.style.display = 'block';
    search_cancel.style.display = 'block';

    content.style.display = 'none';
}

search_bar.onblur = function () {
    search.classList.remove('focus');
    search_bar.classList.remove('focus');
}

//判断字符串是否已存在
let existing = (value) => {
    for (let i = 0; i < searchHistory.length; i++) {
        if (searchHistory[i] === value) {
            return true;
        }
    }
    return false;
}

//取消搜索
search_cancel.addEventListener('click', function () {
    search_box.classList.remove('show');
    search_card.style.display = 'none';
    search_cancel.style.display = 'none';

    search_bar.value = '';

    content.style.display = 'block';

    search_results.style.display = 'none';
    search_results.innerHTML = '';
});

let url = 'http://124.221.249.219:8000/api';

import { connect } from './rank'

async function getSearch(url, keyword) {
    let res = await fetch(url + '/search?keyword=' + keyword);
    let data = await res.json();
    console.log(data);

    search_hot.style.display = 'none';
    search_history.style.display = 'none';

    //搜索结果插入到页面
    search_results.innerHTML = '';
    data.forEach(i => {
        let txt = i.title.split('(')
        let li = document.createElement('li');
        let h3 = document.createElement('h3');
        let p = document.createElement('p');
        li.className = 'search_result';
        h3.textContent = txt[0];
        p.textContent = connect(i.artist);
        li.appendChild(h3);
        li.appendChild(p);
        search_results.appendChild(li);
    });

    search_results.style.display = 'block';

    existing(keyword) ? null : searchHistory.push(keyword);//更新数据
    localStorage.setItem('music_search_history', JSON.stringify(searchHistory));

    history_add();
}

function history_add() {
    search_history.innerHTML = '';
    let h2 = document.createElement('h2');
    h2.textContent = '搜索历史';
    search_history.appendChild(h2);
    searchHistory.forEach(i => {
        let p = document.createElement('p');
        p.textContent = i;
        p.className = 'label';
        p.addEventListener('click', getSearch.bind(null, url, i));
        search_history.appendChild(p);
    });
}

if (searchHistory.length > 0) {
    history_add();
    search_history.style.display = 'block';
}

//搜索按钮
btn.addEventListener('click', () => {
    let keyword = search_bar.value;
    if (keyword === '') {
        return;
    }

    getSearch(url, keyword);
});

async function getHot(url) {
    let res = await fetch(url + '/hot');
    let data = await res.json();
    console.log(data);

    data.forEach(i => {
        let p = document.createElement('p');
        p.textContent = i;
        p.className = 'label';
        p.addEventListener('click', getSearch.bind(null, url, i));
        search_hot.appendChild(p);
    })
}

getHot(url);


