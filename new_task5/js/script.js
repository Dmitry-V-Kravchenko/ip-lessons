/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ]
};


document.querySelector('.promo__adv').remove();
document.querySelector('.promo__content').style.width = 'calc(100% - 300px)';
document.querySelector('.promo__genre').textContent = 'драма';
document.querySelector('.promo__bg').style.background = 'url(img/bg.jpg) top center/cover no-repeat';
movieDB.movies.sort();
const $lis = document.querySelectorAll('.promo__interactive-item');

/* for (let i = 0; i < $lis.length; i++) {
    $lis[i].innerHTML = `${i+1}. ${movieDB.movies[i]}<div class="delete"></div>`;
} */

$lis.forEach((item, i) => {
    item.innerHTML = `${i+1}. ${movieDB.movies[i]}<div class="delete"></div>`;
});