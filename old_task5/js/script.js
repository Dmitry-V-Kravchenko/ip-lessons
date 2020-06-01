const menuItems = document.querySelectorAll('.menu-item'),
      body = document.querySelector('body'),
      title = document.querySelector('.title');

menuItems[1].before(menuItems[2]);
menuItems[0].parentElement.insertAdjacentHTML('beforeend', '<li class="menu-item">Пятый пункт</li>');

body.style.backgroundImage = `url('img/apple_true.jpg')`;

title.textContent = 'Мы продаем только подлинную технику Apple';

document.querySelector('.adv').remove();

document.querySelector('.prompt').textContent = prompt('Опишите ваше отношение к технике Apple', '');

