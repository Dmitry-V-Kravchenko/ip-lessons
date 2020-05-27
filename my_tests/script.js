'use strict';

const eduLevel = `education level`;

const person = {
    nameP: 'Дмитрий',
    age: 38,
    isProgrammer: true,
    [eduLevel]: 'bachelor\'s degree'
};

let {nameP, age} = person;

// console.log('education level' in person);

for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}