/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  // plan:
  // 1. create a max heap
  // 2. dequeue the first node (and push it to the end of the array)
  // 3. decrement heapSize
  // 4. call heapify on first element in the array
  // repeat until heapSize is 0
  createMaxHeap(array);

  for (let i = array.length - 1; i > 0; i -= 1) {
    swapPlace(0, i, array);
    heapify(array, 0, i);
  }

  return array;
};

const createMaxHeap = (array) => {
  // plan:
  // call heapify from the middle of the array to the root
  const middleIndex = Math.ceil(array.length / 2);
  const heapSize = array.length;

  for (let i = middleIndex; i >= 0; i -= 1) {
    heapify(array, i, heapSize);
  }
};

const heapify = (array, index, heapSize) => {
  // plan:
  // check the node's children
  // left child index: 2n + 1
  // right child index: 2n + 2
  // if either right or left node is greater than root,
  // swap the greater child with root
  // call heapify on the swapped index

  if (index >= heapSize) return;

  const leftIndex = index * 2 + 1;
  const rightIndex = index * 2 + 2;

  let largestValueIndex = index;

  if (leftIndex < heapSize && array[leftIndex] > array[largestValueIndex]) {
    largestValueIndex = leftIndex;
  }

  if (rightIndex < heapSize && array[rightIndex] > array[largestValueIndex]) {
    largestValueIndex = rightIndex;
  }

  if (largestValueIndex !== index) {
    swapPlace(index, largestValueIndex, array);
    heapify(array, largestValueIndex, heapSize);
  }
};

function swapPlace(index1, index2, array) {
  const temp = array[index1];
  array[index1] = array[index2];
  array[index2] = temp;
}

// unit tests
// do not modify the below code
describe("heap sort", function () {
  test("heapify with complete tree with both child", function () {
    const nums = [30, 70, 50];

    heapify(nums, 0, nums.length);

    expect(nums).toEqual([70, 30, 50]);
  });

  test("heapify with complete tree missing one child", function () {
    const nums = [30, 70];

    heapify(nums, 0, nums.length);

    expect(nums).toEqual([70, 30]);
  });

  test("createMaxHeap", function () {
    const nums = [30, 70, 50, 100];

    createMaxHeap(nums);

    expect(nums).toEqual([100, 70, 50, 30]);
  });

  test("heap sort", function () {
    const nums = [2, 5, 3, 8, 10, 6, 4, 7, 9, 1];

    heapSort(nums);

    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
