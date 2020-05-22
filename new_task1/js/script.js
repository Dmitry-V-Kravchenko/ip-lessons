'use strict';

const numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

const personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

const fName1 = prompt('Один из последних просмотренных фильмов?', ''),
    estim1 = prompt('На сколько оцените его?', ''),
    fName2 = prompt('Один из последних просмотренных фильмов?', ''),
    estim2 = prompt('На сколько оцените его?', '');

personalMovieDB.movies[fName1] = estim1;
personalMovieDB.movies[fName2] = estim2;
console.log(personalMovieDB.movies);