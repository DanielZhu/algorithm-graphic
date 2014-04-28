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
	function _quickSort (arr) {
		var key,
			keyIndex,
			temp,
			copyArr;

		if (arr !== undefined && arr.length > 1) {
			key = arr[0];
			keyIndex = 0;
		}
		for (var i = 1; i < arr.length; i++) {
			if (arr[i] < key) {
				temp = arr[i];
				arr.splice(i, 1);
				arr.splice(0, 0, temp);
				keyIndex++;
			}
		};
		debug.info(arr.toString());

		copyArr = arr;

		_quickSort(arr.splice(keyIndex + 1, arr.length - keyIndex - 1));
		_quickSort(copyArr.splice(0, keyIndex));
	}


	return {
		bubbleSort: _bubbleSort,
		insertionSort: _insertionSort,
		selectionSort: _selectionSort,
		quickSort: _quickSort
	}
})();