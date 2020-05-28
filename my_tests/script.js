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

/* for (let key in person) {
    console.log(`${key}: ${person[key]}`);
}
 */
const directivity = {
    course: 'JavaScript',
    tools: 'vs-code'
};

Object.assign(person, directivity);   // слить два объекта в один
// console.log(person);

const clone = Object.assign({}, directivity);  // создать поверхностный клон объекта
const clone2 = {...directivity};
const clone3 = JSON.parse(JSON.stringify(directivity)); // сделать глубокое клонирование
clone.course = 'React';
clone2.course = 'Node.js';
clone3.course = 'MongoDB';

console.log(clone);
console.log(clone2);
console.log(clone3);

const arr = [25, 9, 67, 14];
const arrClone1 = arr.slice();  // клонирование массивов
const arrClone2 = [...arr];
arrClone1[1] = 658;
arrClone2[1] = 211;


console.log(arr);
console.log(arrClone1);
console.log(arrClone2);
