import React, {Component} from 'react';
import CanvasJSReact from '../third-party/canvasjs.react';
var CanvasJSChart = CanvasJSReact.CanvasJSChart;

function getOptionsForChart(props) {
	var paymentData = props.paymentData;
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
			text: "График популярности платёжных систем",
			fontSize: 25,
			fontWeight: 'normal'
		},
		axisX: {
			title: "Платежные системы",
			reversed: true
		},
		axisY: {
			title: "Количество транзакций на систему"
		},
		data: [{
			type: "bar",
			dataPoints: dataPoints
		}]
	}
	
	return options;
}

// Потратил пару вечеров на освоение react-charts(от того же разработчика react-table) и оказалась сложным для понимания.
// Поэтому решил найти другой вариант для графика. CanvasJS оказался проще и понятнее.
// Плюс она поддерживается и используется в разных инструментах не только в React'е.
class PaymentChart extends Component {	
	render() {
		const options = getOptionsForChart(this.props);
        
		return (
            <div className="chart">
                <CanvasJSChart options={options} />
            </div>
		);
	}
}

export default PaymentChart