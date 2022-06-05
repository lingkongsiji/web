const header = document.getElementById('header');
const recommend = document.getElementById('recommend');
const rank = document.getElementById('rank');

const hea_rec = header.querySelector('.recommend');
const hea_rank = header.querySelector('.ranking');

let url = 'http://124.221.249.219:8000/api';

export function connect(arr) {
    if (arr.length > 1) {
        let str = arr[0];
        for (let i = 1; i < arr.length; i++) {
            str += '/' + arr[i];
        }
        return str;
    } else
        return arr;
}

class List {
    constructor(data) {
        this.index = 0;
        this.rank_list_bd = document.createElement('div');
        this.rank_list_bd.className = 'rank_list_bd';

        this.h2 = document.createElement('h2');
        this.h2.innerText = data.title;

        this.rank_list = document.createElement('ol');
        data.top3.forEach(i => {
            let top = document.createElement('span');
            top.textContent = `${++this.index}.`;

            let txt = document.createElement('p');
            txt.className = 'name';
            txt.innerText = `${i.title}-`;

            let artist = document.createElement('p');
            artist.className = 'artist';
            artist.textContent = `${connect(i.artist)}`;

            let li = document.createElement('li');
            li.appendChild(top);
            li.appendChild(txt);
            li.appendChild(artist);
            this.rank_list.appendChild(li);
        });
    }

    render(container) {
        this.rank_list_bd.appendChild(this.h2);
        this.rank_list_bd.appendChild(this.rank_list);
        container.appendChild(this.rank_list_bd);
    }
}

import play_png from '../image/play-one.svg';

class Cover {
    constructor(data) {
        this.cover = document.createElement('div');
        this.cover.className = 'rank_list_media';

        this.img = document.createElement('img');
        this.img.src = data.cover;
        this.cover.appendChild(this.img);

        this.span = document.createElement('span');
        this.span.textContent = `每${data.update_frequence}更新`;
        this.span.className = 'update';

        this.count = document.createElement('div');
        this.play = document.createElement('img');
        this.play.src = play_png;
        this.num = document.createElement('span');
        this.num.textContent = `${data.views / 10000}万`;
        this.count.appendChild(this.play);
        this.count.appendChild(this.num);
        this.count.className = 'count';
    }

    render(container) {
        this.cover.appendChild(this.span);
        this.cover.appendChild(this.count);
        container.appendChild(this.cover);
    }
}

class RankList {
    constructor(data) {
        this.data = data;
        this.li = document.createElement('li');

        this.list = new List(data);
        this.list.render(this.li);

        this.cover = new Cover(data);
        this.cover.render(this.li);
    }

    render(container) {
        container.appendChild(this.li);
    }
}

import Sortable from 'sortablejs';

async function getRank(url) {
    let res = await fetch(url + '/ranking');
    let data = await res.json();

    console.log(data);

    const ranking = rank.querySelector('.rank_list');

    new Sortable(ranking, {
        animation: 150,
        ghostClass: 'blue-background-class'
    });

    data.forEach(item => {
        let rankList = new RankList(item);
        rankList.render(ranking);
    });
}

getRank(url);

hea_rec.addEventListener('click', () => {
    hea_rec.classList.add('current');
    hea_rank.classList.remove('current');

    recommend.style.display = 'block';
    rank.style.display = 'none';
});
hea_rank.addEventListener('click', () => {
    hea_rank.classList.add('current');
    hea_rec.classList.remove('current');

    recommend.style.display = 'none';
    rank.style.display = 'block';
});