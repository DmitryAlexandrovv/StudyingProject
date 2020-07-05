window.addEventListener('DOMContentLoaded', () => {
    //Tabs

    const tabsParent = document.querySelector('.tabheader'),
          tabsContent = document.querySelectorAll('.tabcontent'),
          tabs = document.querySelectorAll('.tabheader__item');
          
    function hideTabs() {
        tabsContent.forEach(element => {
            element.classList.remove('show');
            element.classList.add('hide');
        });

        tabs.forEach(element => {
            element.classList.remove('tabheader__item_active');
        });
    }

    function showTab(index = 0) {
        tabsContent[index].classList.remove('hide');
        tabsContent[index].classList.add('show', 'previewFade');
        tabs[index].classList.add('tabheader__item_active');
    }

    hideTabs();
    showTab();

    tabsParent.addEventListener('click', (e) => {
        const target = e.target;

        if(target && target.classList.contains('tabheader__item')) {
            tabs.forEach( (element, index) => {
                if( element == target ) {
                    hideTabs();
                    showTab(index);
                }
            });
        }
    });

    //Timer

    const deadline = '2020-07-24';

    function getTimeRemaining(deadline) {
        const t = Date.parse(deadline) - Date.parse(new Date()),
              days = Math.floor(t / (1000 * 60 * 60 * 24)),
              hours = Math.floor((t / (1000 * 60 * 60)) % 24),
              minutes = Math.floor((t / (1000 * 60)) % 60),
              seconds = Math.floor((t / 1000) % 60);
        
        return {
            'total' : t,
            'days' : days,
            'hours' : hours,
            'minutes' : minutes,
            'seconds' : seconds
        };
    }

    function setClock(selector, deadline) {
        const timer = document.querySelector(selector),
              days = timer.querySelector('#days'),
              hours = timer.querySelector('#hours'),
              minutes = timer.querySelector('#minutes'),
              seconds = timer.querySelector('#seconds'),
              timeInterval = setInterval(updateClock, 1000);

        updateClock();
              
        function updateClock() {
            const timer = getTimeRemaining(deadline);

            days.innerHTML = +timer.days >= 0 && +timer.days <= 9 ? '0' + timer.days : timer.days;
            hours.innerHTML = +timer.hours >= 0 && +timer.hours <= 9 ? '0' + timer.hours : timer.hours;
            minutes.innerHTML = +timer.minutes >= 0 && +timer.minutes <= 9 ? '0' + timer.minutes : timer.minutes;
            seconds.innerHTML = +timer.seconds >= 0 && +timer.seconds <= 9 ? '0' + timer.seconds : timer.seconds;
    
            if( timer.total <= 0) {
                clearInterval(timeInterval);
            }
        }
    }

    setClock('.timer', deadline);

    //Modal

    const modal = document.querySelector('.modal'),
          modalOpenBtns = document.querySelectorAll('[data-modal]'),
          modalCloseBtns = document.querySelectorAll('[data-close]'),
          modalTimerId = setTimeout(modalOpen,15000);

    function modalClose() {
        modal.classList.remove('show');
        modal.classList.add('hide');
        document.body.style.overflow = 'auto';
    }

    function modalOpen() {
        modal.classList.remove('hide');
        modal.classList.add('show');
        document.body.style.overflow = 'hidden';
        clearInterval(modalTimerId);
    }

    modalOpenBtns.forEach((element) => {
        element.addEventListener('click', modalOpen);
    });

    modalCloseBtns.forEach((element) => {
        element.addEventListener('click', modalClose);
    });

    modal.addEventListener('click', (e) => {
        const target = e.target;

        if(target && !target.classList.contains('modal-dialog')) {
            modalClose();
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('show')) {
            modalClose();
        }
    });

    function showModal() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen();
            window.removeEventListener('scroll', showModal);
        }
    }

    window.addEventListener('scroll', showModal);

    //Cards

    class Card {
        constructor(src, alt, title, description, price, parentSelector){
            this.src = src;
            this.alt = alt;
            this.title = title;
            this.description = description;
            this.price = price;
            this.parent = document.querySelector(parentSelector);
            this.transfer = 27;
            this.changeToUAH();
        }

        changeToUAH() {
            this.price = this.price * this.transfer;
        }

        render() {
            const item = document.createElement('div');

            item.innerHTML = `<div class="menu__item">
                                  <img src=${this.src} alt=${this.alt}>
                                  <h3 class="menu__item-subtitle">${this.title}</h3>
                                  <div class="menu__item-descr">${this.description}</div>
                                  <div class="menu__item-divider"></div>
                                  <div class="menu__item-price">
                                      <div class="menu__item-cost">Цена:</div>
                                      <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
                                  </div>
                              </div>`;

            this.parent.append(item);
        }
    }

    new Card(
        "img/tabs/vegy.jpg",
        "vegy",
        'Меню "Фитнес"',
        'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
        "9",
        ".menu .container"
    ).render();

    new Card(
        "img/tabs/elite.jpg",
        "elite",
        'Меню “Премиум”',
        'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
        "15",
        ".menu .container"
    ).render();

    new Card(
        "img/tabs/post.jpg",
        "post",
        'Меню "Постное"',
        'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
        "13",
        ".menu .container"
    ).render();
});