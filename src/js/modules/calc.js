function calc(){
    //Calc
    const calcResult = document.querySelector('.calculating__result span');
    let sex, height, weight, age, ratio;

    if(localStorage.getItem('sex')){
        sex = localStorage.getItem('sex');
    } else {
        sex = 'female';
        localStorage.setItem('sex', sex);
    }
    if(localStorage.getItem('ratio')){
        ratio = localStorage.getItem('ratio');
    } else {
        ratio = 1.375;
        localStorage.setItem('ratio', ratio);
    }

    function initCalcSettings(selector, activeClass) {
        const elements = document.querySelectorAll(selector);

        elements.forEach(element => {
            element.classList.remove(activeClass);
            if(element.getAttribute('data-ratio') == ratio){
                element.classList.add(activeClass);
            }
            if(element.getAttribute('id') == sex){
                element.classList.add(activeClass);
            }
        });
    }

    initCalcSettings('#gender div', 'calculating__choose-item_active');
    initCalcSettings('.calculating__choose_big div', 'calculating__choose-item_active');

    initCalcSettings();

    function calcTotal() {
        if(!sex || !height || !weight || !age || !ratio){
            calcResult.textContent = '____';
            return;
        }

        if(sex == 'female'){
            calcResult.textContent = ((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio).toFixed(0);
        } else {
            calcResult.textContent = ((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio).toFixed(0);
        }
    }

    calcTotal();

    function getStaticInformation(parentSelector, activeClass) {
        const fields = document.querySelectorAll(`${parentSelector} div`);

        fields.forEach(elem => {
            elem.addEventListener('click', (e) => {
                if(e.target && e.target.getAttribute('data-ratio')){
                    ratio = +e.target.getAttribute('data-ratio');
                    localStorage.setItem('ratio', ratio);
                } else {
                    sex = e.target.getAttribute('id');
                    localStorage.setItem('sex', sex);
                }
    
                console.log(ratio, sex);
    
                fields.forEach(element => {
                    element.classList.remove('calculating__choose-item_active');
                });
                e.target.classList.add('calculating__choose-item_active');
    
                calcTotal();
            });
        });
    }

    function getDynamicInformation(selector) {
        const field = document.querySelector(selector);

        field.addEventListener('input', (e) => {
            if(e.target.value.match(/\D/)) {
                e.target.style.border = '1px solid red';
            } else {
                e.target.style.border = 'none';
            }

            if(e.target.getAttribute('id') == 'height'){
                height = +e.target.value;
            }
            if(e.target.getAttribute('id') == 'weight'){
                weight = +e.target.value;
            }
            if(e.target.getAttribute('id') == 'age'){
                age = +e.target.value;
            }

            calcTotal();
        });
    }

    getStaticInformation('#gender', 'calculating__choose-item_active');
    getStaticInformation('.calculating__choose_big', 'calculating__choose-item_active');
    getDynamicInformation('#height');
    getDynamicInformation('#weight');
    getDynamicInformation('#age');
}

export default calc;