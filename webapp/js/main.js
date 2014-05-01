(function($){
	// Timer initialization
	timer.init();
	debug.setLevel(9);

	var testArray = randomNumbers(5, 1000);
	var key = 'bubbleSort';
	timer.createNewTimer(key);
	sortUtility.bubbleSort(testArray).then(
		function (response) {
			doneCallback(response, key);
		}
	);

	key = 'insertionSort';
	timer.createNewTimer(key);
	sortUtility.insertionSort(testArray).then(
		function (response) {
			doneCallback(response, key);
		}
	);

	key = 'selectionSort';
	timer.createNewTimer(key);
	sortUtility.selectionSort(testArray).then(
		function (response) {
			doneCallback(response, key);
		}
	);

	key = 'shellSort';
	timer.createNewTimer(key);
	sortUtility.shellSort(testArray).then(
		function (response) {
			doneCallback(response, key);
		}
	);

	key = 'heapSort';
	timer.createNewTimer(key);
	sortUtility.heapSort(testArray.slice(0)).then(
		function (response) {
			doneCallback(response, key);
		}
	);

	key = 'quickSort';
	timer.createNewTimer(key);
	sortUtility.quickSort(testArray, 0, testArray.length).then(
		function (response) {
			doneCallback(response, key);
		}
	);

	function doneCallback (response, key) {
		// document.write(key + ': ' + response + '<br>');
		timer.stopTimer(key);
		debug.info(key + ': ' + timer.getTrackTimerByKey(key) + ' ms');
	};

	function randomNumbers (digits, size) {
		var arr = [];

		while (arr.length < size) {
			arr.push(Math.floor(Math.random() * Math.pow(10, digits)));
		}

		return arr;
	}
})(jQuery);

			
			
		
		
		
		
		