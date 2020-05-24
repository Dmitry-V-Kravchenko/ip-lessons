let money = prompt('Ваш бюджет на месяц?','') ,
    time = prompt('Введите дату в формате YYYY-MM-DD', '');
    
let appData = {
    money: money,
    timeData: time,
    expenses: {},
    optionalExpenses: {},
    income: [],
    savings: false
};

for (let i = 0; i < 2; i++) {
    let a = prompt('Введите обязательную статью расходов в этом месяце',''),
        b = prompt('Во сколько обойдется?','');
        if (a != null && b != null && a != '' && b != '' && a.length < 50) {
            appData.expenses[a] = b;
        } else {
            i--;
        }
}

const moneyPerDay = (appData.money / 30).toFixed(2);

if (moneyPerDay < 200) {
    console.log('Очень низкий достаток');
} else if (moneyPerDay >= 200 && moneyPerDay <= 2000) {
    console.log('Средний достаток');
} else if (moneyPerDay > 2000) {
    console.log('Высокий достаток');
} else {
    console.log('Произошла ошибка');
}