import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PaymentMethodChart from './PaymentMethodChart';

// Возможно стоило использовать getPaymentData функцию и передать transactions.json.
// Поскольку данные статические, решил использовать "заглушку" в виде переменной paymentData.
var paymentData = [
    {"amountOfUse": 71, "label": "Credit/Debit Cards"},
    {"amountOfUse": 15, "label": "PayPal"},
    {"amountOfUse": 8, "label": "Your Balance"},
    {"amountOfUse": 2, "label": "Webmoney"},
    {"amountOfUse": 2, "label": "Google Pay"},
    {"amountOfUse": 1, "label": "QIWI"},
    {"amountOfUse": 1, "label": "RAZER zGOLD"},
    {"amountOfUse": 1, "label": "MobileGo"}
];

// Этот тест постоянно падает из-за невозможности отображения CanvasJS(сторонняя библиотека для графика).
// Интернет в глубокой тишине, а сам не смог разобраться. Хотя график отображается корректно при просмотре в браузере.
// Есть подозрение что нужно вызывать CanvasJS отдельно и класть в компонент PaymentMethodChart.
// Сам по себе компонент PaymentMethodChart не имеет ничего кроме графика(CanvasJS) и маленького div'а в который помещается график.
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PaymentMethodChart paymentData={paymentData}/>, div);
});

it("check PaymentMethodChart snapshot", () => {
    const PaymentMethodChartComponent = renderer.create(<PaymentMethodChart paymentData={paymentData}/>).toJSON();
    expect(PaymentMethodChartComponent).toMatchSnapshot();
});