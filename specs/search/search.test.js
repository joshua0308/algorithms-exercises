// for both exercises, the id of the object you're searching for is given to you
// as integer. return the whole object that you're looking for
//
// it's up to you what to return if the object isn't found (we're not testing that)

function linearSearch(id, array) {
  // Plan:
  // iterate through the array
  // if there is match
  // return
  for (const e of array) {
    if (e.id === id) {
      return e;
    }
  }

  return null;
}

function binarySearch(id, array) {
  // Assumption:
  // we need to make the assumption that the array is sorted
  // Plan:
  // check the element in the middle of the array
  // divide array in half using length and slice
  // if smaller than element in the middle, look to the left
  // if larger than element in the middle, look to the right
  // if element in the middle, return
  // repeat

  while (array.length > 1) {
    const middle_index = Math.round(array.length / 2);
    if (id < array[middle_index].id) {
      array = array.slice(0, middle_index);
    } else if (id > array[middle_index].id) {
      array = array.slice(middle_index + 1);
    } else if (id === array[middle_index].id) {
      return array[middle_index];
    }
  }

  return array[0];
}

// unit tests
// do not modify the below code
test("linear search", function () {
  const lookingFor = { id: 5, name: "Brian" };
  expect(
    linearSearch(5, [
      { id: 1, name: "Sam" },
      { id: 11, name: "Sarah" },
      { id: 21, name: "John" },
      { id: 10, name: "Burke" },
      { id: 13, name: "Simona" },
      { id: 31, name: "Asim" },
      { id: 6, name: "Niki" },
      { id: 19, name: "Aysegul" },
      { id: 25, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 2, name: "Marc" },
      { id: 51, name: "Chris" },
      lookingFor,
      { id: 14, name: "Ben" }
    ])
  ).toBe(lookingFor);
});

test("binary search", function () {
  const lookingFor = { id: 23, name: "Brian" };
  expect(
    binarySearch(23, [
      { id: 1, name: "Sam" },
      { id: 3, name: "Sarah" },
      { id: 5, name: "John" },
      { id: 6, name: "Burke" },
      { id: 10, name: "Simona" },
      { id: 12, name: "Asim" },
      { id: 13, name: "Niki" },
      { id: 15, name: "Aysegul" },
      { id: 17, name: "Kyle" },
      { id: 18, name: "Jem" },
      { id: 19, name: "Marc" },
      { id: 21, name: "Chris" },
      lookingFor,
      { id: 24, name: "Ben" }
    ])
  ).toBe(lookingFor);
});
