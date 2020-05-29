'use strict';

let appData = {
    money: 0,
    timeData: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    askQuestion: function() {
        this.money = prompt('Ваш бюджет на месяц?','');
        // this.timeData = prompt('Введите дату в формате YYYY-MM-DD','');
    },
    detectDayBudget: function () {
        return (this.money / 30).toFixed(2);
    },
    detectLevel: function() {
        const moneyPerDay = this.detectDayBudget();
        if (moneyPerDay < 200) {
            console.log('Очень низкий достаток');
        } else if (moneyPerDay >= 200 && moneyPerDay <= 2000) {
            console.log('Средний достаток');
        } else if (moneyPerDay > 2000) {
            console.log('Высокий достаток');
        } else {
            console.log('Произошла ошибка');
        }
    },
    chooseMainExpenses: function() {
        for (let i = 0; i < 2; i++) {
            let a = prompt('Введите обязательную статью расходов в этом месяце',''),
                b = prompt('Во сколько обойдется?','');
                if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                    this.expenses[a] = b;
                } else {
                    i--;
                }
        }
    },
    chooseOptExpenses: function() {
        for(let i = 0; i < 3; i++) {
            this.optionalExpenses[i+1] = prompt('Статья необязательных расходов?','');
            if (this.optionalExpenses[i+1] == '' || 
                this.optionalExpenses[i+1] == null ||
                this.optionalExpenses[i+1].trim() == '') {
                    console.log('Некорректный ввод!');
            }
        }
        for (let key in this.optionalExpenses) {
            console.log(`Способы доп. заработка: ${key}. ${this.optionalExpenses[key]} `);
        }
    },
    chooseIncome: function() {
        this.income = prompt('Введите источники дополнительных доходов через запятую', '').split(', ');
        this.income.push(prompt('Что-то еще?', ''));
        this.income.sort();
        console.log(this.income);
    },
    displayObj: function() {
        for (let key in this) {
            console.log(`${key}: ${this[key]}`);
        }
    }
};

appData.askQuestion();
appData.detectLevel();
// appData.chooseMainExpenses();
// appData.chooseOptExpenses();
// appData.displayObj();

// console.log(appData);
