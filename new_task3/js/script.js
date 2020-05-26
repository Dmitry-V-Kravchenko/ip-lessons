'use strict';

let numberOfFilms;

function start() {
    numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms) ) {
        numberOfFilms = +prompt('Сколько фильмов вы уже посмотрели?', '');
    }
    return numberOfFilms;
}

function setPersonalFilms(objDB) {
    for (let i = 0; i < 2; i++) {
        const a = prompt('Один из последних просмотренных фильмов?', ''),
              b = prompt('На сколько оцените его?', '');
        if (a != null && b != null && a != '' && b!= '' && a.length < 50) {
            objDB.movies[a] = b;
            console.log('done');
        } else {
            i--;
            console.log('error');
        }
    }
}

function showPersonStatus(numb) {
    if (numb < 10) {
        console.log("Просмотрено довольно мало фильмов");
    } else if (numb >= 10 && numb < 30) {
        console.log("Вы классический зритель");
    } else if (numb >= 30) {
        console.log("Вы киноман");
    } else {
        console.log("Произошла ошибка");
    }
}

function showMyDB(objDB) {
    if (objDB.privat === false) {
        for (let key in objDB) {
            console.log(`${key}: ${objDB[key]}`);
        }
    }
}

function writeYourGenres(array){
    for (let i = 1; i < 4; i++) {
        array[i-1] = prompt(`Ваш любимый жанр ${i}`, '');
    }
}


const personalMovieDB = {
    count: start(),
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

// start();
setPersonalFilms(personalMovieDB);
writeYourGenres(personalMovieDB.genres);
showPersonStatus(personalMovieDB.count);
showMyDB(personalMovieDB);


console.log(personalMovieDB);



