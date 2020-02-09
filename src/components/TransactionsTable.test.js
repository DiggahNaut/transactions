import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import TransactionsTable from './TransactionsTable';
import transactionsData from '../transactions.json';

// В TransactionsTable в основном использован сторонний компонент. Хотелось бы узнать что можно протестировать тут и каким образом?
// И как вообще тестировать компоненты со сторонними библиотеками/компонентами?
// Мои предположения: Имитацию браузера с нажатием на кнопки, Проверка загрузки стороннего компонента,
// Проверка изменения количества строк в отображаемом списке при изменении количества из селектора,
// Проверка поиска и изменения таблицы с соответствующим поиском.
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<TransactionsTable data={transactionsData}/>, div);
});

it("check TransactionsTable snapshot", () => {
    const TransactionsTableComponent = renderer.create(<TransactionsTable data={transactionsData}/>).toJSON();
    expect(TransactionsTableComponent).toMatchSnapshot();
});