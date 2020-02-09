import React, {Component} from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import TransactionsTable from './components/TransactionsTable';
import ProjectList from './components/ProjectList';
import PaymentMethodList from './components/PaymentMethodList';
import PaymentMethodChart from './components/PaymentMethodChart';
import transactionsData from './transactions.json';

// Функция возвращает массив платёжных систем с подсчётом всех совершённых транзакций по каждой системе и сортировкой по убыванию.
function getPaymentData(props) {
  const paymentMethods = [];

  for (var i = 0; props.length > i; i++) {
    var name = props[i].transaction.payment_method.name;
    var key = props[i].transaction.payment_method.id;
    var amountOfUse = 1;

    if (paymentMethods[key]) {
      amountOfUse = paymentMethods[key].amountOfUse + 1;
    }

    paymentMethods[key] = {
      amountOfUse: Number(amountOfUse),
      label: name
    };
  }

  return paymentMethods.sort((a, b) => b.amountOfUse - a.amountOfUse);
}

class App extends Component {
  render() {
    // paymentData нужны для построения рейтинга и графика платёжных систем.
    // Решил формировать массив данных для компонентов PaymentMethodList/PaymentMethodChart здесь.
    // Чтобы не делать этого каждый раз в этих компонентах.
    const paymentData = getPaymentData(transactionsData);

    return (
      <div className="container">
        <Tabs>
          <TabList>
            <Tab>Транзакции</Tab>
            <Tab>Проекты</Tab>
            <Tab>Платежные системы</Tab>
          </TabList>

          <TabPanel>
            <TransactionsTable data={transactionsData} />
          </TabPanel>

          <TabPanel>
            <ProjectList transactionsData={transactionsData} />
          </TabPanel>

          <TabPanel>
            <PaymentMethodList paymentData={paymentData} />
            <PaymentMethodChart paymentData={paymentData} />
          </TabPanel>
        </Tabs>
      </div>
    )
  }
}

export default App