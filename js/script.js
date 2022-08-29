/*breadcrumbPopap*/
const breadcrumbs = document.querySelectorAll('.breadcrumb');
breadcrumbs.forEach((breadcrumb) => {
  breadcrumb.addEventListener('click', () => {
    breadcrumb.nextElementSibling.classList.toggle('active');
  });
});

/*Counter*/
let current;
const action = document.querySelectorAll('[data-action]');
const result = document.querySelector('.calculated-order__resultPrice span');
const price = document.querySelectorAll('.calculated-order__price');
const resultPriceMobile = document.querySelector('.calculated-order__resultPriceMobile');
const resultPrice = document.querySelector('.calculated-order__resultPrice');
const mobile = () => {
  if (parseInt(result.textContent) > 0) {
    resultPriceMobile.classList.add('none');
    resultPrice.classList.add('active');
  } else {
    resultPriceMobile.classList.remove('none');
    resultPrice.classList.remove('active');
  }
};

const calc = () => {
  let priceTotal = 0;
  price.forEach((el) => {
    const current = el
      .closest('.calculated-order__listItem')
      .querySelector('[data-current="value"]');
    priceTotal =
      priceTotal + parseInt(el.innerText.replace(/[^\d]/g, '')) * parseInt(current.innerText);
  });
  result.textContent = new Intl.NumberFormat("ru").format(priceTotal);
  mobile();
};

action.forEach((elem) =>
  elem.addEventListener('click', (event) => {
    currentWrap = elem.closest('.counter');
    current = currentWrap.querySelector('[data-current]');

    if (parseInt(current.textContent) < 100 && event.target.dataset.action === 'plus') {
      current.textContent = ++current.textContent;
      calc();
    }
    if (parseInt(current.textContent) > 0 && event.target.dataset.action === 'minus') {
      current.textContent = --current.textContent;
      calc();
    }
  }),
);

/*Require*/
async function getResponse() {
  fetch('https://62fa0280ffd7197707e37de7.mockapi.io/items')
    .then((res) => res.json())
    .then((data) => {
      sortData(data);
    });
}
getResponse();
const imgItem = document.querySelectorAll('.gallery__imgItem');
const sortData = (data) => {
  imgItem.forEach((elem, index) => {
    const price = elem.querySelector('.gallery__descriptionPrice');
    const title = elem.querySelector('.gallery__descriptionTitle');
    price.textContent = new Intl.NumberFormat("ru").format(data[index].price);
    title.textContent = data[index].title;
  });
};

/*slider*/

$(document).ready(function () {
  $(window).resize(function () {
    if ($(window).width() < 376) {
      $('.slider').slick({
        arrows: false,
        dots: true,
      });
    }
  });
});

/*read*/
const read = document.querySelector('.description__btn');
read.addEventListener('click', () => {
  const none = document.querySelector('.description__content--read');
  const content = document.querySelector('.description__content');
  content.classList.toggle('description__content--notread');
  none.classList.toggle('description__content--none');
});
