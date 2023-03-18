'use strict';

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const btnScroll = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');
const nav = document.querySelector('.nav');
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
const navLinks = document.querySelectorAll('nav a');
///////////////////////////////////////
// Modal window

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////
// Button Scrolling

// اضافه کردن رویداد کلیک به دکمه
btnScroll.addEventListener('click', function(e) {
  e.preventDefault();
  // اسکرول تا المنت مورد نظر با انیمیشن   
  section1.scrollIntoView({ behavior: 'smooth' });
});

//////////////////////////////////////////////
// Page Navigation (Smooth scroll to sections)

// اضافه کردن یک event listener برای کلیک به هر یک از لینک ها
//متن بالا را از ایونت لیسنر کلمه به کلمه از جپ بخوانید
navLinks.forEach(navLink => {
  navLink.addEventListener('click', function(e) {
    e.preventDefault();

    // یافتن ناحیه مورد نظر برای حرکت به وسیله href لینک
    //متن بالا را از اچ رف کلمه به کلمه از جپ بخوانید
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);

    // صفحه به صورت نرم انیمیشنی به قسمت مورد نظر حرکت می کند
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

//////////////////////////////////////////////
// Tabbed Component

for (let i = 0; i < tabs.length; i++) {
  tabs[i].addEventListener('click', function () {
    // برای تمام المان‌های آرایه‌های tabsContent و tabs کلاس‌های مربوطه را حذف می‌کنیم
    for (let j = 0; j < tabs.length; j++) {
      tabsContent[j].classList.remove('operations__content--active');
      tabs[j].classList.remove('operations__tab--active');
    }
    // کلاس operations__content--active را به المان مربوطه در آرایه tabsContent با شاخه شماره i اضافه می‌کنیم
    tabsContent[i].classList.add('operations__content--active');
    // کلاس operations__tab--active را به المان مربوطه در آرایه tabs با شاخه شماره i اضافه می‌کنیم
    tabs[i].classList.add('operations__tab--active');
  });
}

//////////////////////////////////////////////
// Navigation link fadeout animation (opacity)

navLinks.forEach(link => {

  // وقتی موس روی المان قرار می گیرد
  link.addEventListener('mouseenter', () => {

    // برای تمام المان ها به جز المان فعلی
    //  کم شدن شفافیت به مقدار ۰.۵
    navLinks.forEach(otherLink => {
      if (otherLink !== link) {
        otherLink.style.opacity = '0.5';
      }
    });
  });

  // وقتی موس از روی المان خارج می شود
  link.addEventListener('mouseleave', () => {

    // برای تمام المان ها
    // بازگرداندن شفافیت به حالت عادی یعنی ۱
    navLinks.forEach(otherLink => {
      otherLink.style.opacity = '1';
    });
  });
});

//////////////////////////////////////////////
// Sticky Navigation

const sectionOone = document.querySelector('#section--1');
// تعیین کلاس ثابت برای  نو یار
const stickyClass = 'sticky';
window.addEventListener('scroll', function() {

  // بررسی اینکه آیا مقدار نو یار بزرگ تر یا مساوی موقعیت اولین بخش است یا نه
  if (window.scrollY >= sectionOone.offsetTop) {

    // اضافه کردن کلاس "sticky" به نو بار 
    nav.classList.add(stickyClass);
  } else {

    // حذف کلاس "sticky" از نو بار 
    nav.classList.remove(stickyClass);
  }
});

//////////////////////////////////////////
// Reveal Sections

const sections = document.querySelectorAll('.section');
window.addEventListener('scroll', () => {
  // بررسی هر یک از عناصر با کلاس .section
  sections.forEach((section) => {
    // بررسی می‌کنیم که آیا قسمت در دیدار نمایش داده می‌شود یا خیر
    const rect = section.getBoundingClientRect();
    const visible = rect.top < window.innerHeight * 0.75 && rect.bottom > 0;

    // اگر قسمت در دیدار نمایش داده می‌شود، کلاس section--hidden را حذف می‌کنیم
    if (visible) {
      section.classList.remove('section--hidden');
    } 
    // در غیر این صورت، کلاس section--hidden را اضافه می‌کنیم
    else {
      section.classList.add('section--hidden');
    }
  });
});


//////////////////////////////////////////
// Lazy loading images
const imgTargets = document.querySelectorAll('img[data-src]');

  const lazyLoad = function(target){
    const   IOR = new IntersectionObserver((entries, observer) => {
      entries.forEach(function(entry){
        if (entry.isIntersecting) {
          const img = entry.target;
          const src = img.getAttribute('data-src');

          img.setAttribute('src', src);
          img.classList.remove('lazy-img');

          observer.disconnect();
        }
      });
    });

    IOR.observe(target);
  };

  imgTargets.forEach(lazyLoad);
  // این کد در همه وبسایت ها یکی بود

//////////////////////////////////////////
// Slider

// یافتن المان های لازم از DOM
const slider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const prevBtn = document.querySelector('.slider__btn--left');
const nextBtn = document.querySelector('.slider__btn--right');

// تعریف متغیر برای ذخیره اندیس اسلاید فعلی
let currentSlide = 0;

// تابعی برای تغییر نمایش اسلایدها بر اساس مقدار currentSlide
function changeSlide() {
  slides.forEach((slide, index) => {
    slide.style.display = (index === currentSlide) ? 'flex' : 'none';
  });
}

// افزودن event listener برای دکمه قبلی
prevBtn.addEventListener('click', () => {
  currentSlide = (currentSlide === 0) ? slides.length - 1 : currentSlide - 1;
  changeSlide();
});

// افزودن event listener برای دکمه بعدی
nextBtn.addEventListener('click', () => {
  currentSlide = (currentSlide === slides.length - 1) ? 0 : currentSlide + 1;
  changeSlide();
});

// نمایش اسلاید فعلی
changeSlide();
