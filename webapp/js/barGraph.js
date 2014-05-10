var barGraph = (function($){
  var _data,  // Should be the array
    _totalSteps = [],
    _lastStepArray = [],
    _yAxisMax = 400,  // The max length of Y axis
    _xAxisMax = 650,  // The max length of X axis
    _barWidth,  // The width for each bar
    _barMargin = 2,  // The margin between two bars
    _barStartX = 15,
    _barCounts, // total counts of bar
    _yAxisUnitCounts = 5,
    _yAxisUnitHeight, // Divide y axis to several part
    _barFillColor = '#0000FF',
    _barFocusColor = '#FF00FF',
    _barExtraHighColor = '#FF0000',
    _barTextColor = '#FFFFFF',
    _barLabelColor = '#000000',
    _cxt,
    _canvas,
    _digits = 0,
    _scaleRate,
    _arrayCeilInteger,
    _axisPadding = 40,
    _resetWhole = null,
    _initialized = false,
    _yAxisLabelWidth = 100,
    _xAxisLabelHeigth = 100,
    _xAxisTotalLength = _xAxisMax + _axisPadding,
    _yAxisTotalLength = _yAxisMax + _axisPadding,
    _focusXArray; 

  function _initBarGraph (dataArray) {
    _data = dataArray;
    _barCounts = _data.length;
    _barWidth = (_xAxisMax - _barCounts * _barMargin - _barStartX) / _barCounts;
    _yAxisUnitHeight = _yAxisMax / _yAxisUnitCounts;
    if (!_initialized) {
      _calcYAxisMax();
      _initialized = !_initialized;
    }
  }

  function _prepareCanvas (canvasEle) {
    _canvas = canvasEle;
    if (_canvas == null)
      return false;

    _cxt = _canvas.getContext("2d");
  }

  /* Reset the canvas
   *
   * - Keep the array not being changed
   * - The array changed, need to re-caculate the axis and redraw everything
   *
   */
  function _resetCanvas (clearWhole) {
    _resetWhole = clearWhole;
    if (clearWhole) {
      _cxt.clearRect(0, 0, _canvas.width, _canvas.height);
    } else {
      _cxt.clearRect(_yAxisLabelWidth + _barStartX + _barMargin, 0, _xAxisTotalLength, _yAxisTotalLength - 2);
    }
  }

  function clearRectByIndex (index) {
    if (index >= 0 && index < _data.length) {
      rectX = _yAxisLabelWidth + _barStartX + (index + 1) * _barMargin + index * _barWidth;
      _cxt.clearRect(rectX - 2, 0, _barWidth + 4, _yAxisTotalLength);
    }
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

  // function _drawBarsByStep (stepNo) {
  //   if (stepNo < _totalSteps.length) {
  //     _resetCanvas(false);
  //     _drawBars(_totalSteps[stepNo]);
  //     setTimeout(function () {
  //       _drawBarsByStep(++stepNo);
  //     }, 1000);
  //   }
  // }

  function _drawBars (stepArray, focusXArray, extraHigh) {
    var rectX,
      rectY,
      rectHeight,
      barValue;

    for (var i = 0; i < stepArray.length; i++) {
      // if (stepArray[i] === _lastStepArray[i] && i > 0 && _focusXArray.indexOf(i) === -1) {
      //   continue;
      // } else {
        clearRectByIndex(i);
      // }
      rectX = _yAxisLabelWidth + _barStartX + (i + 1) * _barMargin + i * _barWidth;
      rectHeight = stepArray[i] / _scaleRate;
      rectY = _yAxisTotalLength - rectHeight;

      if (focusXArray.indexOf(i) !== -1) {
        clearRectByIndex(i);
        _cxt.fillStyle = _barFocusColor; 
      } else {
        _cxt.fillStyle = _barFillColor;
      }

      if (extraHigh == i) {
        _cxt.fillStyle = _barExtraHighColor;
      }

      _cxt.textBaseline = "bottom";
      _cxt.fillRect(rectX, rectY, _barWidth, rectHeight);
      _cxt.stroke();

      if (_digits < 9 && _barCounts <= 15) {
        if (_digits >= 7) {
          barValue = Math.floor(stepArray[i] / 10000) +  'w';
        } else if (_digits >= 5) {
          barValue = Math.floor(stepArray[i] / 1000) +  'k';
        } else {
          barValue = stepArray[i];
        }
        _drawTexts(barValue, rectX + 2, rectY - 5);
      }
    }

    _focusXArray = focusXArray;

    _lastStepArray = stepArray.slice(0);
  }

  function _drawTexts (value, x, y) {
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
      _cxt.fillStyle = '#000000';
      _cxt.moveTo(_yAxisLabelWidth, labelYPos);
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

  function _generateBaseBarGraph () {
    if (_resetWhole) {
      _calcYAxisMax();
    }
    _drawAxis();
    _drawLabels();
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

    // Because we can't use Math.log10() now
    _digits = parseInt(Math.log(copyMaxValue) / Math.log(10) + 1);

    highestDigit = parseInt(maxValue / Math.pow(10, _digits - 1));

    // Calc the ceil integer according to the max value from the array
    _arrayCeilInteger = (highestDigit + 1) * Math.pow(10, _digits - 1);

    // Calc the scale rate for Y axis
    // _scaleRate = (_arrayCeilInteger < _yAxisMax ? 1 : _arrayCeilInteger / _yAxisMax);
    _scaleRate = _arrayCeilInteger / _yAxisMax;
  }

  return {
    initBarGraph: _initBarGraph,
    generateBaseBarGraph: _generateBaseBarGraph,
    resetCanvas: _resetCanvas,
    prepareCanvas: _prepareCanvas,
    // drawBarsByStep: _drawBarsByStep,
    drawBars: _drawBars
  }
})(jQuery);