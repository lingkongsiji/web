import './calendar.css'

const header = document.getElementById('header');
const main = document.getElementById('mian');
const tp = document.querySelector('.tp');
const weeks = document.querySelector('.weeks');
const days = document.querySelector('.days');
const yy = document.querySelector('.yy');
const mm = document.querySelector('.mm');
const nextMonth = document.getElementById('nextMonth');
const prevMonth = document.getElementById('prevMonth');
const prevYear = document.getElementById('prevYear');
const nextYear = document.getElementById('nextYear');

//周一至周日的渲染
let weeksArr = ['一', '二', '三', '四', '五', '六', '日'];
weeksArr.forEach(v => {
    let li = document.createElement('li');
    li.textContent = v;
    weeks.appendChild(li);
})

class Calendar {
    constructor() {
        /**  当前年份 */
        this.currentYear = 1970;
        /**  当前月份 注意这里是从0开始记起 */
        this.currentMonth = 0;
        /**  当前几号 */
        this.currentDay = 1;
        /**  本月的第一天是星期几 */
        this.currentFirstWeekDay = 4;
        /**  本月共有多少天 */
        this.allDay = 31;
        /**  dom操作函数 */
        this.renderCallback;

        this.init(new Date())
    }

    init(date) {
        this.currentYear = date.getFullYear();
        this.currentMonth = date.getMonth() + 1;
        this.currentDay = date.getDate();
    }

    /**  获取日历中上个月需显示的天数的具体信息 */
    getPrevMonthDay() {
        let the_lastDay = checkMonth(this.currentYear, this.currentMonth - 1);
        return the_lastDay;
    }

    /**  日历中这个月需显示的天数的具体信息 */
    getNowMonthDay() {
        this.allDay = checkMonth(this.currentYear, this.currentMonth);
    }

    /**  日历中下个月需显示的天数的具体信息 */
    getNextMonthDay() {
        let lastDay = new Date(this.currentYear + '/' + this.currentMonth + '/' + this.allDay);
        return lastDay.getDay();
    }

    /**  上翻一月操作 */
    prevMonth() {
        if (this.currentMonth === 1) {
            this.currentMonth = 12;
            this.currentYear = this.currentYear - 1;
        } else {
            this.currentMonth = this.currentMonth - 1;
        }
        this.render(render);
    }

    /**  下翻一月操作 */
    nextMonth() {
        // let yy = this.currentYear;
        // let mm = this.currentMonth;
        if (this.currentMonth === 12) {
            this.currentMonth = 1;
            this.currentYear = this.currentYear + 1;
        } else {
            this.currentMonth = this.currentMonth + 1;
        }

        this.render(render);
    }

    /**  上翻一年操作 */
    prevYear() {
        this.currentYear = this.currentYear - 1;
        this.render(render);
    }

    /**  下翻一年操作 */
    nextYear() {
        this.currentYear = this.currentYear + 1;
        this.render(render);
    }

    /*
     *  渲染函数，用户新建一个实例后必须使用此函数获取最新的日期数据，接收一个回调函数
     *  dom操作函数
     */
    render(fn) {
        this.currentFirstWeekDay = (() => {
            let d = new Date(this.currentYear + '/' + this.currentMonth + '/' + 1).getDay();
            if (d === 0) {
                return 7;
            } else {
                return d;
            }
        })();
        this.getNowMonthDay()
        fn.call(this);
    }
}

const calendar = new Calendar();
calendar.render(render);

tp.addEventListener('click', () => {
    calendar.init(new Date());
    render.call(calendar);
})

nextMonth.addEventListener('click', () => {
    calendar.nextMonth()
});

prevMonth.addEventListener('click', () => {
    calendar.prevMonth()
});

nextYear.addEventListener('click', () => {
    calendar.nextYear();
});

prevYear.addEventListener('click', () => {
    calendar.prevYear();
})

function render() {
    yy.textContent = this.currentYear + '年';
    mm.textContent = this.currentMonth + '月';
    days.textContent = '';

    //当月第一天前补充
    let pd = this.getPrevMonthDay();
    for (let i = pd; i > 1 + pd - this.currentFirstWeekDay; i--) {
        let li = document.createElement('li');
        li.textContent = i;
        li.className = 'fill';
        days.prepend(li);
    }

    //渲染当月日期
    let dt = new Date()
    for (let i = 0; i < this.allDay; i++) {
        let li = document.createElement('li');
        li.textContent = i + 1;
        if (this.currentDay === i + 1 && this.currentMonth === dt.getMonth() + 1 && dt.getFullYear() === this.currentYear) {
            li.classList.add('toDay');
        }
        days.appendChild(li);
    };

    //月末补充
    let nd = this.getNextMonthDay();
    if (nd) {
        for (let i = 0; i < 7 - nd; i++) {
            let li = document.createElement('li');
            li.textContent = i + 1;
            li.className = 'fill';
            days.appendChild(li)
        }
    }
}

function checkMonth(y, m) {
    let tm;
    switch (m) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
            tm = 31;
            break;
        case 4:
        case 6:
        case 9:
        case 11:
            tm = 30;
            break;
        case 2:
            if (y % 4 == 0) {
                if (y % 400 == 0|| y % 100 != 0) {
                    tm = 29;
                } else {
                    tm = 29;
                }
            } else {
                tm = 28;
            }
            break;
        default:
            break;
    }

    return tm;
}