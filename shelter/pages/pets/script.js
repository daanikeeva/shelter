//   menu burger ===============
const iconMenu = document.querySelector('.header__burger');
const menuList = document.querySelector('.menu__list');
const nav = document.querySelector('.menu');

function closeMenu() {
    if (iconMenu.classList.contains('open') && menuList.classList.contains('open')) {
        document.body.classList.remove('lock');
        menuList.classList.remove('open');
        iconMenu.classList.remove('open');
    }
}
iconMenu.addEventListener('click', function(){
    document.body.classList.toggle('lock');
	menuList.classList.toggle('open');
    iconMenu.classList.toggle('open');
})
nav.addEventListener('click', closeMenu)
