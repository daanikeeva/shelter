//   menu burger ===============
const iconMenu = document.querySelector('.header__burger');
const menuList = document.querySelector('.menu__list');
const nav = document.querySelector('.menu');

function closeMenu() {
    if (iconMenu.classList.contains('open') && menuList.classList.contains('open')) {
        document.body.classList.remove('lock');
        menuList.classList.remove('open');
        iconMenu.classList.remove('open');
        // Удаляю правый padding равный ширине прокрутки
        document.body.style.paddingRight = '';
    }
}

iconMenu.addEventListener('click', function() {
    document.body.classList.toggle('lock');
    // Добавляю правый padding равный ширине прокрутки
    document.body.style.paddingRight = (window.innerWidth - document.documentElement.clientWidth)+'px';
	menuList.classList.toggle('open');
    iconMenu.classList.toggle('open');
})

nav.addEventListener('click', event => {
    let target = event.target;
    if (target === iconMenu || 
        target.classList.contains('menu__link') || 
        !target.closest('.menu__list')) {
        closeMenu()
    }
})
// ================= получаю данные из json
import petsData from '../../assets/pets.json' assert { type: "json"};

// ==== массив из 48 карточек
const cardsContainer = document.querySelector('.cards')

let petsRepeat = Array(6).fill(petsData).reduce((allPets, arr) => allPets.concat(arr));
console.log(petsRepeat)

let cardsCount = window.innerWidth >= 1280 ? 8 : window.innerWidth < 768 ? 3 : 6;
let pageCount = 48 / cardsCount;
let currentPage = 0;
let petsDataForPages = [];

// рандомное распределение карточек для страниц

function createArraysForPages() {
    for (let i = 0; i < 48; i = i + cardsCount) {
        petsDataForPages.push(petsRepeat.slice(i, i + cardsCount).sort(() => Math.random() - 0.5))
    }
    petsDataForPages.sort(() => Math.random() - 0.5)
    console.log(petsDataForPages)
}



createArraysForPages()

function createCards(page) {
    cardsContainer.innerHTML = '';
    for (let i = 0; i < cardsCount; i++) {
        let card = document.createElement('div');
        card.classList.add('cards__item', 'pet');
        
        let img = document.createElement('img');
        img.classList.add('pet__photo');
        img.src = petsDataForPages[page][i].img;
        img.alt = `photo ${petsDataForPages[page][i].name}`
        
        let name = document.createElement('h4');
        name.classList.add('pet__name');
        name.textContent = petsDataForPages[page][i].name;
        
        let btn = document.createElement('button');
        btn.classList.add('pet__btn');
        btn.textContent = 'Learn more';

        card.append(img, name, btn);
        cardsContainer.append(card)
    }
}

// =====

let btnToStart = document.querySelector('.navigation__btn_to-start');
let btnPreviousPage = document.querySelector('.navigation__btn_prev ');
let btnNextPage = document.querySelector('.navigation__btn_next');
let btnToLastPage = document.querySelector('.navigation__btn_to-end');
let btnCurrentPage = document.querySelector('.navigation__btn_now');

createCards(currentPage);

// ====== следующие страницы
btnNextPage.addEventListener('click', () => {
    currentPage += 1;
    btnCurrentPage.textContent = currentPage + 1;
    createCards(currentPage);
    activateButtons(currentPage, btnToStart, btnPreviousPage)
    disableButtons(currentPage, btnNextPage, btnToLastPage);
})

btnToLastPage.onclick = () => {
    currentPage = 48 / cardsCount - 1;
    btnCurrentPage.textContent = currentPage + 1;
    createCards(currentPage);
    activateButtons(currentPage, btnToStart, btnPreviousPage)
    disableButtons(currentPage, btnNextPage, btnToLastPage);
}

// ======= предыдущие страницы
btnPreviousPage.onclick = () => {
    currentPage -= 1;
    btnCurrentPage.textContent = currentPage + 1;
    createCards(currentPage);
    disableButtons(currentPage, btnToStart, btnPreviousPage);
    activateButtons(currentPage, btnNextPage, btnToLastPage)
}

btnToStart.onclick = () => {
    currentPage = 0;
    btnCurrentPage.textContent = currentPage + 1;
    createCards(currentPage);
    disableButtons(currentPage, btnToStart, btnPreviousPage);
    activateButtons(currentPage, btnNextPage, btnToLastPage)

}

// ======= деактивация кнопок
function disableButtons(page, ...args) {
    // args.forEach(el => {console.log(el)})
    console.log(petsDataForPages.length, currentPage)
    if (page === 0 || page === petsDataForPages.length-1) {
        args.forEach(el => {
            el.classList.add('navigation__btn_disabled');
            el.setAttribute("disabled", "disabled");
        })
    }
}

// =======активация кнопок
function activateButtons(page, ...args) {
    // args.forEach(el => {console.log(el)})
    console.log('activ', petsDataForPages.length-1, currentPage)
    if (page > 0 || page < petsDataForPages.length-1) {
        args.forEach(el => {
            el.removeAttribute("disabled", "disabled");
            console.log('удалить класс')
            el.classList.remove('navigation__btn_disabled')
        })
    }

}
// =============== модальное окно

const overlayModal = document.querySelector('.overlay');

cardsContainer.addEventListener('click', (event) => {
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

// ============= 

// ================== проба пера рандом карточек
// function randomNumber(max, min = 0) {
//     return Math.floor(min + Math.random() * (max + 1 - min))
// }

// function randomcard() {
//     let randomArr = [];
//     let allCards = [].concat(petsRepeat);
    
//     let double = []
//     for (let i = 0; i < (48 / cardsCount); i++) {
//         let pageCard = [];
//         for (let j = 0; j < cardsCount; j++) {
//             console.log('double', double)
//             if (double.length > 0) {
//                 console.log("дублю не пустой, добавляем карточку из него")
//                 double.forEach((el, ind, arr) => {
//                     if (!pageCard.includes(el)) {
//                         pageCard.push(el);
//                         arr.splice(ind, 1)
//                         j +=1;
//                     }
//                 })
//             }
//                 console.log("после дубля")
//                 let cardToAdd = allCards.splice(randomNumber(allCards.length - 1), 1);
//                 if (allCards.length === 1) {
//                     pageCard.push(...cardToAdd)
//                 }
//                 else 
//                 if (pageCard.includes(...cardToAdd)) {
//                     double.push(...cardToAdd);
//                     j -= 1;
//                     console.log('не добавлять карточку', ...cardToAdd)
//                 }
//                 else {
//                     pageCard.push(...cardToAdd)
//                 }
    
//         }
//         console.log('pageCard', pageCard);
//         randomArr.push(pageCard)
//     }
//     console.log(randomArr, allCards)
    
// }
// randomcard()

