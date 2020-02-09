import React from 'react';
import ReactDOM from 'react-dom';
import renderer from 'react-test-renderer';
import PaymentMethodList from './PaymentMethodList';

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

// В этом компоненте происходит только рендер списка. Решил что снапшота и простого рендера без краша должно хватить.
it('renders without crashing', () => {
    const div = document.createElement('div');
    ReactDOM.render(<PaymentMethodList paymentData={paymentData}/>, div);
});

it("check PaymentMethodList snapshot", () => {
    const PaymentMethodListComponent = renderer.create(<PaymentMethodList paymentData={paymentData}/>).toJSON();
    expect(PaymentMethodListComponent).toMatchSnapshot();
});