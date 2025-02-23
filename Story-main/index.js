let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menu.onclick = () => {
    menu.classList.toogle('bx-x');
    navbar.classList.toogle('active');
};
window.onscroll = () => {
    menu.classList.remove('bx-x');
    navbar.classList.remove('active');
};