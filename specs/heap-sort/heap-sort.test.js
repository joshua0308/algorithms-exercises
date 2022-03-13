/*
  
  Create a function called heapSort that accepts an array and performs a heap sort on it in place (heap sorts are normally destructive)
  
  You will probably need at least two more functions: heapify and createMaxHeap
   
*/

const heapSort = (array) => {
  // plan:
  // 1. create a max heap
  // 2. dequeue the first node (and push it to the end of the array)
  // 3. decrement heapSize
  // 4. create a max heap
  // repeat until heapSize is 0

  createMaxHeap(array);
  let heapSize = array.length;
  while (heapSize > 0) {
    heapify(array, 0, heapSize);

    const maxValue = array[0];
    const lastValue = array[heapSize - 1];

    array[0] = lastValue;
    array[heapSize - 1] = maxValue;

    heapSize -= 1;
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
  // call heapify on the child with root

  if (index >= heapSize) return;

  const leftChildIndex = index * 2 + 1;
  const rightChildIndex = index * 2 + 2;
  const rootValue = array[index];
  const leftValue =
    leftChildIndex > heapSize - 1 ? -Infinity : array[leftChildIndex];
  const rightValue =
    rightChildIndex > heapSize - 1 ? -Infinity : array[rightChildIndex];

  if (leftValue > rightValue && leftValue > rootValue) {
    // swap root and left node
    // call heapify on right node
    array[index] = leftValue;
    array[leftChildIndex] = rootValue;
    heapify(array, leftChildIndex, heapSize);
  } else if (rightValue > leftValue && rightValue > rootValue) {
    // swap root and right node
    // call heapify on right node
    array[index] = rightValue;
    array[rightChildIndex] = rootValue;
    heapify(array, rightChildIndex, heapSize);
  }
};

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
    // eslint-disable-next-line no-console
    console.log("debug: nums", nums);
    expect(nums).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  });
});
