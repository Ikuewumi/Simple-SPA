"use strict";
console.log('Using TypeScript + VS Code');
const menuBtn = document.querySelector('span#menu_logo');
menuBtn.onclick = (e) => {
    const header = document.querySelector('header');
    if (header) {
        header.classList.toggle('open');
    }
};
