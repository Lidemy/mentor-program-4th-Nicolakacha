/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable prefer-const */
const formatter = new Intl.NumberFormat('zh-TW', {
  style: 'currency',
  currency: 'NTD',
  minimumFractionDigits: 0,
});

function init() {
  const checkCartDOM = document.querySelector('.check');
  const checkCartContainer = document.querySelector('.check .container');
  const checkHeadDOM = document.querySelector('.container__head');
  const checkBodyDOM = document.querySelector('.container__body');
  const checkFootDOM = document.querySelector('.container__foot');
  const cartDOM = document.querySelector('.cart');
  const cartCounterDOM = document.querySelector('.count');
  const productsDOM = document.querySelector('.products');

  function renderCheck(data) {
    const template = `
      <div></div>
      <div class="title">名&nbsp;&nbsp;稱</div>
      <div class="price">價&nbsp;&nbsp;格</div>
      <div class="quantity">數&nbsp;&nbsp;量</div>
      <div class="amount">金&nbsp;&nbsp;額</div>
      `;

    let total = 0;
    let amount = 0;

    checkHeadDOM.innerHTML = '';
    checkBodyDOM.innerHTML = '';
    checkFootDOM.innerHTML = '';

    // render head
    const headEl = document.createElement('div');
    headEl.classList.add('row');
    headEl.classList.add('head');
    headEl.innerHTML = template;
    checkHeadDOM.appendChild(headEl);

    // render body
    data.forEach((product) => {
      const bodyEl = document.createElement('div');
      const body = template
        .replace('<div></div>', '<button class="delete">刪除</button>')
        .replace('名&nbsp;&nbsp;稱', product.title)
        .replace('價&nbsp;&nbsp;格', formatter.format(product.price))
        .replace('數&nbsp;&nbsp;量', `${product.quantity} 份`)
        .replace(
          '金&nbsp;&nbsp;額',
          formatter.format(product.price * product.quantity),
        );

      amount += product.price * product.quantity;
      total += Number(product.quantity);

      bodyEl.classList.add('row');
      bodyEl.classList.add('body');
      bodyEl.setAttribute('data-id', product.id);
      bodyEl.innerHTML = body;
      checkBodyDOM.appendChild(bodyEl);
    });

    // render foot
    const footEl = document.createElement('div');
    const foot = template
      .replace('名&nbsp;&nbsp;稱', '總&nbsp;&nbsp;&nbsp;計：')
      .replace('價&nbsp;&nbsp;格', '')
      .replace('數&nbsp;&nbsp;量', `共  ${total} 份`)
      .replace('金&nbsp;&nbsp;額', formatter.format(amount));

    footEl.classList.add('row');
    footEl.classList.add('foot');
    footEl.innerHTML = foot;
    checkFootDOM.appendChild(footEl);

    // show checkCart modal & hide cart icon
    checkCartDOM.classList.remove('hide');
    document.querySelector('.cart').classList.add('hide');
  }

  function initCart() {
    if (localStorage.number > 0) {
      cartCounterDOM.classList.remove('hide');
    } else {
      cartCounterDOM.classList.add('hide');
      localStorage.setItem('number', 0);
    }
    cartCounterDOM.innerText = localStorage.number;
  }

  function addCart(target) {
    if (target.className === 'add-cart__btn') {
      const addToCartDOM = target.parentNode.parentNode;
      const product = addToCartDOM.querySelector('.id').innerText;

      if (localStorage.number < 99) {
        localStorage.setItem('number', Number(localStorage.number) + 1);
      }

      cartCounterDOM.innerText = localStorage.number;
      cartCounterDOM.classList.remove('hide');

      if (localStorage[`${product}`]) {
        localStorage.setItem(product, Number(localStorage[`${product}`]) + 1);
      } else {
        localStorage.setItem(product, 1);
      }
    }
  }

  function getCart() {
    const total = localStorage;
    const clientResult = [];
    for (let item in total) {
      if (isNaN(Number(item)) === false) {
        let product = {};
        product.id = item;
        product.quantity = total[item];
        clientResult.push(product);
      }
    }
    fetch('/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(clientResult),
    })
      .then(res => res.json())
      .then((data) => {
        if (localStorage.number > 0) {
          renderCheck(data);
        }
      })
      .catch(err => console.log(err));
  }

  function clearCart() {
    localStorage.clear();
    checkCartDOM.classList.add('hide');
    cartDOM.classList.remove('hide');
    cartCounterDOM.classList.add('hide');
    initCart();
  }

  function toggleCheck(target) {
    if (target === checkCartDOM && target !== checkCartContainer) {
      checkCartDOM.classList.add('hide');
      cartDOM.classList.remove('hide');
    }
  }

  function removeProduct(target) {
    if (target.className === 'delete') {
      const id = target.parentNode.getAttribute('data-id');
      const originalQty = document.querySelector('.foot .quantity').innerText.match(/\d+/g).map(Number)[0];
      const removedItemQty = localStorage[`${id}`];
      const originalAmountArr = document.querySelector('.foot .amount').innerText.match(/\d/g).map(Number);
      const removedItemAmountArr = target.parentNode.querySelector('.amount').innerText.match(/\d/g).map(Number);
      let originalAmount = '';
      let removedAmount = '';
      originalAmountArr.forEach((number) => {
        originalAmount += number;
      });
      removedItemAmountArr.forEach((number) => {
        removedAmount += number;
      });

      document.querySelector('.foot .quantity').innerText = `共 ${Number(originalQty) - Number(removedItemQty)} 份`;
      document.querySelector('.foot .amount').innerText = formatter.format(Number(originalAmount) - Number(removedAmount));
      cartCounterDOM.innerText = localStorage.number;

      target.parentNode.parentNode.removeChild(target.parentNode);
      localStorage.removeItem(id);
      localStorage.number -= Number(removedItemQty);

      if (Number(localStorage.number) === 0) {
        cartDOM.classList.remove('hide');
        checkCartDOM.classList.add('hide');
      }
      initCart();
    }
  }

  function backToMenu() {
    checkCartDOM.classList.add('hide');
    cartDOM.classList.remove('hide');
  }

  initCart();
  document.addEventListener('click', e => toggleCheck(e.target));
  document.querySelector('.cart').addEventListener('click', getCart);
  document.querySelector('.clear').addEventListener('click', clearCart);
  document.querySelector('.back__menu').addEventListener('click', backToMenu);
  document.querySelector('.check .container').addEventListener('click', e => removeProduct(e.target));
  document.querySelector('.cart').addEventListener('click', getCart);
  if (productsDOM) productsDOM.addEventListener('click', e => addCart(e.target));
}

document.addEventListener('DOMContentLoaded', () => {
  init();
});
