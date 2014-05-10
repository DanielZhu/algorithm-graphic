var sortUtility = (function($){
  var _sortHistory = [],
    _queueTotalCount = 0,
    _queue = [];

  // Max in the end, min in the start

  function _callSort(method, array, timeInterval) {
    var sortFunc = '_' + method.toLowerCase() + 'Sort([' + array + '], ' + timeInterval + ')';

    _clearSortHistory();

    resetQueue();
    debug.info(array.toString());
    return eval(sortFunc);
  }

  function _clearSortHistory () {
    _sortHistory = [];
    _sortHistory.length = 0;
  }

  var delayed = (function () {
    _queue = [];

    function processQueue() {
      if (_queue.length > 0) {
        setTimeout(function () {
          _queue.shift().cb();
          processQueue();
        }, _queue[0].delay);
      }
    }

    return function delayed(delay, cb) {
      _queue.push({ delay: delay, cb: cb });
      _queueTotalCount += 1;

      if (_queue.length === 1) {
        processQueue();
      }
    };
  }());

  function resetQueue () {
    _queueTotalCount = 0;
    _queue = [];
  }

  /**
   *
   *
   *
   */
  function _bubbleSort (arr, timeInterval) {
    var i = 0,
      j = 0,
      swappedFlag = false,
      defer = $.Deferred(),
      progress = 0;

    setTimeout(function () {
        for (; i < arr.length; i += 1) {
          swappedFlag = false;
          for (j = 0; j < arr.length - i; j += 1) {
            if (arr[j] > arr[j + 1]) {
              temp = arr[j];
              arr[j] = arr[j + 1];
              arr[j + 1] = temp;
              swappedFlag = true;
   
              delayed(timeInterval, function (j, arr) {
                return function() {
                  progress = (_queueTotalCount - _queue.length) / (_queueTotalCount) * 100;
                  if (progress == 100) {
                    barGraph.drawBars(arr, []);
                  } else {
                    barGraph.drawBars(arr, [j, j + 1]);
                  }
                  defer.notify(progress);
                };
              }(j, arr.slice(0)));
            }
          }
          _sortHistory.push(arr.slice(0));
        }
        // defer.resolve(_sortHistory);
    }, 100);
    
    return defer.promise();
  }

  /**
   * Insertion Sort
   *
   * Poor version
   *
   * Need an extra array space to keep a temp array
   */
  function _lazyInsertionSort (arr) {
    var i = 0,
      currentItem,
      finalArr = [];

    if (arr !== undefined && arr.length > 1) {
      finalArr[0] = arr.splice(0, 1)[0];
      while (arr.length > 0) {
        i = 0;
        currentItem = arr.splice(0, 1)[0];
        while (finalArr[i] !== undefined) {
          if (currentItem < finalArr[i]) {
            finalArr.splice(i, 0, currentItem);
            break;
          } else {
            i++;
          }
        }
        if (i === finalArr.length) {
          finalArr.push(currentItem);
        }
        // debug.info(finalArr.toString());
      }

      return finalArr;
    }
  }

  /**
   * Insertion Sort
   *
   * Standard version
   */
  function _insertionSort (arr, timeInterval) {
    var defer = $.Deferred(),
      progress = 0;

    setTimeout(function () {
      for (var i = 1; i < arr.length; i++) {
        for (var j = i; j > 0; j--) {
          if (arr[j] < arr[j - 1]) {
            var temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
  
            delayed(timeInterval, function (j, arr) {
              return function() {
                progress = (_queueTotalCount - _queue.length) / (_queueTotalCount) * 100;
                if (progress == 100) {
                  barGraph.drawBars(arr, []);
                } else {
                  barGraph.drawBars(arr, [j, j - 1]);
                }
                defer.notify(progress);
              }
            }(j, arr.slice(0)));
          }
        };
      }
    }, 100);

    // defer.resolve(arr);
    return defer.promise();
  }

  /**
   *
   *
   *
   */
  function _selectionSort (arr, timeInterval) {
    var minX = -1,
      minValue,
      exeX = 0,
      defer = $.Deferred(),
      progress = 0;

    setTimeout(function () {
      for (exeX; exeX < arr.length; exeX++) {
        minValue = arr[exeX];
        for (var i = exeX; i < arr.length; i++) {
          if (arr[i] < minValue) {
            minValue = arr[i];
            minX = i;
          }
        }
        if (minValue !== arr[exeX]) {
          var temp = arr[minX];
          arr[minX] = arr[exeX];
          arr[exeX] = temp;
        }
        delayed(timeInterval, function (exeX, minX, arr) {
          return function() {
            progress = (_queueTotalCount - _queue.length) / (_queueTotalCount) * 100;
            if (progress == 100) {
              barGraph.drawBars(arr, []);
            } else {
              barGraph.drawBars(arr, [minX, exeX]);
            }
            defer.notify(progress);
            // debug.info(arr.toString());
          }
        }(exeX, minX, arr.slice(0)));
      }
    }, 100);

    // defer.resolve(arr);
    return defer.promise();
  }

  /**
   *
   *
   *
   */
  function _quickSort (arr, timeInterval, start, end) {
    var k,
      i = start = (start === undefined ? 0 : start),
      j = end = (end === undefined ? arr.length - 1 : end),
      defer = $.Deferred(),
      progress = 0;

    setTimeout(function () {
      delayed(timeInterval, function (arr, i, j, k, start, timeInterval, end) {
        return function() {
          var originStart = i, originEnd = j;
          barGraph.drawBars(arr, [originStart, originEnd], start);
          if (i < j) {
            k = arr[start];
            while (i < j) {
              for (; j > i; j--) {
                if (arr[j] < k) {
                  arr[i] = arr[j];
                  break;
                }
              };
              
              for (; i < j; i++) {
                if (arr[i] > k) {
                  arr[j] = arr[i];
                  break;
                }
              };
              
              arr[i] = k;

              defer.notify(progress);
              debug.info(arr.toString() + '  pivot: ' + k);
              barGraph.drawBars(arr, [originStart, originEnd], i);
            }
           
            // if (start < i - 1) {
              _quickSort(arr, timeInterval, start, i - 1);
            // }
            // if (i + 1 < end) {
              _quickSort(arr, timeInterval, i + 1, end);
            // }
          }
        }
      }(arr, i, j, k, start, timeInterval, end));
    }, 100);

    // defer.resolve(arr);
    return defer.promise();
  }

  /**
   *
   * 堆排序 (大堆根)
   * 建堆 -> 调堆
   *
   */
  function _heapSort (arr, timeInterval) {
    var temp,
      finalHeap = [],
      defer = $.Deferred(),
      progress = 0,
      frontArr = [],
      backArr = [];

    if (arr.length > 1)　{
      _adjustHeap(arr);
    }

    setTimeout(function () {
      for (var i = 0; i < arr.length; i++) {
        temp = arr[0];
        arr[0] = arr[arr.length - 1 - i];
        arr[arr.length - 1 - i] = temp;

        // arr.length -= 1;
        frontArr = arr.slice(0, arr.length - 1 - i);
        backArr = arr.slice(arr.length - 1 - i);

        _adjustHeap(frontArr);

        arr = frontArr.concat(backArr);
        delayed(timeInterval, function (arr, i) {
          return function() {
            progress = (_queueTotalCount - _queue.length) / (_queueTotalCount) * 100;
            if (progress == 100) {
              barGraph.drawBars(arr, []);
            } else {
              barGraph.drawBars(arr, [i, 2 * i + 1, 2 * i + 2]);
            }

            defer.notify(progress);
            debug.info(arr.toString());
          }
        }(arr.slice(0), i));
      }
    }, 100);

    // defer.resolve(finalHeap);
    return defer.promise();
  }

  /*
   * Start with the last root node, if its two children bigger than itself, exchange them.
   * Make sure all the roots and their children fit the heap requirement.
   *
   * Root > Children
   */
  function _adjustHeap (arr) {
    var i = parseInt(arr.length / 2) - 1;

    while (i >= 0) {
      if (arr[i] < arr[2 * i + 1]  || arr[i] < arr[2 * i + 2]) {
        if (arr[2 * i + 1] < arr[2 * i + 2]) {
          arr[2 * i + 2] = [arr[i], arr[i] = arr[2 * i + 2]][0];
        } else {
          arr[2 * i + 1] = [arr[i], arr[i] = arr[2 * i + 1]][0];
        }
        _adjustHeap(arr);
      }
      i--;
    };
  }

  /*
   * Shell Sort
   *
   * Example:
   * 13,27,49,55,4,49,38,65,97,76 (increment = 5)
   * 4,27,13,49,38,55,49,65,97,76 (increment = 2)
   * 4,13,27,38,49,49,55,65,76,97 (increment = 1)
   *
   */
  function _shellSort (arr, timeInterval) {
    var increment,
      groupedArr = [],
      defer = $.Deferred(),
      progress = 0;

    setTimeout(function () {
      if (arr.length > 1) {
        for (increment = parseInt(arr.length / 2); increment >= 1; increment = parseInt(increment / 2)) {
          for (var i = 0; i < increment; i++) {
            delayed(timeInterval, function(i, increment, groupedArr, arr) {
              return function() {
                var focusArray = [];
                groupedArr = [];
                groupedArr.length = 0;
                for (var j = 0; j * increment + i< arr.length; j++) {
                  focusArray.push(j * increment + i);
                  groupedArr.push(arr[j * increment + i]);
                };
                groupedArr = sortUtilityOrigin.callSort('insertion', groupedArr).then(
                  function (response) {
                    for (var j = 0; j < response.length; j++) {
                      arr[j * increment + i] = response[j];
                    };
                
                    progress = (_queueTotalCount - _queue.length) / (_queueTotalCount) * 100;
                    if (progress == 100) {
                      barGraph.drawBars(arr, []);
                    } else {
                      barGraph.drawBars(arr, focusArray);
                    }
                    defer.notify(progress);
                    debug.info(arr.toString());
                  }
                );
              // };
              }
            }(i, increment, groupedArr, arr));
          };
        }
      }
    }, 100);

    // defer.resolve(arr);
    return defer.promise();
  }

  function _mergeSort (arr, timeInterval) {
    // set group by 2^i (i >= 1)
    var pow = 1;
    var groupSize = Math.pow(2, pow); // 2, 4, 8, 16...
    var groupCount = arr.length; // groupSize
    var middleArr = [];
    var defer = $.Deferred(),
      progress = 0;

    // while (groupCount > 1) {
      for (var i = 0; i < groupCount; i += groupSize) {
        if (arr[i] > arr[i + 1]) {
          _swapObjects(arr, i, i + 1);
        }
      };
      pow++;
      debug.info(arr.toString());
      groupSize = Math.pow(2, pow);
      groupCount = arr.length / groupSize;
    // }
    // sort within the group

    while (groupCount > 1) {
      middleArr = [];
      // Sort the sub group
      for (var j = 0; j < groupCount; j += 1) {
        var end = ((j + 1) * groupSize - 1 > arr.length) ?　arr.length : ((j + 1) * groupSize - 1);
        arr = sortUtilityOrigin.callSort('quick', arr, [j * groupSize, end]);
      }

      for (var i = 0; i < groupCount; i += 2) {
        middleArr = [];
        var firstGroup = arr.slice(i * groupSize, (i + 1) * groupSize); // 0, 3
        var secondGroup = arr.slice((i + 1) * groupSize, groupSize * (i + 2)); // 4, 7
        var middleLength = firstGroup.length + secondGroup.length;
        while (middleArr.length !== middleLength) {
          if ((firstGroup.length > 0 && secondGroup.length == 0) || firstGroup[0] < secondGroup[0]) {
            middleArr.push(firstGroup.splice(0, 1)[0]);
          } else {
            middleArr.push(secondGroup.splice(0, 1)[0]);
          }
        }
        var lastPart = arr.slice(i * groupSize + middleArr.length);
        arr = arr.slice(0, i * groupSize).concat(middleArr, lastPart);
      }
      pow++;
      delayed(timeInterval, function (arr) {
        return function() {
          progress = (_queueTotalCount - _queue.length) / (_queueTotalCount) * 100;
          if (progress == 100) {
            barGraph.drawBars(arr, []);
          } else {
            barGraph.drawBars(arr, []);
          }

          defer.notify(progress);
          debug.info(arr.toString());
        }
      }(arr));

      debug.info(arr.toString());
      groupSize = Math.pow(2, pow);
      groupCount = arr.length / groupSize;
    }

    return defer.promise();
  }

  function _swapObjects (arr, obj1Index, obj2Index) {
      var temp = arr[obj1Index];
      arr[obj1Index] = arr[obj2Index];
      arr[obj2Index] = temp;
  }

  return {
    callSort: _callSort
  }
})(jQuery);