/*
  Write a function that performs mergesort
  Name the function mergeSort
  It will take in a array of numbers and return a sorted array numbers

  You'll need to write more than just one function
*/

function mergeSort(numsArray) {
  // base case:
  // if one el in arry, return el
  if (numsArray.length === 1) return numsArray;

  // split the array into two
  const middle = Math.round(numsArray.length / 2);
  const arr1 = numsArray.slice(0, middle);
  const arr2 = numsArray.slice(middle, numsArray.length);

  // merge( mergeSort(arr1), mergeSort(arr2) )
  return merge(mergeSort(arr1), mergeSort(arr2));
}

function merge(arr1, arr2) {
  let mergedArr = [];
  // compare arr1[0] and arr2[0]
  // if one is smaller than the other, shift the array and push the element to returnArr
  // do the comparison again
  // do until one of the arr is empty

  while (arr1.length && arr2.length) {
    if (arr1[0] < arr2[0]) {
      mergedArr.push(arr1.shift());
    } else {
      mergedArr.push(arr2.shift());
    }
  }

  if (arr1.length) {
    mergedArr = mergedArr.concat(arr1);
  } else {
    mergedArr = mergedArr.concat(arr2);
  }

  return mergedArr;
}

// unit tests
// do not modify the below code
test("merge sort", function () {
  expect(mergeSort([2, 1])).toEqual([1, 2]);

  const nums = [10, 5, 3, 8, 2, 6, 4, 7, 9, 1];
  const ans = mergeSort(nums);
  expect(ans).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
});
