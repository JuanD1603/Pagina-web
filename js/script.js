// Variables clave
let currentSlide = 0; // Índice de la diapositiva actual en el carrusel.
const slides = document.querySelectorAll('.carousel-slide'); // Selecciona todos los elementos de diapositiva en el carrusel.
const totalSlides = slides.length; // Cuenta el número total de diapositivas.
const carouselContainer = document.querySelector('.carousel-container'); // Selecciona el contenedor que contiene las diapositivas.
const prevButton = document.querySelector('.carousel-prev'); // Botón para pasar a la diapositiva anterior.
const nextButton = document.querySelector('.carousel-next'); // Botón para pasar a la diapositiva siguiente.
const indicators = document.querySelectorAll('.carousel-indicators span'); // Selecciona los indicadores del carrusel, si existen.

// Función para cambiar a una diapositiva específica
function changeSlide(index) {
    if (index < 0) {
        // Si el índice es menor que 0, se mueve a la última diapositiva.
        currentSlide = totalSlides - 1;
    } else if (index >= totalSlides) {
        // Si el índice es mayor o igual al número total de diapositivas, se mueve a la primera diapositiva.
        currentSlide = 0;
    } else {
        // Si el índice está dentro de los límites, simplemente actualiza a esa diapositiva.
        currentSlide = index;
    }
    const offset = -currentSlide * 100; // Calcula el desplazamiento necesario para mostrar la diapositiva correcta.
    carouselContainer.style.transform = `translateX(${offset}%)`; // Desplaza el contenedor horizontalmente usando transform.
    updateIndicators(); // Actualiza los indicadores para reflejar la diapositiva actual.
}

// Función para actualizar los indicadores visuales
function updateIndicators() {
    if (indicators.length) {
        // Solo actualiza si hay indicadores definidos.
        indicators.forEach((indicator, index) => {
            indicator.classList.remove('active'); // Elimina la clase activa de todos los indicadores.
            if (index === currentSlide) {
                // Añade la clase activa al indicador correspondiente a la diapositiva actual.
                indicator.classList.add('active');
            }
        });
    }
}

// Eventos para los botones
if (nextButton) {
    // Si el botón "Siguiente" existe, se añade un evento para cambiar a la siguiente diapositiva.
    nextButton.addEventListener('click', () => changeSlide(currentSlide + 1));
}
if (prevButton) {
    // Si el botón "Anterior" existe, se añade un evento para cambiar a la diapositiva anterior.
    prevButton.addEventListener('click', () => changeSlide(currentSlide - 1));
}

// Eventos para los indicadores
if (indicators.length) {
    // Si hay indicadores, se añaden eventos para cambiar de diapositiva al hacer clic en cada indicador.
    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => changeSlide(index));
    });
}

// Desplazamiento automático
let autoSlide = setInterval(() => changeSlide(currentSlide + 1), 5000); // Cambia automáticamente a la siguiente diapositiva cada 5 segundos.

// Pausar el desplazamiento automático al interactuar
document.querySelector('.carousel').addEventListener('mouseenter', () => clearInterval(autoSlide)); 
// Cuando el usuario coloca el mouse sobre el carrusel, se detiene el desplazamiento automático.
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    // Cuando el usuario mueve el mouse fuera del carrusel, reinicia el desplazamiento automático.
    autoSlide = setInterval(() => changeSlide(currentSlide + 1), 5000);
});
if(localStorage.contadorvisitas){
    localStorage.contadorvisitas = parseInt(localStorage.contadorvisitas)+1;
}else {
    localStorage.contadorvisitas= 1;
}
document.getElementById("conteovisitas").innerText = "numero de tus visitas : 1"+ localStorage.contadorvisitas;
