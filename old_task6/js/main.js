// ================== Object ============================================ //

let appData = {
    money: 0,
    timeData: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
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
    chooseMainExpenses: function(array) { 
        for (let i = 0; i < array.length; i++) {
            if (i % 2 == 0) {
                let a = array[i],
                    b = array[i+1];
                if (this.checkInput(a) && this.checkInput(b)){
                    this.expenses[a] = b;
                }
            }
        }
    },
    chooseOptExpenses: function() {        // !!!!! Переделать
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
    },
    checkInput(str) {
        if (str != '' && str != null && str.trim() != '') {
            return true;
        }
    }
};

// inputs
const expItems = document.querySelectorAll('.expenses-item'),
    optExpItems = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncome = document.querySelector('choose-income'),
    savingsFlag = document.querySelector('.savings');

// buttons
const expBtn = document.querySelector('.expenses-item-btn'),
    optExpBtn  = document.querySelector('.optionalexpenses-btn'),
    countBudgetBtn = document.querySelector('.count-budget-btn'),
    startBtn = document.querySelector('#start');

// info
const expInfo = document.querySelector('.expenses-value');

expBtn.addEventListener('click', (event) => {
    let expArray = [];
    const isEmpties = [];
    expItems.forEach((input, i) => {
        expArray[i] = input.value;
    });
    expArray.forEach((item, i) => {
        if (!appData.checkInput(item)) {
            expItems[i].style.border = '1px solid #c00';
            event.target.textContent = 'Исправить';
            isEmpties[i] = false;
        } else {
            expItems[i].style.border = 'none';
            event.target.textContent = 'Утвердить';
            isEmpties[i] = true;
        }
    });
    if (!isEmpties.some((item) => { return item === false; })) {
        appData.chooseMainExpenses(expArray);
        expItems.forEach((input, i) => {
            input.value = '';
        });
        const keys = Object.keys(appData.expenses);
        expInfo.textContent = `${keys[0]}, ${keys[1]}`;
    }
    console.log(appData.expenses);
});
