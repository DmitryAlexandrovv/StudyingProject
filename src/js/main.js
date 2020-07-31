import tabs from './modules/tabs';
import timer from './modules/timer';
import slider from './modules/slider';
import modal from './modules/modal';
import forms from './modules/forms';
import cards from './modules/cards';
import calc from './modules/calc';
import {modalOpen} from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {
    const modalTimerId = setTimeout(() => modalOpen('.modal', modalTimerId),15000);

    tabs('.tabheader', '.tabcontent', '.tabheader__item', 'tabheader__item_active');
    timer('2020-09-24', '.timer');
    modal('.modal', '[data-modal]', modalTimerId);
    forms('form', modalTimerId);
    cards();
    calc();
    slider({
        container: '.offer__slider',
        wrapper: '.offer__slider-wrapper',
        slide: '.offer__slide',
        field: '.offer__slider-inner',
        arrowNext: '.offer__slider-next',
        arrowPrev: '.offer__slider-prev',
        counterCurrent: '#current',
        counterTotal: '#total',
    });
});