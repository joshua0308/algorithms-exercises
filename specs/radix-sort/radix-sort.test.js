/*

  Implement a radix sort in a function called radixSort.

  You'll probably need several functions
  
  You can implement it using a binary or decimal based bucketing but I'd recommend the decimal based buckets because
  it ends up being a lot more simple to implement.

*/

function findBiggestNumber(array) {
  let biggest_number = array[0];
  for (const e of array) {
    if (e > biggest_number) {
      biggest_number = e;
    }
  }

  return biggest_number;
}

function getNthPlaceNum(num, n) {
  // num: 25, n: 1, return 5
  // num: 25, n: 2, return 2
  // num: 25, n: 3, return 0
  const splitted_num = String(num).split("");
  const num_len = splitted_num.length;

  return n > num_len ? 0 : splitted_num[num_len - n];
}

function getIterationNum(array) {
  return findBiggestNumber(array).toString().split("").length;
}

function radixSort(nums) {
  // Plan:
  // create buckets which will be a nested array
  // find the biggest number which will define n iterations we need
  // loop n times starting from 10, increment by 10 ^ n
  // num % 10
  // num % 100
  // num % 1000
  // iterate through the array and assign each number to a bucket
  // once every number is assigned to a bucket, put the numbers back to an array

  // if biggest number is 100, we have to iterate 3 times
  const iteration_num = getIterationNum(nums);

  for (let n = 1; n <= iteration_num; n += 1) {
    const bucket = [[], [], [], [], [], [], [], [], [], []]; // 0 ~ 9 (10 buckets)
    for (const num of nums) {
      let idx = getNthPlaceNum(num, n);
      bucket[idx].push(num);
    }

    nums = bucket.flat();
  }

  return nums;
}

// unit tests
// do not modify the below code
describe("radix sort", function () {
  it("should sort correctly", () => {
    const nums = [
      20, 51, 3, 801, 415, 62, 4, 17, 19, 11, 1, 100, 1244, 104, 944, 854, 34,
      3000, 3001, 1200, 633
    ];
    const ans = radixSort(nums);
    expect(ans).toEqual([
      1, 3, 4, 11, 17, 19, 20, 34, 51, 62, 100, 104, 415, 633, 801, 854, 944,
      1200, 1244, 3000, 3001
    ]);
  });
  it("should sort 99 random numbers correctly", () => {
    const fill = 99;
    const nums = new Array(fill)
      .fill()
      .map(() => Math.floor(Math.random() * 500000));
    const ans = radixSort(nums);
    expect(ans).toEqual(nums.sort((a, b) => a - b));
  });
});
