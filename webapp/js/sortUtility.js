var sortUtility = (function(){
	
	// Max in the end, min in the start

	/**
	 *
	 *
	 *
	 */
	function _bubbleSort (arr) {
		var i = 0, j = 0, temp, swappedFlag = false;

		if (arr !== undefined) {
			for (i ; i < arr.length; i += 1) {
				swappedFlag = false;
				j = 0;
				for (j ; j < arr.length - i; j += 1) {
					if (arr[j] > arr[j + 1]) {
						temp = arr[j];
						arr[j] = arr[j + 1];
						arr[j + 1] = temp;
						swappedFlag = true;
					}
				}
				debug.info(arr.toString());
				if (!swappedFlag) {
					break;
				}
			}
			return arr;
		}
	}

	/**
	 *
	 *
	 *
	 */
	function _insertionSort (arr) {
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
				debug.info(finalArr.toString());
			}

			return finalArr;
		}
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
			executeIndex = 0;

		for (executeIndex; executeIndex < arr.length; executeIndex++) {
			minValue = arr[executeIndex];
			for (var i = executeIndex; i < arr.length; i++) {
				if (arr[i] < minValue) {
					minValue = arr[i];
					minIndex = i;
				}
			};

			if (minIndex !== executeIndex) {
				temp = arr[minIndex];
				arr[minIndex] = arr[executeIndex];
				arr[executeIndex] = temp;
			}
			debug.info(arr.toString());
		};
	}

	/**
	 *
	 *
	 *
	 */
	function _quickSort (arr, start, end) {
		var k, i = start, j = end;

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
			debug.info(arr.toString() + '  pivot: ' + k);
			if (start < i - 1) {
				_quickSort(arr, start, i - 1);
			}
			if (i + 1 < end) {
				_quickSort(arr, i + 1, end);
			}

		}
		return arr;
	}
	// function _quickSort (arr, start, end) {
	// 	var k,
	// 		i = start,
	// 		j = end,
	// 		copyArr = arr.toString(),
	// 		left;

	// 	if (arr.length > 1 && j - i > 0) {
	// 		k = arr[i];
	// 		while (i < j) {
	// 			for (; j > i; j--) {
	// 				if (arr[j] < k) {
	// 					arr[i] = arr[j];
	// 					break;
	// 				}
	// 			};
	// 			for (; i < j; i++) {
	// 				if (arr[i] > k) {
	// 					arr[j] = arr[i];
	// 					break;
	// 				}
	// 			};
	// 			arr[i] = k;
	// 		}
	// 		// if (arr.toString() !== copyArr) {
	// 			return _quickSort(arr, 0, j - 1)+_quickSort(arr, j + 1, end);
	// 		// }
			
	// 	} else {
	// 		document.write(arr.toString());
	// 		document.write('<br >');
	// 		return arr;
	// 	}
	// }
	// function _quickSort(arr) {
	// 　　if (arr.length <= 1) { return arr; }
	// 　　var pivotIndex = Math.floor(arr.length / 2);
	// 　　var pivot = arr.splice(pivotIndex, 1)[0];
	// 　　var left = [];
	// 　　var right = [];
	// 　　for (var i = 0; i < arr.length; i++){
	// 　　　　if (arr[i] < pivot) {
	// 　　　　　　left.push(arr[i]);
	// 　　　　} else {
	// 　　　　　　right.push(arr[i]);
	// 　　　　}
	// 　　}
	// 　　return _quickSort(left).concat([pivot], _quickSort(right));
	// };

	// function _quickSort (arr) {
	// 	var k, i = 0, j = arr.length;

	// 	if (arr.length > 1) {
	// 		k = arr[0];
	// 		while (i < j) {
	// 			for (; j > i; j--) {
	// 				if (arr[j] < k) {
	// 					arr[i] = arr[j];
	// 					break;
	// 				}
	// 			};
	// 			for (; i < j; i++) {
	// 				if (arr[i] > k) {
	// 					arr[j] = arr[i];
	// 					break;
	// 				}
	// 			};
	// 			arr[i] = k;
	// 		}
	// 		document.write(arr.toString());
	// 		document.write('<br >');
	// 		_quickSort(arr.slice(0, i));
	// 		_quickSort(arr.slice(i + 1, arr.length));

	// 		console.log(arr);
	// 	}
	// }
	// function _initQuickSort (arr) {
	// 	var key,
	// 		keyIndex,
	// 		temp,
	// 		copyArr;

	// 	if (arr !== undefined && arr.length > 1) {
	// 		key = arr[0];
	// 		keyIndex = 0;
	// 	}
	// 	for (var i = 1; i < arr.length; i++) {
	// 		if (arr[i] < key) {
	// 			temp = arr[i];
	// 			arr.splice(i, 1);
	// 			arr.splice(0, 0, temp);
	// 			keyIndex++;
	// 		}
	// 	};
	// 	return arr;
	// }

	return {
		bubbleSort: _bubbleSort,
		insertionSort: _insertionSort,
		selectionSort: _selectionSort,
		quickSort: _quickSort
	}
})();