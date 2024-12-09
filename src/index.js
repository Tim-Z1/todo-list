import './styles.css';
import { loadHomePageContent } from './home.js';
import { loadMenuContent } from './menu.js';
import { loadAboutContent } from './about.js';

const menuBtn = document.querySelector('.menu-btn');
const homeBtn = document.querySelector('.home-btn');
const aboutBtn = document.querySelector('.about-btn');

loadHomePageContent();
homeBtn.style.textDecoration = 'underline';

const clearBtnHighlight = function () {
    let btnArr = [menuBtn, homeBtn, aboutBtn];
    btnArr.forEach((item) => item.style.removeProperty('text-decoration'))
}

homeBtn.addEventListener('click', () => {
    clearBtnHighlight();
    loadHomePageContent();
    homeBtn.style.textDecoration = 'underline';
})

menuBtn.addEventListener('click', () => {
    clearBtnHighlight();
    loadMenuContent();
    menuBtn.style.textDecoration = 'underline';
})

aboutBtn.addEventListener('click', () => {
    clearBtnHighlight();
    loadAboutContent();
    aboutBtn.style.textDecoration = 'underline';
})


