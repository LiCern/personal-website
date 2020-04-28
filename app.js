//query selectors for the carousel containter and carousel images
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

//counter 

let counter = 1;
let scrollWidth = carouselImages[0].clientWidth;
carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)'; //in order to start at the first image and not the lastImageCopy when the page loads

//Transition functions (a.k.a the backbone of the carousel)

const transitionSlideForward = () => {
    if ( carouselImages[counter].id == "firstImageCopy") {
        carouselSlide.style.transition = 'none';
        counter = 1;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)'; 
        // carouselSlide.style.transition = 'transform 1s ease-in';
        counter++;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
        
    }

    else { carouselSlide.style.transition = 'transform 1s ease-in';
    counter++;
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)'; }
}

const transitionSlideBack = () => {
    if (carouselImages[counter].id == "lastImageCopy") {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
        // carouselSlide.style.transition = 'none';
        counter--;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
        
    }
    
    else { carouselSlide.style.transition = 'transform 1s ease-in';
    counter--;
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';}
}


//Toggle automatically looping through all images with play/pause functions

let autoLoop = setInterval(transitionSlideForward, 5000);   

const startLoop = () => {
    autoLoop = setInterval(transitionSlideForward, 5000);
}

const stopLoop = () => {
    clearInterval(autoLoop);
}

//Stop the autoLoop from going forward at its normal interval times when the back/forward buttons are clicked 
//Reset the interval instead and ensure smooth transition

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

const keyboardNav = (e) => {
    if (e.keyCode == "37") {
        backwardResetTimer();
    } else if (e.keyCode == "39") {
        forwardResetTimer();
    }
}

window.addEventListener("keydown", keyboardNav);


//Jumping from image clones to the original image and removing the the transition, thus creating the illusion of an infinite loop

if (carouselImages[counter].id === "lastImagecopy") {
    carouselSlide.style.transition = 0;
    counter = carouselImages.length - 2;
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)'; 
}



//Buttons with related functions

document.getElementById("play-button").addEventListener("click", startLoop); //if clicked, restarts loop
document.getElementById("pause-button").addEventListener("click", stopLoop); //if clicked, clears interval and pauses carousel
document.getElementById("next-button").addEventListener("click", forwardResetTimer);
document.getElementById("back-button").addEventListener("click", backwardResetTimer);



//Fading in function

const addClass = (div, time) => {
    setTimeout(function(){ 
        document.querySelector(div).classList.add("fading");
    }, time);
}

addClass('.central-img-div', 500);
addClass('.top-logo-div', 1500);
addClass('.fac-logo-div', 2500);

//Hovering function 

const hoverButtons = (div) => {
    document.querySelector(div).addEventListener("mouseover", function(){ 
        document.querySelector(div).classList.add("changeButtons");
        
    });
    
    document.querySelector(div).addEventListener("mouseout", function(){
        document.querySelector(div).classList.remove("changeButtons");
    });
          
}

hoverButtons('#fun-facts-button');
hoverButtons('#japan-button');
hoverButtons('#why-FAC-button');




