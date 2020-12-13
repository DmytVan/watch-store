const burgerMenu = document.getElementById('burgerMenu');
const headerNav = document.getElementById('headerNav');
burgerMenu.addEventListener('click', function () {
    headerNav.classList.add('header__nav-active');
});
headerNav.addEventListener('click', function (event) {
    if (event.target === headerNav) return;
    headerNav.classList.remove('header__nav-active');
});