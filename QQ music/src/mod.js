let url = 'http://124.221.249.219:8000/api';

class Title {
    constructor(title) {
        this.title = title;
    }

    render(container) {
        let title = document.createElement('h2');
        title.innerText = this.title;
        container.appendChild(title);
    }
}

import play_png from '../image/play-one.svg';

class ListItem {
    constructor(data) {
        this.item = document.createElement('li');
        this.cover = document.createElement('div');
        this.txt = document.createElement('div');
        this.coverImg = document.createElement('img');

        this.cover.className = 'cover';
        this.txt.className = 'txt';
    }

    setViews(data) {
        this.views= document.createElement('div');
        this.views.className = 'views';
        this.count = document.createElement('span');
        this.count.textContent = `${data.views}万`;
        this.play_png = document.createElement('img');
        this.play_png.src = play_png;
        this.views.appendChild(this.play_png);
        this.views.appendChild(this.count);
        this.cover.appendChild(this.views)
    }

    setClassName(className) {
        this.item.className = className;
    }

    setIcon(data) {
        this.span= document.createElement('span');
        this.icon= document.createElement('img');
        this.icon.src = data.icon;
        this.span.appendChild(this.icon);

        this.title = document.createElement('p');
        this.title.textContent = data.title;
        this.span.appendChild(this.title);

        this.cover.appendChild(this.span);
    }

    render(container) {
        this.container=container;
        this.item.appendChild(this.cover);
        this.item.appendChild(this.txt);
        this.cover.appendChild(this.coverImg);
        container.appendChild(this.item);
    }
}

//发送请求
async function getRecommendations(url) {
    let res = await fetch(url + '/recommendations');
    let data = await res.json();

    const mod = document.querySelectorAll('.mod');
    let scroll = [];
    for (let i = 0; i < mod.length; i++) {
        scroll[i] = mod[i].querySelector('.scroll');
    }

    let { column, offical, tatsujin } = data;

    offical.forEach(item => {
        let listItem = new ListItem(offical);
        listItem.setViews(item);
        listItem.coverImg.src = item.cover;
        listItem.txt.innerText = item.title;
        listItem.render(scroll[0]);
    });

    tatsujin.forEach(item => {
        let listItem = new ListItem(tatsujin);
        listItem.setViews(item);
        listItem.coverImg.src = item.cover;
        listItem.txt.innerText = item.title;
        listItem.render(scroll[1]);
    });

    console.log(column);

    column.forEach(item => {
        let listItem = new ListItem(column);
        listItem.setClassName('column');
        listItem.coverImg.src = item.background;
        listItem.txt.innerText = item.description;
        listItem.setIcon(item);
        listItem.render(scroll[2]);
    });
}

getRecommendations(url)
