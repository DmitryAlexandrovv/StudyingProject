import {modalOpen, modalClose} from './modal';
import {postData} from '../services/services';

function forms(formSelector, modalTimerId){
    //Forms

    const forms = document.querySelectorAll(formSelector);

    const message = {
        loading: 'img/form/spinner.svg',
        success: 'Спасибо! Скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostData(item);
    });

    function bindPostData(form) {
        form.addEventListener('submit', (e) => {
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
            formData.forEach(function(value, key){
                object[key] = value;
            });

            postData("http://localhost:3000/requests", JSON.stringify(object))
            .then((data) => {
                showThanksModal(message.success);
                setTimeout(() => {
                    statusMessage.remove();
                }, 2000);
                form.reset();
            })
            .catch(() => {
                showThanksModal(message.failure);
                form.reset();
            });
        });
    }

    function showThanksModal(message) {
        let modal = document.querySelector('.modal'),
            modalOld = document.querySelector('.modal__dialog');

        modalOld.classList.add('hide');
        modalOpen('.modal', modalTimerId);

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
            modalClose('.modal');
        },4000);
    }
}

export default forms;