function askQuestion(quest) {
    return prompt(quest,'');
}
    
let appData = {
    money: askQuestion('Ваш бюджет на месяц?'),
    timeData: askQuestion('Введите дату в формате YYYY-MM-DD'),
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

function detectDayBudget(moneyCache) {
    return (moneyCache / 30).toFixed(2);
}

function detectLevel(moneyPerDay) {
    if (moneyPerDay < 200) {
        console.log('Очень низкий достаток');
    } else if (moneyPerDay >= 200 && moneyPerDay <= 2000) {
        console.log('Средний достаток');
    } else if (moneyPerDay > 2000) {
        console.log('Высокий достаток');
    } else {
        console.log('Произошла ошибка');
    }
}

function chooseMainExpenses(obj) {
    for (let i = 0; i < 2; i++) {
        let a = prompt('Введите обязательную статью расходов в этом месяце',''),
            b = prompt('Во сколько обойдется?','');
            if (a != null && b != null && a != '' && b != '' && a.length < 50) {
                obj[a] = b;
            } else {
                i--;
            }
    }
}

function chooseOptExpenses(obj) {
    for(let i = 0; i < 3; i++) {
        obj[i+1] = prompt('Статья необязательных расходов?','');
    }
}

chooseMainExpenses(appData.expenses);
const costOfDay = detectDayBudget(appData.money);
detectLevel(costOfDay);
chooseOptExpenses(appData.optionalExpenses);
