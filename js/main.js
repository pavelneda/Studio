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


/* Services menu */

const servicesLiAll = document.querySelectorAll('.services__names li');

let activeLi = servicesLiAll[0];
servicesLiAll.forEach(li => li.addEventListener('click', function(event) {
  activeLi.classList.toggle('opacity1');
  activeLi.classList.toggle('black');
  li.classList.toggle('opacity1');
  li.classList.toggle('black');
  activeLi=li;
}));


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
    1150: {
      spaceBetween: 45,
      slidesPerView: 3,
      slidesPerGroup: 3,
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
})