
const Chartist = require('node-chartist');

var data = {
	labels: ['1', '2', '3', '4', '5'],
	series: [
		{
			data: ['10', '25', '50', '75', '100']
		}
	]
};

var options = {
	axisX: {
		labelInterpolationFnc: function(value) {
			return 'Gen ' + value;
		}
	}
};

var responsiveOptions = [
	['screen and (min-width: 500px) and (max-width: 500px)', {
		showPoint: false,
		axisX: {
			labelInterpolationFnc: function(value) {
				return 'Gen ' + value;
			}
		}
	}],
	['screen and (max-width: 600px)', {
		showLine: false,
		axisX: {
			labelInterpolationFnc: function(value) {
				return 'G' + value;
			}
		}
	}]
];

new Chartist.Line('.majors', data, options, responsiveOptions);