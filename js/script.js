// Variables clave
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const carouselContainer = document.querySelector('.carousel-container');
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const indicators = document.querySelectorAll('.carousel-indicators span');

// Cambia la diapositiva actual
function changeSlide(index) {
    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    carouselContainer.style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

// Actualiza los indicadores
function updateIndicators() {
    if (indicators.length) {
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active');
            if (index === currentSlide) {
                indicator.classList.add('active');
            }
        });
    }
}

// Eventos para los botones
if (nextButton) {
    nextButton.addEventListener('click', () => changeSlide(currentSlide + 1));
}
if (prevButton) {
    prevButton.addEventListener('click', () => changeSlide(currentSlide - 1));
}

// Eventos para los indicadores
if (indicators.length) {
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => changeSlide(index));
    });
}

// Desplazamiento automático
let autoSlide = setInterval(() => changeSlide(currentSlide + 1), 5000);

// Pausar el desplazamiento automático al interactuar
document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(autoSlide));
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => changeSlide(currentSlide + 1), 5000);
});