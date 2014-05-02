var App = {
	// Timer initialization

	initialApp: function () {
		var canvasEle = document.getElementById('sortGraphic');
		var testArray = this.randomNumbers(5, 10);

		danTimer.init();
		debug.setLevel(9);

		this.excuteSort(testArray, canvasEle);
	},
	
	excuteSort: function (testArray, canvasEle) {
		var key = 'bubbleSort';
		danTimer.createNewTimer(key);

		sortUtility.bubbleSort(testArray).then(
			function (response) {
				doneCallback(response, key);

				barGraph.initBarGraph(response, canvasEle);
				barGraph.generateBarGraph();
			}
		);

		key = 'insertionSort';
		danTimer.createNewTimer(key);
		sortUtility.insertionSort(testArray).then(
			function (response) {
				doneCallback(response, key);
			}
		);

		key = 'selectionSort';
		danTimer.createNewTimer(key);
		sortUtility.selectionSort(testArray).then(
			function (response) {
				doneCallback(response, key);
			}
		);

		key = 'shellSort';
		danTimer.createNewTimer(key);
		sortUtility.shellSort(testArray).then(
			function (response) {
				doneCallback(response, key);
			}
		);

		key = 'heapSort';
		danTimer.createNewTimer(key);
		sortUtility.heapSort(testArray.slice(0)).then(
			function (response) {
				doneCallback(response, key);
			}
		);

		key = 'quickSort';
		danTimer.createNewTimer(key);
		sortUtility.quickSort(testArray, 0, testArray.length).then(
			function (response) {
				doneCallback(response, key);
			}
		);

		function doneCallback (response, key) {
			// document.write(key + ': ' + response + '<br>');
			danTimer.stopTimer(key);
			debug.info(key + ': ' + danTimer.getTrackTimerByKey(key) + ' ms');
		};
	},

	randomNumbers: function (digits, size) {
		var arr = [];

		while (arr.length < size) {
			arr.push(Math.floor(Math.random() * Math.pow(10, digits)));
		}

		return arr;
	}
};