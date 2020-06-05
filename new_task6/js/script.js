/* Задания на урок:

1) Реализовать функционал, что после заполнения формы и нажатия кнопки "Подтвердить" - 
новый фильм добавляется в список. Страница не должна перезагружаться.
Новый фильм должен добавляться в movieDB.movies.
Для получения доступа к значению input - обращаемся к нему как input.value;
P.S. Здесь есть несколько вариантов решения задачи, принимается любой, но рабочий.

2) Если название фильма больше, чем 21 символ - обрезать его и добавить три точки

3) При клике на мусорную корзину - элемент будет удаляться из списка (сложно)

4) Если в форме стоит галочка "Сделать любимым" - в консоль вывести сообщение: 
"Добавляем любимый фильм"

5) Фильмы должны быть отсортированы по алфавиту */

'use strict';

const movieDB = {
    movies: [
        "Логан",
        "Лига справедливости",
        "Ла-ла лэнд",
        "Одержимость",
        "Скотт Пилигрим против..."
    ],
    displayList: function(objList) {
        this.movies.sort();
        objList.innerHTML = '';
        this.movies.forEach((film, i) => {
            objList.innerHTML += `
                <li class="promo__interactive-item">${i+1}. ${film}
                    <div class="delete"></div>
                </li>
            `;
        });
    }
};

const movieList = document.querySelector('.promo__interactive-list'),
    formAdd = document.querySelector('.add'),
    newFilmName = formAdd.querySelector('.adding__input'),
    likeFlag = formAdd.querySelector('input[type="checkbox"]'),
    addBtn = formAdd.querySelector('button'),
    baskets = document.querySelector('.delete'); 


document.addEventListener('DOMContentLoaded', function() {
    movieDB.displayList(movieList);
    addBtn.addEventListener('click', (event) => {
        let str = newFilmName.value;
        if (str) {
            if (str.length > 21) {
                str = str.slice(0, 21) + '...';
            }
            movieDB.movies.push(str);
            movieDB.displayList(movieList);
            if (likeFlag.checked) {
                console.log('Добавляем любимый фильм');
            }
            formAdd.reset();
        }   
    });
    
    movieList.addEventListener('click', (event) => {
        if (event.target.classList.contains('delete')) {
            let point = 0,
                str = '',
                newList = [];
            point = event.target.parentElement.textContent.indexOf('.');
            str = event.target.parentElement.textContent.slice(point + 2).trim();
            
            newList = movieDB.movies.filter((film) => {
                return str != film;
            });
            movieDB.movies = newList;
            event.target.parentElement.remove();
            movieDB.displayList(movieList);
        }
    });
});

