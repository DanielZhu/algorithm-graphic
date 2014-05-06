function AppController ($scope) {
	// Timer initialization

	$scope.canvasEle = null;
	$scope.tobeSortArray = [];
	$scope.sortedArrayHistory = [];
	$scope.sortMethod = ['Bubble', 'Insertion', 'Selection', 'Quick', 'Heap', 'Shell', 'Merge'];

	initialApp = function () {
		$scope.canvasEle = document.getElementById('sortGraphic');

		danTimer.init();
		debug.setLevel(9);

		barGraph.prepareCanvas($scope.canvasEle);
		// this.excuteSort(testArray, canvasEle);
	};

	$scope.convertStringToArray = function () {
		// var dataArray = $scope.tobeSortArray.split(',');
		// $scope.$apply(function () {
  //           $scope.tobeSortArray = dataArray;
  //       });
		$scope.tobeSortArray = $scope.randomNumbers(4, 14);
		$scope.sortedArrayHistory.push($scope.tobeSortArray);
		barGraph.resetCanvas(true);
		$scope.excuteSort();
	}

	$scope.excuteSort = function () {
		var key = 'bubbleSort',
			testArray = $scope.tobeSortArray;

		danTimer.createNewTimer(key);

		sortUtility.bubbleSort(testArray).then(
			function (response) {
				doneCallback(response, key);

				barGraph.initBarGraph(response);
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

		// key = 'heapSort';
		// danTimer.createNewTimer(key);
		// sortUtility.heapSort(testArray.slice(0)).then(
		// 	function (response) {
		// 		doneCallback(response, key);
		// 	}
		// );

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
	};

	$scope.randomNumbers = function (digits, size) {
		var arr = [];

		while (arr.length < size) {
			arr.push(Math.floor(Math.random() * Math.pow(10, digits)));
		}

		return arr;
	}
}