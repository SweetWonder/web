window.addEventListener("DOMContentLoaded", () => {
    showLoader();
})

window.addEventListener("load", () => {
    setTimeout(() => {
        hideLoader();
}, 2000);
})


const loader = document.getElementById("loaderPagina");
const showLoader = () => {
loader.classList.add("show_loader");
}
const hideLoader = () => {
    loader.classList.remove("show_loader");
}
document.getElementById('facebookButton').addEventListener('click', function() {
    var facebookUsername = 'nombredeusuario';
    var facebookLink = 'https://www.facebook.com/profile.php?id=61566224671694&mibextid=qi2Omg&rdid=QGd8VuQLTyuVP0vP&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2FYe5HxxxymE2j46uA%2F%3Fmibextid%3Dqi2Omg#' + facebookUsername;
    window.open(facebookLink, '_blank');
});

document.getElementById('twitterButton').addEventListener('click', function() {
    var twitterUsername = 'nombredeusuario';
    var twitterLink = 'https://twitter.com/' + twitterUsername;
    window.open(twitterLink, '_blank');
});

document.getElementById('instagramButton').addEventListener('click', function() {
    var instagramUsername = 'nombredeusuario';
    var instagramLink = 'https://www.instagram.com/' + instagramUsername;
    window.open(instagramLink, '_blank');
});
if(document.querySelector('#container-slider')){
    setInterval('funcionEjecutar("siguiente")',5000);
}
 //------------------------------ LIST SLIDER -------------------------
if(document.querySelector('.listslider')){
    let link = document.querySelectorAll(".listslider li a");
    link.forEach(function(link) {
    link.addEventListener('click', function(e){
        e.anteriorentDefault();
        let item = this.getAttribute('itlist');
        let arrItem = item.split("_");
        funcionEjecutar(arrItem[1]);
        return false;
    });
    });
 }
 function funcionEjecutar(side){
     let parentTarget = document.getElementById('slider');
     let elements = parentTarget.getElementsByTagName('li');
     let curElement, siguienteElement;
     for(var i=0; i<elements.length;i++){
        if(elements[i].style.opacity==1){
            curElement = i;
            break;
        }
    }
    if(side == 'anterior' || side == 'siguiente'){
        if(side=="anterior"){
            siguienteElement = (curElement == 0)?elements.length -1:curElement -1;
        }else{
            siguienteElement = (curElement == elements.length -1)?0:curElement +1;
        }
    }else{
        siguienteElement = side;
        side = (curElement > siguienteElement)?'anterior':'siguiente';
    }
    
     //PUNTOS INFERIORES
    let elementSel = document.getElementsByClassName("listslider")[0].getElementsByTagName("a");
    elementSel[curElement].classList.remove("item-select-slid");
    elementSel[siguienteElement].classList.add("item-select-slid");
    elements[curElement].style.opacity=0;
    elements[curElement].style.zIndex =0;
    elements[siguienteElement].style.opacity=1;
    elements[siguienteElement].style.zIndex =1;
}
const wrapper = document.querySelector(".wrapper");
const carousel = document.querySelector(".carousel");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const arrowBtns = document.querySelectorAll(".wrapper i");
const carouselChildrens = [...carousel.children];
let isDragging = false, isAutoPlay = true, startX, startScrollLeft, timeoutId;
// Get the number of cards that can fit in the carousel at once
let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);
// Insert copies of the last few cards to beginning of carousel for infinite scrolling
carouselChildrens.slice(-cardPerView).reverse().forEach(card => {
    carousel.insertAdjacentHTML("afterbegin", card.outerHTML);
});
// Insert copies of the first few cards to end of carousel for infinite scrolling
carouselChildrens.slice(0, cardPerView).forEach(card => {
    carousel.insertAdjacentHTML("beforeend", card.outerHTML);
});
// Scroll the carousel at appropriate postition to hide first few duplicate cards on Firefox
carousel.classList.add("no-transition");
carousel.scrollLeft = carousel.offsetWidth;
carousel.classList.remove("no-transition");
// Add event listeners for the arrow buttons to scroll the carousel left and right
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        carousel.scrollLeft += btn.id == "left" ? -firstCardWidth : firstCardWidth;
    });
});
const dragStart = (e) => {
    isDragging = true;
    carousel.classList.add("dragging");
    // Records the initial cursor and scroll position of the carousel
    startX = e.pageX;
    startScrollLeft = carousel.scrollLeft;
}
const dragging = (e) => {
    if(!isDragging) return; // if isDragging is false return from here
    // Updates the scroll position of the carousel based on the cursor movement
    carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}
const dragStop = () => {
    isDragging = false;
    carousel.classList.remove("dragging");
}
const infiniteScroll = () => {
    // If the carousel is at the beginning, scroll to the end
    if(carousel.scrollLeft === 0) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.scrollWidth - (2 * carousel.offsetWidth);
        carousel.classList.remove("no-transition");
    }
    // If the carousel is at the end, scroll to the beginning
    else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth) {
        carousel.classList.add("no-transition");
        carousel.scrollLeft = carousel.offsetWidth;
        carousel.classList.remove("no-transition");
    }
    // Clear existing timeout & start autoplay if mouse is not hovering over carousel
    clearTimeout(timeoutId);
    if(!wrapper.matches(":hover")) autoPlay();
}
const autoPlay = () => {
    if(window.innerWidth < 800 || !isAutoPlay) return; // Return if window is smaller than 800 or isAutoPlay is false
    // Autoplay the carousel after every 2500 ms
    timeoutId = setTimeout(() => carousel.scrollLeft += firstCardWidth, 2500);
}
autoPlay();
carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);
