var App = angular.module('sortGraphicApp', []);
App.controller('AppController', function($scope) {

  $scope.canvasEle = null;
  $scope.tobeSortArray = [];
  $scope.sortedArrayHistory = [];
  $scope.sortMethod = ['Bubble', 'Insertion', 'Selection', 'Quick', 'Heap', 'Shell', 'Merge'];
  $scope.sortProgress = 0;
  $scope.sortInterval = 200;
  $scope.sortArrayMaxLength = 12;
  $scope.sortArrayDigits = 4;

  $scope.init = function () {
    $scope.canvasEle = document.getElementById('sortGraphic');

    danTimer.init();
    debug.setLevel(9);

    barGraph.prepareCanvas($scope.canvasEle);
  }

  $scope.convertStringToArray = function (sortMethodName) {
    $scope.tobeSortArray = $scope.randomNumbers($scope.sortArrayDigits, $scope.sortArrayMaxLength);
    
    barGraph.resetCanvas(true);
    $scope.excuteSort(sortMethodName);
  }

  $scope.excuteSort = function (sortMethod) {
    var testArray = $scope.tobeSortArray;

    danTimer.createNewTimer(sortMethod);
    barGraph.initBarGraph(testArray);
    barGraph.generateBaseBarGraph();
    var promise = sortUtility.callSort(sortMethod, testArray, $scope.sortInterval);
    promise.done(function (response) {
      doneCallback(response, sortMethod);
    });
    promise.progress(function (progress) {
      $scope.sortProgress = progress;
      $scope.$apply();
      // debug.info('progress: ' + $scope.sortProgress);
    });

    // sortMethod = 'heapSort';
    // danTimer.createNewTimer(sortMethod);
    // sortUtility.heapSort(testArray.slice(0)).then(
    //  function (response) {
    //    doneCallback(response, sortMethod);
    //  }
    // );

    function doneCallback (response, sortMethod) {
      // document.write(sortMethod + ': ' + response + '<br>');
      danTimer.stopTimer(sortMethod);
      debug.info(sortMethod + ': ' + danTimer.getTrackTimerByKey(sortMethod) + ' ms');

      $scope.sortedArrayHistory = response;
      $scope.$apply();
    };
  }

  $scope.randomNumbers = function (digits, size) {
    var arr = [];

    while (arr.length < size) {
      arr.push(Math.floor(Math.random() * Math.pow(10, digits)));
    }

    return arr;
  }

  $scope.init();
});