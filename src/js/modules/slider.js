function slider({container, slide, wrapper, field, arrowNext, arrowPrev, counterCurrent, counterTotal}){
    //Slider
    let slider = document.querySelector(container),
        slides = slider.querySelectorAll(slide),
        slidesWrapper = document.querySelector(wrapper),
        slidesField = document.querySelector(field),
        width = window.getComputedStyle(slidesWrapper).width,
        index = 1,
        offset = 0,
        slidesCount = slides.length,
        next = slider.querySelector(arrowNext),
        prev = slider.querySelector(arrowPrev),
        current = slider.querySelector(counterCurrent),
        total = slider.querySelector(counterTotal);

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

    for(let i = 0;i < slides.length;i++) {
        const dot = document.createElement('li');
        dot.setAttribute('data-slide-to', i + 1);
        dot.classList.add('dot');
        indicators.append(dot);
        if(i == 0) {
            dot.style.opacity = '1';
        }
        dots.push(dot);
    }
    
    dots.forEach(element => {
        element.addEventListener('click', () => {
            const dataSlide = element.getAttribute('data-slide-to');
            index = dataSlide;
            offset = +width.slice(0,width.length - 2) * (index - 1);

            current.textContent = index < 10 ? '0' + index : index;
            slidesField.style.transform = `translateX(${-offset}px)`;

            dots.forEach(dot => dot.style.opacity = '0.5');
            dots[index - 1].style.opacity = '1';
        });
    });

    total.textContent = slidesCount < 10 ? '0' + slidesCount : slidesCount;
    current.textContent = '01';

    next.addEventListener('click', () => {
        if(offset == +width.slice(0,width.length - 2) * (slidesCount - 1)) {
            offset = 0;
        } else {
            offset += +width.slice(0,width.length - 2);
        }

        index++;
        if(index > slidesCount) {
            index = 1;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[index - 1].style.opacity = '1';

        current.textContent = index < 10 ? '0' + index : index;
        slidesField.style.transform = `translateX(${-offset}px)`;
    });

    prev.addEventListener('click', () => {
        if(offset == 0) {
            offset = +width.slice(0,width.length - 2) * (slidesCount - 1);
        } else {
            offset -= +width.slice(0,width.length - 2);
        }

        index--;
        if(index <= 0) {
            index = slidesCount;
        }

        dots.forEach(dot => dot.style.opacity = '0.5');
        dots[index - 1].style.opacity = '1';

        current.textContent = index < 10 ? '0' + index : index;
        slidesField.style.transform = `translateX(${-offset}px)`;
    });
}

export default slider;