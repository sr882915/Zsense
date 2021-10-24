
window.onload = function () {

var options = {
	animationEnabled: true,  
	title:{
		text: "Monthly Sales - 2020"
	},
	axisX: {
		valueFormatString: "MMM"
	},
	axisY: {
		title: "Sales (in USD)",
		prefix: "$"
	},
	data: [{
		yValueFormatString: "$#,###",
		xValueFormatString: "MMMM",
		type: "spline",
		dataPoints: [
			{ x: new Date(2020, 0), y: 66.67 },
			{ x: new Date(2020, 1), y: 106.68 },
			{ x: new Date(2020, 2), y: 160.01 },
			{ x: new Date(2020, 3), y: 400.03 },
			{ x: new Date(2020, 4), y: 200.02 },
			{ x: new Date(2020, 5), y: 253.36 },
			{ x: new Date(2020, 6), y: 387.26 },
			{ x: new Date(2020, 7), y: 266.25 },
			{ x: new Date(2020, 8), y: 287.26 },
			{ x: new Date(2020, 9), y: 326.35 },
			{ x: new Date(2020, 10), y: 399.06 },
			{ x: new Date(2020, 11), y: 385.17 }
		]
	}]
};
$("#chartContainer").CanvasJSChart(options);

}