const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const nextButton = document.querySelector('#n')

//counter 

let counter = 0;
const scrollWidth = carouselImages[0].clientWidth;

//transition

const transitionSlideForward = () => {
    carouselSlide.style.transition = 'transform 1s ease-in';
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)'; 
}

const transitionSlideBack = () => {
    carouselSlide.style.transition = 'transform 1s ease-in';
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
}

const forwardResetTimer = () => {
    transitionSlideForward();
    clearInterval(autoLoop);
    autoLoop = setInterval(transitionSlideForward, 5000);
}

const backwardResetTimer = () => {
    transitionSlideBack();
    clearInterval(autoLoop);
    autoLoop = setInterval(transitionSlideForward, 5000);

}

// toggle automatically through and play/pause functions 

let autoLoop = setInterval(transitionSlideForward, 5000);   

const stopLoop = () => {
    clearInterval(autoLoop);
}

const startLoop = () => {
    autoLoop = setInterval(transitionSlideForward, 5000);
}

document.getElementById("play-button").addEventListener("click", startLoop); //if clicked, restarts loop
document.getElementById("pause-button").addEventListener("click", stopLoop); //if clicked, clears interval and pauses carousel
document.getElementById("next-button").addEventListener("click", transitionSlideForward);
document.getElementById("back-button").addEventListener("click", transitionSlideBack);









