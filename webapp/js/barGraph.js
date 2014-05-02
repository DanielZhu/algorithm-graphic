var barGraph = (function($){
	var _data,	// Should be the array
		_yAxisMax = 400,	// The max length of Y axis
		_xAxisMax = 600,	// The max length of X axis
		_barWidth,	// The width for each bar
		_barMargin = 20,	// The margin between two bars
		_barCounts,	// total counts of bar
		_yAxisUnitCounts = 5,
		_yAxisUnitHeight,	// Divide y axis to several part
		_barFillColor = '#0000FF',
		_barTextColor = '#FFFFFF',
		_barLabelColor = '#000000',
		_cxt,
		_canvas,
		_digits = 0,
		_scaleRate,
		_arrayCeilInteger,
		_axisPadding = 50,
		_yAxisLabelWidth = 100,
		_xAxisLabelHeigth = 100,
		_xAxisTotalLength = _xAxisMax + _axisPadding,
		_yAxisTotalLength = _yAxisMax + _axisPadding;

	function _initBarGraph (dataArray, canvasEle) {
		_data = dataArray;
		_barCounts = _data.length;
		_barWidth = (_xAxisMax - _barCounts * _barMargin) / _barCounts;
		_calcYAxisMax();
		_yAxisUnitHeight = _yAxisMax / _yAxisUnitCounts;

		_prepareCanvas(canvasEle);
	}

	function _prepareCanvas (canvasEle) {
		_canvas = canvasEle;
		if (_canvas == null)
			return false;
		
		_cxt = _canvas.getContext("2d");
	}

	function _drawAxis () {
		_cxt.beginPath();
		_cxt.moveTo(_yAxisLabelWidth, 0);
		// Draw the y axis
		_cxt.lineTo(_yAxisLabelWidth, _yAxisTotalLength);
		// Draw the x axis
		_cxt.moveTo(_yAxisLabelWidth, _yAxisTotalLength);
		_cxt.lineTo(_xAxisTotalLength + _yAxisLabelWidth, _yAxisTotalLength);
		_cxt.stroke();
		_cxt.closePath();
	}

	function _drawBars () {
		var rectX,
			rectY,
			rectHeight;

		for (var i = 0; i < _data.length; i++) {
			rectX = _yAxisLabelWidth + (i + 1) * _barMargin + i * _barWidth;
			rectHeight = _data[i] / _scaleRate;
			rectY = _yAxisTotalLength - rectHeight;

			_cxt.fillStyle = _barFillColor;
			_cxt.textBaseline = "bottom";
			_cxt.fillRect(rectX, rectY, _barWidth, rectHeight);
			_cxt.stroke();
			_drawTexts(_data[i], rectX + 2, rectY - 5);
		};
	}

	function _drawTexts (value, x, y) {
		if (_digits > 4) {
			return;
		}

		_cxt.font="12px Arial";
		_cxt.textAlign="start";
		_cxt.fillText(value, x, y);
		_cxt.stroke();
	}

	function _drawLabels () {
		var _yAxisLabels = [],
			labelYPos;
		
		// Draw the labels of y axis
		for (var i = 0; i <= _yAxisUnitCounts; i++) {
			_yAxisLabels.push(Math.floor(_arrayCeilInteger / _yAxisUnitCounts * i));

			_cxt.beginPath();
			labelYPos = _yAxisTotalLength - _yAxisMax / _yAxisUnitCounts * i;
			_cxt.moveTo(_yAxisLabelWidth - 10, labelYPos);
			_cxt.lineTo(_yAxisLabelWidth + 10, labelYPos);
			_cxt.stroke();
			_cxt.closePath();

			_cxt.textAlign = "end";
			_cxt.fillText(_yAxisLabels[i], _yAxisLabelWidth - 20, labelYPos);  
		};

		_cxt.textBaseline = "top";
		_cxt.fillText('Value', _yAxisLabelWidth - 10, 0);
		// Draw the labels of y axis
		// TDDO
	}

	function _generateBarGraph () {
		_drawAxis();
		_drawLabels();
		_drawBars();
	}

	/*
	 * C
	 *
	 */
	function _calcYAxisMax () {
		var maxValue,
			copyMaxValue;

		if (_data.length >= 1) {
			maxValue = _data[0];
			copyMaxValue = _data[0];
		}

		for (var i = 0; i < _data.length; i++) {
			if (_data[i] > copyMaxValue) {
				copyMaxValue = _data[i];
			}
		};
		// store the max item
		maxValue = copyMaxValue;

		while ((copyMaxValue = copyMaxValue / 10) > 1) {
			_digits++;
		}

		highestDigit = parseInt(maxValue / Math.pow(10, _digits));

		// Calc the ceil integer according to the max value from the array
		_arrayCeilInteger = (highestDigit + 1) * Math.pow(10, _digits);

		// Calc the scale rate for Y axis
		_scaleRate = (_arrayCeilInteger < _yAxisMax ? 1 : _arrayCeilInteger / _yAxisMax);
	}

	return {
		initBarGraph: _initBarGraph,
		generateBarGraph: _generateBarGraph
	}
})(jQuery);