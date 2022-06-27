"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const routing = (event) => {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    const loader = document.querySelector('div#loader');
    if (loader) {
        loader.style.display = 'flex';
    }
    handleLocation();
};
const routes = {
    "404": '/pages/404.html',
    "/": '/pages/home.html',
    "/services": '/pages/services.html',
    "/contact": '/pages/contact.html'
};
const handleLocation = () => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    navLinks.forEach(link => link.classList.remove('active'));
    const path = window.location.pathname;
    const route = (_a = routes[path]) !== null && _a !== void 0 ? _a : routes["404"];
    try {
        const html = yield fetch(route).then(data => data.text());
        const link = navLinks.find(link => link.pathname === path);
        if (link) {
            link.classList.add('active');
        }
        const mainPage = document.querySelector('main#main__page');
        mainPage.innerHTML = html;
        const loader = document.querySelector('div#loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
    catch (e) {
        console.log(e);
        const errorPage = `
         <section id="error">

            <svg viewBox="0 0 26 26">
               <use href="#error_logo"></use>
            </svg>
            <h4>OOPS...</h4>
            <p>Page Not Found</p>
            <a href="/" data-link>To home</a>
      
         </section>
      `;
        const mainPage = document.querySelector('main#main__page');
        mainPage.innerHTML = errorPage;
        const loader = document.querySelector('div#loader');
        if (loader) {
            loader.style.display = 'none';
        }
    }
    finally {
        Array.from(document.querySelectorAll('a[data-link]')).forEach(link => link.addEventListener('click', (e) => {
            e.preventDefault();
            routing(e);
        }));
        document.documentElement.scrollTop = 0;
    }
});
const navLinks = Array.from(document.querySelectorAll('nav a'));
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        routing(e);
    });
});
window.onpopstate = handleLocation;
handleLocation();
