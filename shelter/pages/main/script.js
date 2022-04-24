import { petsData } from "./petsData.js";
console.log('petsdata', petsData)

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
iconMenu.addEventListener('click', function() {
    document.body.classList.toggle('lock');
	menuList.classList.toggle('open');
    iconMenu.classList.toggle('open');
})

nav.addEventListener('click', event => {
    let target = event.target;
    if (target === iconMenu || 
        target.className === 'menu__link' || 
        !target.closest('.menu__list')) {
        closeMenu()
    }
})


// ======= перелистывание карточек слайдера
const sliderContainer = document.querySelector('.slider__cards');
const leftArrow = document.querySelector('.slider__prev');
const rightArrow = document.querySelector('.slider__next');
const activeCards = document.querySelector('.slider__cards_active')
const prevCards = document.querySelector('.slider__cards_prev')
const nextCards = document.querySelector('.slider__cards_next')


// ======= движение слайдера

const moveLeft = () => {
    prevCards.innerHTML = createCards();
    sliderContainer.classList.add('transition-left');
    leftArrow.removeEventListener('click', moveLeft);
    rightArrow.removeEventListener('click', moveRight)
}
const moveRight = () => {
    nextCards.innerHTML = createCards();
    sliderContainer.classList.add('transition-right');
    leftArrow.removeEventListener('click', moveLeft);
    rightArrow.removeEventListener('click', moveRight)
}

leftArrow.addEventListener('click', moveLeft);
rightArrow.addEventListener('click', moveRight)

// =========== по окончанию анимации удаляю классы, возвращаю слушатели
sliderContainer.addEventListener('animationend', function(animation) {
    if (animation.animationName === 'move-prev') {
        sliderContainer.classList.remove('transition-left');
        activeCards.innerHTML = prevCards.innerHTML;
        prevCards.innerHTML = createCards();
        console.log(createCards())
    }
    else {
        sliderContainer.classList.remove('transition-right');
        activeCards.innerHTML = nextCards.innerHTML;
        nextCards.innerHTML = createCards();
    }
    leftArrow.addEventListener('click', moveLeft);
    rightArrow.addEventListener('click', moveRight)
})

function randomNumber(n) {
    return Math.floor(Math.random() * (n));
}


// ======= генерация 3 уникальных карточек для слайдера
const createCards = () => {
    let actualPets = petsData.filter((pet) => !activeCards.innerHTML.includes(pet.name))
    
    let template = '';
    for (let i = 0; i < 3; i++) {
        let randomPet = randomNumber(actualPets.length);
        if (!template.includes(actualPets[randomPet].name)) {
            template += `<div class="slider__item pet">
    <img class="pet__photo" src='${actualPets[randomPet].img}' alt="${actualPets[randomPet].name}">
    <h4 class="pet__name">${actualPets[randomPet].name}</h4>
    <button class="pet__btn">Learn more</button>
</div>\n`
        }
        else {
            i -= 1;
        }
    }
    console.log(template)
    return template;
}


// =================== модальное окно

const overlayModal = document.querySelector('.overlay');

sliderContainer.addEventListener('click', (event) => {
    console.log('event.target', event.target)
    console.log('event.currentTarget', event.currentTarget)
        if (event.target.closest('.pet')) {
            let card = event.target.closest('.pet');
            let petName = card.children[1].innerHTML;
            let modal = generateModal(petName);
            overlayModal.innerHTML = modal;
            overlayModal.classList.add('open');
            document.body.style.overflowY = 'hidden'
            
            // console.log('modal', modal);

        }
    } 
) 

function generateModal(name) {
    let template;

    //  попробовать вытащить pet из petsData через find!!!
    petsData.forEach(el => {
        if (el.name === name) {
            template = `<div class="overlay__modal modal">
            <button class="modal__btn-close">           
            <img src="../../assets/icons/close-modal.svg" alt="close-btn">
            </button>
            <img src="${el.img}" alt="${el.name}" class="modal__image">
            <div class="modal__content">
                <div class="modal__name">${el.name}</div>
                <div class="modal__type">${el.type} - ${el.breed}</div>
                <p class="modal__description">${el.description}</p>
                <ul class="modal__info-about-pet">
                    <li class="modal__age">
                        <span>Age: </span>${el.age}</li>
                    <li class="modal__inoculations">
                        <span>Inoculations: </span>${el.inoculations}</li>
                    <li class="modal__diseases">
                        <span>Diseases: </span>${el.diseases}</li>
                    <li class="modal__parasites">
                        <span>Parasites: </span>${el.parasites}</li>
                </ul>
            </div>
        </div>`;
        }
    })
    return template
}

overlayModal.addEventListener('click', event => {
    let target = event.target;
    if (target === overlayModal || target.closest('.modal__btn-close')) {
        closeModal()
    }
})

function closeModal() {
    overlayModal.classList.remove('open');
    overlayModal.innerHTML = '';
    document.body.style.overflowY = 'auto'
}


// ==================== вариант получения данных через fetch

// const getData = async (url) => await ((await fetch(url)).json());
// const array = await getData('../../assets/pets.json');
// console.log('array', array)

// =================

import dogAndCat from '../../assets/pets.json' assert { type: "json"};
console.log(dogAndCat[0])


// ==== массив из 48 карточек
let petsRepeat = Array(6).fill(dogAndCat).reduce((allPets, arr) => allPets.concat(arr));
console.log(petsRepeat)
// console.log(petsRepeat.reduce((allPets, arr) => allPets.concat(arr)))

// ===========