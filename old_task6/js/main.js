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
    chooseOptExpenses: function(array) {
        array.forEach((input, i) => {
            this.optionalExpenses[i+1] = input;
        });
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
const expInfo = document.querySelector('.expenses-value'),
      optExpInfo = document.querySelector('.optionalexpenses-value');

expBtn.addEventListener('click', (event) => {
    const expArray = [];
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
        expItems.forEach((input) => {
            input.value = '';
        });
        const keys = Object.keys(appData.expenses);
        expInfo.textContent = `${keys[0]}, ${keys[1]}`;
    }
    // console.log(appData.expenses);
});

optExpBtn.addEventListener('click', (event) => {
    const optArray = [],
          isEmpties = [];

    let str = '';

    optExpItems.forEach((input, i) => {
        optArray[i] = input.value;
    });

    optArray.forEach((item, i) => {
        if (!appData.checkInput(item)) {
            optExpItems[i].style.border = '1px solid #c00';
            event.target.textContent = 'Исправить';
            isEmpties[i] = false;
        } else {
            optExpItems[i].style.border = 'none';
            event.target.textContent = 'Утвердить';
            isEmpties[i] = true;
        }
    });

    if (!isEmpties.some((item) => { return item === false; })) {
        appData.chooseOptExpenses(optArray);
        optExpItems.forEach((input) => {
            input.value = '';
        });
        for(let key in appData.optionalExpenses) {
            str += ` ${key}. ${appData.optionalExpenses[key]}, `;
        }
    }
    str = str.slice(0, -2);
    str += '.';
    optExpInfo.textContent = str;

    // console.log(appData.optionalExpenses);
});
