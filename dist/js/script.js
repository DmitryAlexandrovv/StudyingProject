/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

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
  tabsParent.addEventListener('click', e => {
    const target = e.target;

    if (target && target.classList.contains('tabheader__item')) {
      tabs.forEach((element, index) => {
        if (element == target) {
          hideTabs();
          showTab(index);
        }
      });
    }
  }); //Timer

  const deadline = '2020-09-24';

  function getTimeRemaining(deadline) {
    const t = Date.parse(deadline) - Date.parse(new Date()),
          days = Math.floor(t / (1000 * 60 * 60 * 24)),
          hours = Math.floor(t / (1000 * 60 * 60) % 24),
          minutes = Math.floor(t / (1000 * 60) % 60),
          seconds = Math.floor(t / 1000 % 60);
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
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

      if (timer.total <= 0) {
        clearInterval(timeInterval);
      }
    }
  }

  setClock('.timer', deadline); //Modal

  const modal = document.querySelector('.modal'),
        modalOpenBtns = document.querySelectorAll('[data-modal]'),
        modalTimerId = setTimeout(modalOpen, 15000);

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

  modalOpenBtns.forEach(element => {
    element.addEventListener('click', modalOpen);
  });
  modal.addEventListener('click', e => {
    const target = e.target;

    if (target && (target.classList.contains('modal') || target.getAttribute('data-close') == '')) {
      modalClose();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code == 'Escape' && modal.classList.contains('show')) {
      modalClose();
    }
  });

  function showModal() {
    if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
      modalOpen();
      window.removeEventListener('scroll', showModal);
    }
  }

  window.addEventListener('scroll', showModal); //Cards

  class Card {
    constructor(src, alt, title, description, price, parentSelector) {
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

  const getResources = async url => {
    const request = await fetch(url);

    if (!request.ok) {
      throw new Error(`Can not fetch ${url}, status ${request.status}`);
    }

    return await request.json();
  };

  getResources('http://localhost:3000/menu').then(data => {
    data.forEach(({
      img,
      altimg,
      title,
      descr,
      price
    }) => {
      new Card(img, altimg, title, descr, price, '.menu .container').render();
    });
  }); //Forms

  const forms = document.querySelectorAll('form');
  const message = {
    loading: 'img/form/spinner.svg',
    success: 'Спасибо! Скоро мы с вами свяжемся',
    failure: 'Что-то пошло не так...'
  };
  forms.forEach(item => {
    bindPostData(item);
  });

  const postData = async (url, object) => {
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: object
    };
    const response = await fetch(url, options);
    return await response.json();
  };

  function bindPostData(form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      let statusMessage = document.createElement('img');
      statusMessage.src = message.loading;
      statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
      form.insertAdjacentElement('afterend', statusMessage);
      const formData = new FormData(form);
      const object = {};
      formData.forEach(function (value, key) {
        object[key] = value;
      });
      postData("http://localhost:3000/requests", JSON.stringify(object)).then(data => {
        showThanksModal(message.success);
        setTimeout(() => {
          statusMessage.remove();
        }, 2000);
        form.reset();
      }).catch(() => {
        showThanksModal(message.failure);
        form.reset();
      });
    });
  }

  function showThanksModal(message) {
    let modal = document.querySelector('.modal'),
        modalOld = document.querySelector('.modal__dialog');
    modalOld.classList.add('hide');
    modalOpen();
    const thanksModal = document.createElement('div');
    thanksModal.classList.add('modal__dialog');
    thanksModal.innerHTML = `
            <div class="modal__content">
                <div data-close class="modal__close">x</div>
                <div class="modal__title">${message}</div>
            </div>
        `;
    modal.appendChild(thanksModal);
    setTimeout(() => {
      thanksModal.remove();
      modalOld.classList.remove('hide');
      modalOld.classList.add('show');
      modalClose();
    }, 4000);
  } //Slider


  let slider = document.querySelector('.offer__slider'),
      slides = slider.querySelectorAll('.offer__slide'),
      slidesWrapper = document.querySelector('.offer__slider-wrapper'),
      slidesField = document.querySelector('.offer__slider-inner'),
      width = window.getComputedStyle(slidesWrapper).width,
      index = 1,
      offset = 0,
      slidesCount = slides.length,
      next = slider.querySelector('.offer__slider-next'),
      prev = slider.querySelector('.offer__slider-prev'),
      current = slider.querySelector('#current'),
      total = slider.querySelector('#total');
  slidesField.style.width = 100 * slidesCount + '%';
  slidesField.style.display = 'flex';
  slidesField.style.transition = '0.5s all';
  slidesWrapper.style.overflow = 'hidden';
  slides.forEach(slide => {
    slide.style.width = width;
  });
  slider.style.position = 'relative';
  const indicators = document.createElement('ol'),
        dots = [];
  indicators.classList.add('carousel-indicators');
  slider.append(indicators);

  for (let i = 0; i < slides.length; i++) {
    const dot = document.createElement('li');
    dot.setAttribute('data-slide-to', i + 1);
    dot.classList.add('dot');
    indicators.append(dot);

    if (i == 0) {
      dot.style.opacity = '1';
    }

    dots.push(dot);
  }

  dots.forEach(element => {
    element.addEventListener('click', () => {
      const dataSlide = element.getAttribute('data-slide-to');
      index = dataSlide;
      offset = +width.slice(0, width.length - 2) * (index - 1);
      current.textContent = index < 10 ? '0' + index : index;
      slidesField.style.transform = `translateX(${-offset}px)`;
      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[index - 1].style.opacity = '1';
    });
  });
  total.textContent = slidesCount < 10 ? '0' + slidesCount : slidesCount;
  current.textContent = '01';
  next.addEventListener('click', () => {
    if (offset == +width.slice(0, width.length - 2) * (slidesCount - 1)) {
      offset = 0;
    } else {
      offset += +width.slice(0, width.length - 2);
    }

    index++;

    if (index > slidesCount) {
      index = 1;
    }

    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[index - 1].style.opacity = '1';
    current.textContent = index < 10 ? '0' + index : index;
    slidesField.style.transform = `translateX(${-offset}px)`;
  });
  prev.addEventListener('click', () => {
    if (offset == 0) {
      offset = +width.slice(0, width.length - 2) * (slidesCount - 1);
    } else {
      offset -= +width.slice(0, width.length - 2);
    }

    index--;

    if (index <= 0) {
      index = slidesCount;
    }

    dots.forEach(dot => dot.style.opacity = '0.5');
    dots[index - 1].style.opacity = '1';
    current.textContent = index < 10 ? '0' + index : index;
    slidesField.style.transform = `translateX(${-offset}px)`;
  });
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map