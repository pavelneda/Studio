
/*Init Swiper*/
const swiper = new Swiper('.services_view', {
  // Optional parameters
  spaceBetween: 30,
  effect: "fade",
  loop: true,

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },

  allowTouchMove: false,
});


/* Swiper btn */
const btnPrev = document.querySelector('.btn-prev');
const btnNext = document.querySelector('.btn-next');

btnPrev.addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('.swiper-button-prev').click();
})

btnNext.addEventListener('click', function (event) {
  event.preventDefault();
  document.querySelector('.swiper-button-next').click();
})


/* Interactive card */
const cards = document.querySelectorAll('.services__grid-item');

cards.forEach(card => card.addEventListener('click', function(event) {
  const src = card.querySelector('img').src;
  let numEl = parseInt(src.match(/\d+/));
  swiper.slideTo(numEl);
}));

let preventCard = cards[0];
swiper.on('slideChange', function () {
  preventCard.querySelector('.services__check').classList.remove('opacity1');
  if(swiper.activeIndex === cards.length+1){
    cards[0].querySelector('.services__check').classList.add('opacity1');
    preventCard=cards[0];
    return
  }
  if(swiper.activeIndex === 0){
    cards[cards.length-1].querySelector('.services__check').classList.add('opacity1');
    preventCard=cards[cards.length-1];
    return
  }
  cards.forEach(card => {
    const src = card.querySelector('img').src;
    let numEl = parseInt(src.match(/\d+/));
    if(numEl === swiper.activeIndex){
      card.querySelector('.services__check').classList.add('opacity1');
      preventCard=card;
    }
  });
});



/*Swiper Reviews*/

const swipers = new Swiper('.reviews__swiper', {
  speed: 900,
  loop: true,

  autoplay: {
    delay: 2500,
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  breakpoints: {
    1201: {
      spaceBetween: 45,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },

    993: {
      spaceBetween: 25,
      slidesPerView: 3,
      slidesPerGroup: 3,
    },


    769: {
      spaceBetween: 45,
      slidesPerView: 2,
      slidesPerGroup: 2,
    },

    320: {
      spaceBetween: 45,
      slidesPerView: 1,
      slidesPerGroup: 1,
    },
  },

});

$(".reviews__swiper").hover( 
  function () {
    this.swiper.autoplay.stop();
  },
  function () {
    this.swiper.autoplay.start();
  }
);


/*Studio Form validation*/
const studioForm = document.forms.studio;
studioForm.studioBtn.addEventListener('click', function(event){
  if(!studioForm.zipCode.value){
    event.preventDefault();
    studioForm.zipCode.style.borderColor = '#ff3c2d';
  } 
} );

studioForm.zipCode.addEventListener('input', function(event){
  this.style.borderColor = '#f6f6f6';
});


/* Burger menu*/

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('header nav');
const header = document.querySelector('header');
const headerBtn = document.querySelector('.header__btn');
const social = document.querySelector('.header__social');
const links = document.querySelectorAll('.header__navigation li a');

changeHeader();

window.addEventListener('resize', function() {
  changeHeader();
})

burger.addEventListener('click', function(){
  menu.classList.toggle('_menu__active');
  this.querySelector('i').classList.toggle('fa-xmark');
});

links.forEach(link => link.addEventListener('click', function() {
  menu.classList.remove('_menu__active');
  burger.querySelector('i').classList.remove('fa-xmark');
}));

function changeHeader(){
  let w = window.innerWidth
  if (w <= 992) {
    menu.append(social);
  }else{
    header.append(social);
  }

  if (w <= 425) {
    menu.prepend(headerBtn);
  }else{
    burger.before(headerBtn);
  }
}

/*Category scroll*/

let movement = false;
let mousedown = false;

function onMouseMove(e){
  e.preventDefault();
  e.stopPropagation();
  if(mousedown) {
    movement = true;
    this.scrollLeft -= event.movementX;
    this.scrollTop -= event.movementY;
  }
}

function onMouseDown(){
  mousedown = true;
  movement = false;
}

function onMouseUp(e){
  mousedown = false;
  setTimeout(()=>movement = false, 10);
}


function onDragStart(e){
  e.preventDefault();
  e.stopPropagation();
}

const scr = document.querySelector('.services__names');
const servicesLiAll = document.querySelectorAll('.services__names li');
let activeLi = servicesLiAll[0];

scr.onmousemove = onMouseMove;
scr.onmousedown = onMouseDown;
window.onmouseup = onMouseUp;
window.addEventListener('dragstart',onDragStart);
window.addEventListener('blur',onMouseUp);

servicesLiAll.forEach(li => li.addEventListener('click', function(e){
  if(movement){
    e.preventDefault();
    e.stopPropagation();
  }else{
    activeLi.classList.toggle('opacity1');
    activeLi.classList.toggle('black');
    li.classList.toggle('opacity1');
    li.classList.toggle('black');
    activeLi= li;
  }
}));