var sortUtilityOrigin = (function($){

  function _callSort(method, array, params) {
    if (params === undefined) params = []; 
    var paramsStr = params.toString();
    var sortFun = '_' + method.toLowerCase() + 'Sort([' + array + '], ' + paramsStr + ')';

    return eval(sortFun);
  }

  /**
   *
   *
   *
   */
  function _bubbleSort (arr) {
    var i = 0,
      j = 0,
      swappedFlag = false,
      defer = $.Deferred();

    for (; i < arr.length; i += 1) {
      swappedFlag = false;
      for (j = 0; j < arr.length - i; j += 1) {
        console.log(i, j);
        if (arr[j] > arr[j + 1]) {
          temp = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = temp;
          swappedFlag = true;
        }
      }
      _sortHistory.push(arr.slice(0));
      // debug.info('b: ' + arr.toString());
      if (!swappedFlag) {
        break;
      } 
    }
    defer.resolve(arr);
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
  function _insertionSort (arr) {
    var defer = new $.Deferred();

    for (var i = 1; i < arr.length; i++) {
      for (var j = i; j > 0; j--) {
        if (arr[j] < arr[j - 1]) {
          var temp = arr[j];
          arr[j] = arr[j - 1];
          arr[j - 1] = temp;
        }
      };
      // document.write(arr.toString() + '<br>');
    }

    defer.resolve(arr);
    return defer.promise();
  }

  /**
   *
   *
   *
   */
  function _selectionSort (arr) {
    var minIndex = -1,
      minValue,
      temp,
      executeIndex = 0,
      defer = new $.Deferred();

    for (executeIndex; executeIndex < arr.length; executeIndex++) {
      minValue = arr[executeIndex];
      for (var i = executeIndex; i < arr.length; i++) {
        if (arr[i] < minValue) {
          minValue = arr[i];
          minIndex = i;
        }
      };

      if (minValue !== arr[executeIndex]) {
        temp = arr[minIndex];
        arr[minIndex] = arr[executeIndex];
        arr[executeIndex] = temp;
      }
      // document.write(arr.toString() + '<br>');
      // debug.info(arr.toString());
    };

    defer.resolve(arr);
    return defer.promise();
  }

  /**
   *
   *
   *
   */
  function _quickSort (arr, start, end) {
    var k,
      i = start,
      j = end;

    if (start < end) {
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
      }
      // debug.info(arr.toString() + '  pivot: ' + k);
      if (start < i - 1) {
        _quickSort(arr, start, i - 1);
      }
      if (i + 1 < end) {
        _quickSort(arr, i + 1, end);
      }

    }

    return arr;
  }

  /**
   *
   * 堆排序 (大堆根)
   * 建堆 -> 调堆
   *
   */
  function _heapSort (arr) {
    var temp,
      finalHeap = [],
      defer = new $.Deferred();


    if (arr.length > 1)　{
      _adjustHeap(arr);
    }

    while (arr.length > 0) {
      temp = arr[0];
      arr[0] = arr[arr.length - 1];
      arr[arr.length - 1] = temp;

      arr.length -= 1;
      _adjustHeap(arr);
      finalHeap.splice(0, 0, temp);
    }
    // document.write(finalHeap.toString());

    defer.resolve(finalHeap);
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
  function _shellSort (arr) {
    var increment,
      groupedArr = [],
      defer = new $.Deferred();

    if (arr.length > 1) {
      increment = parseInt(arr.length / 2);
      while (increment >= 1) {
        for (var i = 0; i < increment; i++) {
          groupedArr = [];
          groupedArr.length = 0;
          for (var j = 0; j * increment + i< arr.length; j++) {
            groupedArr.push(arr[j * increment + i]);
          };
          groupedArr = _insertionSort(groupedArr);
          for (var j = 0; j < groupedArr.length; j++) {
            arr[j * increment + i] = groupedArr[j];
          };
        };

        // document.write(arr.toString() + "<br>");
        increment = parseInt(increment / 2);
      }
    }

    defer.resolve(arr);
    return defer.promise();
  }

  function _mergeSort (arr) {
  }

  return {
    callSort: _callSort
  }
})(jQuery);