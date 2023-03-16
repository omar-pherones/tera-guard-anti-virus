// -----------------------------------------------------------------------------------------------------------
//  Elements -------------------------------------------------------------------------------------------------
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnCloseModal = document.querySelector('.btn--close-modal');
const nav = document.querySelector('.nav');
const navLinks = document.querySelector('.nav__links');
const header = document.querySelector('.header');
const btnScrollTo = document.querySelector('.btn--scroll-to');
const allSections = document.querySelectorAll('.section');
const section1 = document.querySelector('#section--1');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContent = document.querySelectorAll('.operations__content');
const cookieBody = document.querySelector('.cookie');
const cookieCloseBtn = document.querySelector('.cookie__close');
const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');
const dotContainer = document.querySelector('.dots');
const btnToggle = document.querySelector('.nav__toggle');
const links = document.querySelectorAll('.nav__link');

// ---------------------------------------------------------
// Cookie --------------------------------------------------
cookieCloseBtn.addEventListener('click', function () {
    cookieBody.classList.add('hidden');
    cookieBody.style.bottom = '-12rem';
});

// ---------------------------------------------------------
// Toogle Mobile Navbar  ------------------------------------
btnToggle.addEventListener('click', function () {
    if (!navLinks.classList.contains('nav__open')) {
        navLinks.classList.add('nav__open');
        document.querySelector('html').style.overflow = 'hidden';
    } else {
        navLinks.classList.contains('nav__open');
        navLinks.classList.remove('nav__open');
        document.querySelector('html').style.overflow = 'visible';
    }
});

// NavLinks addEventListener
navLinks.addEventListener('click', function () {
    navLinks.classList.remove('nav__open');
    document.querySelector('html').style.overflow = 'visible';
});

// -----------------------------------------------------------
// Navbar Sticky ---------------------------------------------
const navbHight = nav.getBoundingClientRect().height;
function stickyNavbar(entries) {
    const [entry] = entries;
    if (entry.isIntersecting) {
        nav.classList.remove('sticky');
    } else {
        entry.isIntersecting;
        nav.classList.add('sticky');
    }
}
const headerObserver = new IntersectionObserver(stickyNavbar, {
    root: null, // viewport
    threshold: 0,
    rootMargin: `${-navbHight}px`,
});
headerObserver.observe(header);
// -----------------------------------------------------------
// Smooth Scroll  ---------------------------------------------
function scrollToView(e) {
    e.preventDefault();
    if (e.target.classList.contains('nav__link')) {
        const scrollAttribute = e.target.getAttribute('href');
        // console.log(scrollAttribute);
        document
            .querySelector(scrollAttribute)
            .scrollIntoView({ behavior: 'smooth' });
    }
}
navLinks.addEventListener('click', scrollToView);
//----------------------------------------------------
// Learn More Btn-------------------------------------
btnScrollTo.addEventListener('click', () =>
    section1.scrollIntoView({ behavior: 'smooth' })
);
// ----------------------------------------------------
// Window Modal----------------------------------------
function openModal(e) {
    e.preventDefault();
    modal.classList.remove('hidden');
    overlay.classList.remove('hidden');
}
// CloseModal
function closeModal() {
    modal.classList.add('hidden');
    overlay.classList.add('hidden');
}
btnsOpenModal.forEach((btn) => btn.addEventListener('click', openModal));
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);
document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeModal();
    }
});
// ---------------------------------------------------------------
//  Reveal sections----------------------------------------------
function reveal(entries, observer) {
    const [entry] = entries;
    if (!entry.isIntersecting) return;
    entry.target.classList.remove('section--hidden');
    observer.unobserve(entry.target);
}
const sectionObserver = new IntersectionObserver(reveal, {
    root: null,
    threshold: 0.2,
});

allSections.forEach((section) => {
    sectionObserver.observe(section);
    section.classList.add('section--hidden');
});

//------------------------------------------------------------
// Menu fade ------------------------------------------------
function handleHover(e) {
    if (e.target.classList.contains('nav__link')) {
        const link = e.target;
        const siblings = link.closest('.nav').querySelectorAll('.nav__link');
        const logo = link.closest('.nav').querySelector('img');

        siblings.forEach((el) => {
            if (el !== link) el.style.opacity = this;
        });
        logo.style.opacity = this;
    }
}

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//  ----------------------------------------------------
// Slider section--------------------------------------
let currentSlide = 0;
const maxSlide = slides.length - 1;
//Slider Dots Create
function createDots() {
    slides.forEach((_, i) => {
        const dot = `<button class="dots__dot" data-slide="${i}"></button>`;
        dotContainer.insertAdjacentHTML('beforeend', dot);
    });
}
createDots();
// Active Dots
function activeDot(slide) {
    document
        .querySelectorAll('.dots__dot')
        .forEach((dot) => dot.classList.remove('dots__dot--active'));
    document
        .querySelector(`.dots__dot[data-slide="${slide}"]`)
        .classList.add('dots__dot--active');
}
activeDot(0);
// Slides Change
function changeSlide(currentSlider) {
    slides.forEach(
        (slide, i) =>
            (slide.style.transform = `translateX(${
                100 * (i - currentSlider)
            }%)`)
    );
}
changeSlide(0);
// previousSlider
function previousSlider() {
    if (currentSlide === 0) currentSlide = maxSlide;
    else currentSlide--;
    changeSlide(currentSlide);
    activeDot(currentSlide);
}

// nextSlider
function nextSlider() {
    if (currentSlide === maxSlide) currentSlide = 0;
    else currentSlide++;
    changeSlide(currentSlide);
    activeDot(currentSlide);
}

// dots Button handaler
dotContainer.addEventListener('click', function (e) {
    if (e.target.classList.contains(`dots__dot`)) {
        activeDot(e.target.dataset.slide);
        changeSlide(e.target.dataset.slide);
    }
});
// Keyboard Slider Handaler
document.addEventListener('keydown', function (e) {
    e.key === 'ArrowLeft' && previousSlider();
    e.key === 'ArrowRight' && nextSlider();
});

btnLeft.addEventListener('click', previousSlider);
btnRight.addEventListener('click', nextSlider);

//--------------------------------------------------
// Tabs Compunents--------------------------------
tabsContainer.addEventListener('click', function (e) {
    const btn = e.target.closest('.operations__tab');
    console.log(btn);
    tabs.forEach((tab) => tab.classList.remove('operations__tab--active'));
    tabsContent.forEach((content) =>
        content.classList.remove('operations__content--active')
    );
    btn.classList.add('operations__tab--active');
    // console.log(btn);
    document
        .querySelector(`.operations__content--${btn.dataset.tab}`)
        .classList.add('operations__content--active');
});
