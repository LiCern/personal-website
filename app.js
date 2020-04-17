const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');
const nextButton = document.querySelector('#n')

//counter 

let counter = 0;
const scrollWidth = carouselImages[0].clientWidth;

//toggle automatically through

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




function autoLoop() {
    setInterval(transitionSlideForward, 5000);
    
  }  
  autoLoop();





