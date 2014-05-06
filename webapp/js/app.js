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

	$scope.convertStringToArray = function (sortMethodName) {
		// var dataArray = $scope.tobeSortArray.split(',');
		// $scope.$apply(function () {
  //           $scope.tobeSortArray = dataArray;
  //       });
		$scope.tobeSortArray = $scope.randomNumbers(4, 14);
		
		barGraph.resetCanvas(true);
		$scope.excuteSort(sortMethodName);
	}

	$scope.excuteSort = function (sortMethod) {
		var	testArray = $scope.tobeSortArray;

		danTimer.createNewTimer(sortMethod);

		sortUtility.callSort(sortMethod, testArray).then(
			function (response) {
				doneCallback(response, sortMethod);
				$scope.sortedArrayHistory = response;
				barGraph.initBarGraph(response);
				barGraph.generateBaseBarGraph();
				barGraph.drawBarsByStep(0);
			}
		);

		// sortMethod = 'heapSort';
		// danTimer.createNewTimer(sortMethod);
		// sortUtility.heapSort(testArray.slice(0)).then(
		// 	function (response) {
		// 		doneCallback(response, sortMethod);
		// 	}
		// );

		function doneCallback (response, sortMethod) {
			// document.write(sortMethod + ': ' + response + '<br>');
			danTimer.stopTimer(sortMethod);
			debug.info(sortMethod + ': ' + danTimer.getTrackTimerByKey(sortMethod) + ' ms');
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