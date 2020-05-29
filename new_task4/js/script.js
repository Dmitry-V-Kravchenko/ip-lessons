'use strict';

const personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start: function() {
        this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');

        while (this.count == '' || this.count == null || isNaN(this.count) ) {
            this.count = +prompt('Сколько фильмов вы уже посмотрели?', '');
        }
    },
    setPersonalFilms: function() {
        for (let i = 0; i < 2; i++) {
            const a = prompt('Один из последних просмотренных фильмов?', ''),
                  b = prompt('На сколько оцените его?', '');
            if (a != null && b != null && a != '' && b!= '' && a.length < 50) {
                this.movies[a] = b;
                console.log('done');
            } else {
                i--;
                console.log('error');
            }
        }
    },
    writeYourGenres: function () {
        for (let i = 1; i < 4; i++) {
            this.genres[i-1] = prompt(`Ваш любимый жанр ${i}`, '');
            while (this.genres[i-1] == null || this.genres[i-1] == '' || this.genres[i-1].trim() == '') {
                this.genres[i-1] = prompt(`Ваш любимый жанр ${i}`, '');
            }
        }
        this.genres.forEach((item, i) => {
            console.log(`Любимый жанр ${i} - это ${item}`);
        });
    },
    showPersonStatus: function () {
        if (this.count < 10) {
            console.log("Просмотрено довольно мало фильмов");
        } else if (this.count >= 10 && this.count < 30) {
            console.log("Вы классический зритель");
        } else if (this.count >= 30) {
            console.log("Вы киноман");
        } else {
            console.log("Произошла ошибка");
        }
    },
    showMyDB: function () {
        if (this.privat === false) {
            for (let key in this) {
                if (this.hasOwnProperty(key)) {
                    console.log(`${key}: ${this[key]}`);
                }
            }
        }
    },
    toggleVisibleMyDB: function() {
        if (this.privat === false) {
            this.privat = true;
            this.showMyDB();
        } else {
            this.privat = false;
        }
    },
};

personalMovieDB.start();
// personalMovieDB.setPersonalFilms();
// personalMovieDB.writeYourGenres();
// personalMovieDB.showPersonStatus();
personalMovieDB.showMyDB();
personalMovieDB.toggleVisibleMyDB();


// console.log(personalMovieDB);
