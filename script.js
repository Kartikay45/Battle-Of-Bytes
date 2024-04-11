let menu = document.querySelector('.fa-bars');
let navbar = document.querySelector('.navbar');

menu.addEventListener('click', function() {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('nav-toggle');
});

window.addEventListener('scroll', () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('nav-toggle');
});

let menu = document.querySelector('.fa-bars');
let navbar = document.querySelector('.navbar');

menu.addEventListener('click', function() {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('nav-toggle');
});

window.addEventListener('scroll', () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('nav-toggle');
});

const teamSliderContainer = document.querySelector('.team-slider-container');
const teamContainer = document.querySelector('.team_cont');
const cards = document.querySelectorAll('.card1');

let cardWidth = cards[0].offsetWidth;
let currentIndex = 0;

teamSliderContainer.style.overflow = 'hidden';
teamContainer.style.width = `${cardWidth * (cards.length + 1)}px`; // Add one more card width for the clone

// Clone the first card and append it to the end
const firstCardClone = cards[0].cloneNode(true);
teamContainer.appendChild(firstCardClone);

function slideNext() {
    currentIndex = (currentIndex + 1) % (cards.length + 1); // Adjust index for the clone
    const offset = -currentIndex * cardWidth;
    teamContainer.style.transition = 'transform 0.5s ease-in-out';
    teamContainer.style.transform = `translateX(${offset}px)`;

    if (currentIndex === cards.length) { // If the clone is reached, reset to the original first card
        setTimeout(() => {
            teamContainer.style.transition = 'none'; // Disable transition for a smooth reset
            currentIndex = 0;
            teamContainer.style.transform = `translateX(0)`;
        }, 500); // Wait for the transition to finish before resetting
    }
}

function slidePrev() {
    currentIndex = (currentIndex - 1 + (cards.length + 1)) % (cards.length + 1); // Adjust index for the clone
    const offset = -currentIndex * cardWidth;
    teamContainer.style.transition = 'transform 0.5s ease-in-out';
    teamContainer.style.transform = `translateX(${offset}px)`;

    if (currentIndex === cards.length) { // If the clone is reached, reset to the original last card
        setTimeout(() => {
            teamContainer.style.transition = 'none'; // Disable transition for a smooth reset
            currentIndex = cards.length - 1;
            teamContainer.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
        }, 500); // Wait for the transition to finish before resetting
    }
}

// Automatic sliding
let interva
