const main = document.querySelector('main');
const find = document.querySelector('.cloud');
const mine = document.querySelector('.myMusic');
// find.children[0].className='focus find';

find.children[0].addEventListener('click', function() {
    main.className = '';
    songsList.className = 'hidden';
})

for (let i = 0; i < find.children.length; i++) {
    find.children[i].addEventListener('click', function() {
        for (let i = 0; i < find.children.length; i++) {
            find.children[i].className = '';
        }
        for (let i = 0; i < mine.children.length; i++) {
            mine.children[i].className = '';
        }
        this.className = 'focus find';
    })
}

for (let i = 0; i < mine.children.length; i++) {
    mine.children[i].addEventListener('click', function() {
        for (let i = 0; i < mine.children.length; i++) {
            mine.children[i].className = '';
        }
        for (let i = 0; i < find.children.length; i++) {
            find.children[i].className = '';
        }
        this.className = 'focus';
    })
}
const dropdown = document.querySelectorAll('button.head')
const show = document.querySelectorAll('.playList>ul')

for (let i = 0; i < dropdown.length; i++) {
    show[i].className = 'hidden';
    dropdown[i].addEventListener('click', function() {
        show[i].classList.toggle("hidden")
    })
}