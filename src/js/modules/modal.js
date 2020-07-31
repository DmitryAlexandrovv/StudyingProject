function modalClose(modalSelector) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('show');
    modal.classList.add('hide');
    document.body.style.overflow = 'auto';
}

function modalOpen(modalSelector, modalTimerId) {
    const modal = document.querySelector(modalSelector);

    modal.classList.remove('hide');
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';
    clearInterval(modalTimerId);
}

function modal(modalSelector, triggerSelector, modalTimerId) {
    //Modal

    const modal = document.querySelector(modalSelector),
          modalOpenBtns = document.querySelectorAll(triggerSelector);

    modalOpenBtns.forEach((element) => {
        element.addEventListener('click', () => modalOpen(modalSelector, modalTimerId));
    });

    modal.addEventListener('click', (e) => {
        const target = e.target;
        if(target && (target.classList.contains('modal') || target.getAttribute('data-close') == '')) {
            modalClose(modalSelector);
        }
    });

    document.addEventListener('keydown', (e) => {
        if(e.code == 'Escape' && modal.classList.contains('show')) {
            modalClose(modalSelector);
        }
    });

    function showModal() {
        if(window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
            modalOpen(modalSelector, modalTimerId);
            window.removeEventListener('scroll', showModal);
        }
    }

    window.addEventListener('scroll', showModal);
}

export default modal;
export {modalOpen, modalClose};