// ================== Object ============================================ //

let appData = {
    money: 0,
    timeData: 0,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false,
    savingSum: 0,
    savingPercent: 0,
    getMounthBudget: function() {
        let money = prompt('Введите ежемесячную зарплату:', '');
        while(!this.checkInput(money) || !isFinite(money)) {
            money = prompt('Введите зарплату в числовом формате:', '');
        }
        this.money = money;
    },
    detectDayBudget: function () {
        return (this.money / 30).toFixed(2);
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
    chooseIncome: function(str) {
        str = str.trim();
        if (str[str.length - 1] === '.') {
            str = str.slice(0, -1);
        }
        this.income = str.split(',');
        this.income.forEach((item) =>{
            item = item.trim();
        });
        this.income.sort();
    },
    detectLevel: function() {
        const moneyPerDay = this.detectDayBudget();
        if (moneyPerDay < 200) {
            return 'Очень низкий достаток';
        } else if (moneyPerDay >= 200 && moneyPerDay <= 2000) {
            return 'Средний достаток';
        } else if (moneyPerDay > 2000) {
            return 'Высокий достаток';
        } else {
            return 'Произошла ошибка';
        }
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

// ========== Выборки ============================================//

// inputs
const expItems = document.querySelectorAll('.expenses-item'),
    optExpItems = document.querySelectorAll('.optionalexpenses-item'),
    chooseIncInput = document.querySelector('.choose-income'),
    savingsFlag = document.querySelector('#savings'),
    chooseItems = document.querySelectorAll('.choose-sum, .choose-percent'),
    dateItems = document.querySelectorAll('.day-value, .month-value, .year-value');

// buttons
const expBtn = document.querySelector('.expenses-item-btn'),
    optExpBtn  = document.querySelector('.optionalexpenses-btn'),
    countBudgetBtn = document.querySelector('.count-budget-btn'),
    startBtn = document.querySelector('#start');

// info
const expInfo = document.querySelector('.expenses-value'),
      optExpInfo = document.querySelector('.optionalexpenses-value'),
      budget = document.querySelector('.budget-value'),
      dayBudgetInfo = document.querySelector('.daybudget-value'),
      dayBudgetLevelInfo = document.querySelector('.level-value'),
      incomeInfo = document.querySelector('.income-value'),
      monthSavingInfo = document.querySelector('.monthsavings-value'),
      yearSavingInfo = document.querySelector('.yearsavings-value');
      

// =========== Обработчики =================================== //

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

countBudgetBtn.addEventListener('click', () => {
    appData.getMounthBudget();
    budget.innerHTML = appData.money + ' &#8381;';
    dayBudgetInfo.innerHTML = appData.detectDayBudget() + ' &#8381;';
    dayBudgetLevelInfo.textContent = appData.detectLevel();
});

chooseIncInput.addEventListener('blur', () => {
    appData.chooseIncome(chooseIncInput.value);
    incomeInfo.textContent = appData.income.join(', ') + '.';
});

document.addEventListener('DOMContentLoaded', (event) => {
    chooseItems.forEach((input) => {
        input.setAttribute('disabled','');
        input.style.backgroundColor = '#ddd';
    });
    
    let date = new Date(),
        dateArr = [];
    appData.timeData = date.toLocaleDateString();
    dateArr = appData.timeData.split('.');
    dateArr.reverse();
    dateItems.forEach((input, i) => {
        input.value = dateArr[i];
    });
});

savingsFlag.addEventListener('change', (event) => {
    if (savingsFlag.checked) {
        appData.savings = true;
        chooseItems.forEach((input) => {
            input.removeAttribute('disabled');
            input.style.backgroundColor = '#fff';
        });
    } else {
        chooseItems.forEach((input) => {
            appData.savings = false;
            input.value = '';
            input.setAttribute('disabled','');
            input.style.backgroundColor = '#ddd';
        });        
    }
});

startBtn.addEventListener('click', () => {
    const savingArr = [];
    if (appData.savings) {
        chooseItems.forEach((input, i) => {
            savingArr[i] = input.value;
        });
        for (let item of savingArr) {
            if (!appData.checkInput(item) || !isFinite(item)) {
                item = 0;
            }
        }
        appData.savingSum = +savingArr[0];
        appData.savingPercent = +savingArr[1];
        yearSavingInfo.innerHTML = (appData.savingSum * appData.savingPercent / 100).toFixed(2) + ' &#8381;';
        monthSavingInfo.innerHTML = (appData.savingSum * appData.savingPercent / 100 / 12).toFixed(2) + ' &#8381;';
    }
});

