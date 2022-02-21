/*
  LinkedList
  
  Name your class / constructor (something you can call new on) LinkedList
  
  LinkedList is made by making nodes that have two properties, the value that's being stored and a pointer to
  the next node in the list. The LinkedList then keep track of the head and usually the tail (I would suggest
  keeping track of the tail because it makes pop really easy.) As you may have notice, the unit tests are the
  same as the ArrayList; the interface of the two are exactly the same and should make no difference to the
  consumer of the data structure.
  
  length - integer  - How many elements in the list
  push   - function - accepts a value and adds to the end of the list
  pop    - function - removes the last value in the list and returns it
  get    - function - accepts an index and returns the value at that position
  delete - function - accepts an index, removes value from list, collapses, 
                      and returns removed value
                      
  I would suggest making a second class, a Node class. However that's up to you how you implement it. A Node
  has two properties, value and next.

  As always, you can change describe to xdescribe to prevent the unit tests from running while
  you work
*/

class LinkedList {
  constructor() {
    this.head = null;
    this.length = 0;
  }

  push(value) {
    // PLAN:
    // create node

    // if entry point is null
    // set entry point to node

    // if entry point points to a next node
    // goto the next node
    // keep repeating until there is no next node
    // point the lastest node to the target node
    const node = new Node(value);

    this.length += 1;

    if (this.head === null) {
      this.head = node;
    } else {
      let curNode = this.head;
      while (curNode.next) {
        curNode = curNode.next;
      }

      curNode.next = node;
    }
  }

  pop() {
    // PLAN:
    // if entry point is null, return null
    // while cur.next
    // move to the next node
    // when cur.next is null
    // set the prev to null
    // decrement length
    // and return cur

    if (this.head === null) return null;
    this.length -= 1;

    if (this.head.next === null) {
      const popped_node = this.head;
      this.head = null;
      return popped_node.value;
    }

    let prevNode = this.head;
    let curNode = this.head.next;

    while (curNode.next) {
      prevNode = curNode;
      curNode = curNode.next;
    }

    prevNode.next = null;
    return curNode.value;
  }

  get(n) {
    // PLAN:
    // iterate through linked list n times
    // return nth node

    if (n === 0) return this.head.value;

    let curNode = this.head;
    let counter = 0;
    while (curNode.next) {
      curNode = curNode.next;
      counter += 1;

      if (n === counter) {
        return curNode.value;
      }
    }

    return null;
  }

  delete(n) {
    // PLAN:
    // set prevNode and curNode
    // if curNode's index equals to n,
    // point prevNode to curNode's next
    // if curNode's next does not exist, point to null

    let prevNode = this.head;
    let curNode = this.head.next;
    let counter = 1;

    if (n === 0) {
      this.head = this.head.next;
      this.length -= 1;
    }

    if (n === 1) {
      this.head.next = null;
      this.length -= 1;
    }

    while (curNode.next) {
      prevNode = curNode;
      curNode = curNode.next;
      counter += 1;
      if (n === counter) {
        prevNode.next = curNode.next ? curNode.next : null;
        this.length -= 1;
        return;
      }
    }
  }
}
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

// unit tests
// do not modify the below code
describe("LinkedList", function () {
  const range = (length) =>
    Array.apply(null, { length: length }).map(Number.call, Number);
  const abcRange = (length) =>
    range(length).map((num) => String.fromCharCode(97 + num));
  let list;

  beforeEach(() => {
    list = new LinkedList();
  });

  test("constructor", () => {
    expect(list).toEqual(expect.any(LinkedList));
  });

  test("push", () => {
    abcRange(26).map((character) => list.push(character));
    expect(list.length).toEqual(26);
  });

  test("pop", () => {
    abcRange(13).map((character) => list.push(character));

    expect(list.length).toEqual(13);

    range(10).map(() => list.pop());

    expect(list.length).toEqual(3);
    expect(list.pop()).toEqual("c");
  });

  test("pop 2", () => {
    abcRange(2).map((character) => list.push(character));

    expect(list.length).toEqual(2);
    expect(list.pop()).toEqual("b");

    expect(list.length).toEqual(1);
    expect(list.pop()).toEqual("a");

    expect(list.length).toEqual(0);
    expect(list.pop()).toEqual(null);
  });

  test("get", () => {
    list.push("first");

    expect(list.get(0)).toEqual("first");

    list.push("second");
    expect(list.get(1)).toEqual("second");
    expect(list.get(0)).toEqual("first");

    abcRange(26).map((character) => list.push(character));

    expect(list.get(27)).toEqual("z");
    expect(list.get(0)).toEqual("first");
    expect(list.get(9)).toEqual("h");

    list.pop();

    expect(list.get(list.length - 1)).toEqual("y");
    expect(list.get(100)).toEqual(null);
  });

  test("delete", () => {
    abcRange(26).map((character) => list.push(character));

    list.delete(13);

    expect(list.length).toEqual(25);
    expect(list.get(12)).toEqual("m");
    expect(list.get(13)).toEqual("o");

    list.delete(0);

    expect(list.length).toEqual(24);
    expect(list.get(0)).toEqual("b");
  });

  test("delete 2", () => {
    abcRange(5).map((character) => list.push(character));

    list.delete(2);

    expect(list.length).toEqual(4);
  });
});
