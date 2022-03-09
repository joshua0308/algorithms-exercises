// iterative
const breadthFirstTraverse = (queue, array) => {
  // plan:
  // we get a queue as an input
  // iterate through the queue
  // dequeue the first item in the queue
  // enqueue the right node, and the left node
  // add dequeued node's value to the array
  // iterate until queue is empty

  while (queue.length > 0) {
    const node = queue.shift();
    array.push(node.value);

    if (node.left) {
      queue.push(node.left);
    }

    if (node.right) {
      queue.push(node.right);
    }
  }

  return array;
};

// recursive
const breadthFirstTraverseRecursive = (queue, array) => {
  // what is our base case?
  if (queue.length === 0) {
    return array;
  }

  const node = queue.shift();
  array.push(node.value);

  if (node.left) queue.push(node.left);
  if (node.right) queue.push(node.right);
  // if left node exists, add left node to queue
  // if right node exists, add right node to queue

  return breadthFirstTraverseRecursive(queue, array);
};

// unit tests
// do not modify the below code
describe("breadth-first tree traversal", function () {
  const answer = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K"];

  const tree = {
    value: "A",
    left: {
      value: "B",
      left: {
        value: "D",
        left: {
          value: "G",
          left: null,
          right: null
        },
        right: null
      },
      right: {
        value: "E",
        left: null,
        right: {
          value: "H",
          left: {
            value: "K",
            left: null,
            right: null
          }
        }
      }
    },
    right: {
      value: "C",
      left: {
        value: "F",
        left: {
          value: "I",
          left: null,
          right: null
        },
        right: {
          value: "J",
          left: null,
          right: null
        }
      },
      right: null
    }
  };

  test("breadthFirstTraverse", () => {
    expect(breadthFirstTraverse([tree], [])).toEqual(answer);
  });

  test("breadthFirstTraverseRecursive", () => {
    expect(breadthFirstTraverseRecursive([tree], [])).toEqual(answer);
  });
});
