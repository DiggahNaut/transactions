import React, {Component} from 'react';
import CanvasJSReact from './canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

// Потратил некоторое количество времени на освоение react-charts(от того же разработчика react-table) и оказалось сложнее.
// Поэтому решил найти другой вариант для графика. CanvasJS оказался проще и понятнее.
// Плюс она поддерживается и используется в разных инструментах не только в React'е.
class PaymentChart extends Component {
	render() {
        var paymentData = this.props.paymentData;
        var dataPoints = [];

        for (var i = 0; i < paymentData.length; i++) {
            if (paymentData[i]) {
                dataPoints.push({label: paymentData[i].label, y: paymentData[i].amountOfUse});
            }
        }

		const options = {
			animationEnabled: true,
			theme: "light2",
			title:{
				text: "График популярности платёжных систем"
			},
			axisX: {
				title: "Платежные системы",
				reversed: true,
			},
			axisY: {
				title: "Количество транзакций на систему"
			},
			data: [{
				type: "bar",
                dataPoints: dataPoints
			}]
        }
        
		return (
            <div className="chart">
                <CanvasJSChart options = {options} />
            </div>
		);
	}
}

export default PaymentChart