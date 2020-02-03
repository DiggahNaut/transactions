import React from 'react';

const PaymentMethodList = (props) => {
    const paymentMethodList = props.paymentData.map((row, index) => {
        return <li className="list-group-item" key={index}> {row.label} <span className="badge badge-primary badge-pill">{row.amountOfUse}</span> </li>;
    });
    
    return (
        <div className="text-center">
            <h3>Рейтинг популярности платёжных систем.</h3>
            <div>
                Рейтинг строится на основе всех совершенных транзакций платежной системой, независимо от статуса.
                Рейтинг идёт сверху вниз: от часто используемого к редко используемому.
            </div>

            <ul className="list-group">
                {paymentMethodList}
            </ul>
        </div>
    );
}

export default PaymentMethodList;