// Función para cambiar las imágenes del carrusel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;
const prevButton = document.querySelector('.carousel-prev');
const nextButton = document.querySelector('.carousel-next');
const indicators = document.querySelectorAll('.carousel-indicators span');

function changeSlide(index) {
    if (index < 0) {
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        currentSlide = 0;
    } else {
        currentSlide = index;
    }
    const offset = -currentSlide * 100;
    document.querySelector('.carousel-container').style.transform = `translateX(${offset}%)`;
    updateIndicators();
}

function updateIndicators() {
    indicators.forEach((indicator, index) => {
        indicator.classList.remove('active');
        if (index === currentSlide) {
            indicator.classList.add('active');
        }
    });
}

nextButton.addEventListener('click', () => changeSlide(currentSlide + 1));
prevButton.addEventListener('click', () => changeSlide(currentSlide - 1));
indicators.forEach((indicator, index) => {
    indicator.addEventListener('click', () => changeSlide(index));
});

// Iniciar el carrusel automáticamente
setInterval(() => changeSlide(currentSlide + 1), 5000);
