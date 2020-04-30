//query selectors for the carousel containter and carousel images
const carouselSlide = document.querySelector('.carousel-slide');
const carouselImages = document.querySelectorAll('.carousel-slide img');

//counter 

let counter = 1;


//carousel width responsiveness when loading and when resizing tab
let scrollWidth 

window.addEventListener('load', () => {
    scrollWidth = carouselImages[0].getBoundingClientRect().width; 
    //in order to start at the first image and not the lastImageCopy when the page loads
    carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
})

window.addEventListener('resize', () => {
    const newScrollWidth = carouselImages[0].getBoundingClientRect().width;
    if (newScrollWidth !== scrollWidth) {
        scrollWidth = newScrollWidth;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
    };
});


//Transition functions

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

//Toggle automatically looping through all images with play/pause functions

let autoLoop = setInterval(transitionSlideForward, 5000);   

const startLoop = () => {
    autoLoop = setInterval(transitionSlideForward, 5000);
}

const stopLoop = () => {
    clearInterval(autoLoop);
}



//Stop the autoLoop from going forward at its normal interval times when the back/forward buttons are clicked
//in case the autoLoop is about to go forward and it jumps two images 
//Reset the interval instead and ensure smooth transition

let acceptNavigationInput = true;

const forwardResetTimer = () => { 
    if (!acceptNavigationInput) return;
    
    clearInterval(autoLoop); //on this line to prevent a very rare case in which the function is called and the 
                             //code below has time to execute calling trasitionSlideBack, jumping two pictures

    acceptNavigationInput = false;

    setTimeout(() => {
        acceptNavigationInput = true;
    }, 1050); //prevent user from clicking multiple times before the transition has had time to execute 
              //therefore not triggering transitionend-event-listener at the end of the carousel 

    transitionSlideForward();
    autoLoop = setInterval(transitionSlideForward, 5000);
}

const backwardResetTimer = () => {
    if (!acceptNavigationInput) return;
   
    clearInterval(autoLoop); 

    acceptNavigationInput = false;

    setTimeout(() => {
        acceptNavigationInput = true;
    }, 1050);

    transitionSlideBack();
    autoLoop = setInterval(transitionSlideForward, 5000);
}



//Keyboard navigation

const keyboardNav = (e) => {
    if (e.keyCode == "37") {
        backwardResetTimer();
        
    } else if (e.keyCode == "39") {
        forwardResetTimer();
    }
}

window.addEventListener("keydown", keyboardNav);



//Jumping from image clones to the original image and removing the the transition, thus creating the illusion of an infinite loop

carouselSlide.addEventListener("transitionend", () => {
    if (carouselImages[counter].id == "firstImageCopy") {
        carouselSlide.style.transition = 'none';
        counter = 1;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)'; 
    }

    if (carouselImages[counter].id == "lastImageCopy") {
        carouselSlide.style.transition = 'none';
        counter = carouselImages.length - 2;
        carouselSlide.style.transform = 'translateX(' + (-scrollWidth * counter) + 'px)';
    }
});



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




