/*
  AVL Tree
  
  Name you class/function (anything we can call new on) Tree
  
  I would suggest making a Node class as well (it will help _a lot_ with AVL trees) Whereas with BSTs we 
  could get away with most of the logic living in the Tree class, that will be a lot tougher with AVL
  trees dues how the function calls must be recursive in order to get the balancing correct.
  
  Tree must a method called add that takes a value and adds it to the tree and then correctly balances the
  tree. There is only one correct structure for any given order of adding numbers and the unit tests enforce
  that structure.
  
  If you have any questions conceptually about balancing the tree, refer to the class website.
  
  Make sure you are calling the properties
  of the Nodes as follows:
  value - integer - the value being store in the tree
  left  - Node    - the subtree containing Node's with values less than the current Node's value
  right - Node    - the subtree containing Node's with values greater than the current Node's value

*/

class Tree {
  constructor() {
    this.root = null;
  }

  add(value) {
    if (!this.root) {
      this.root = new Node(value);
    } else {
      this.root.add(value);
    }
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.right = null;
    this.left = null;
    this.height = 0; // the max height of one of its children + 1
  }

  get rightHeight() {
    return this.right ? this.right.height + 1 : 0;
  }

  get leftHeight() {
    return this.left ? this.left.height + 1 : 0;
  }

  getHeight() {
    return Math.max(this.rightHeight, this.leftHeight);
  }

  add(value) {
    if (value > this.value) {
      if (this.right) {
        this.right.add(value);
      } else {
        this.right = new Node(value);
      }
    } else {
      if (this.left) {
        this.left.add(value);
      } else {
        this.left = new Node(value);
      }
    }

    this.height = this.getHeight();
    this.balance();
  }

  balance() {
    if (this.leftHeight - this.rightHeight >= 2) {
      // if node is left heavy, but left child is right heavy
      // first, perform right rotation on left child
      if (this.left.rightHeight > this.left.leftHeight) {
        this.left.rotateRR();
      }

      this.rotateLL();
    } else if (this.rightHeight - this.leftHeight >= 2) {
      // if node is right heavy, but right child is left heavy
      // first, perform left rotation on right child
      if (this.right.leftHeight > this.right.rightHeight) {
        this.right.rotateLL();
      }

      this.rotateRR();
    }
  }

  rotateRR() {
    // rotate right
    // a
    //   b
    //     c

    //   b
    // a   c

    const aNode = this;
    const bNode = this.right;
    const cNode = this.right.right;

    // 1. swap values of aNode and bNode
    const tempValue = aNode.value;
    aNode.value = bNode.value;
    bNode.value = tempValue;

    // 2. assign cNode to aNode's right child
    // 3. assign bNode to aNode's left child
    // 4. assign aNode's original left child to bNode's left
    // 5. assign bNode's original left child to bNode's right
    const aNodeOriginalLeft = aNode.left;
    const bNodeOriginalLeft = bNode.left;
    aNode.left = bNode;
    aNode.right = cNode;
    bNode.left = aNodeOriginalLeft;
    bNode.right = bNodeOriginalLeft;

    this.updateHeightInNewLocation();
  }

  rotateLL() {
    // rotate left
    //     a
    //   b
    // c

    //   a
    // c   b

    const aNode = this;
    const bNode = this.left;
    const cNode = this.left.left;

    // 1. swap values of aNode and bNode
    const tempValue = aNode.value;
    aNode.value = bNode.value;
    bNode.value = tempValue;

    // 2. assign cNode to aNode's left child
    // 3. assign bNode to aNode's right child
    // 4. assign aNode's original right child to bNode's right
    // 5. assign bNode's original right child to bNode's left
    const aNodeOriginalRight = aNode.right;
    const bNodeOriginalRight = bNode.right;
    aNode.left = cNode;
    aNode.right = bNode;
    bNode.right = aNodeOriginalRight;
    bNode.left = bNodeOriginalRight;

    this.updateHeightInNewLocation();
  }

  updateHeightInNewLocation() {
    if (this.right === null && this.left === null) {
      this.height = 0;
    } else {
      if (this.right) this.right.updateHeightInNewLocation();
      if (this.left) this.left.updateHeightInNewLocation();

      this.height = this.getHeight();
    }
  }
}

// unit tests
// do not modify the below code
describe("AVL Tree", function () {
  test("creates a correct tree with right rotation", () => {
    const nums = [4, 6, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));

    expect(tree.root.value).toEqual(6);
    expect(tree.root.height).toEqual(1);

    expect(tree.root.right.value).toEqual(8);
    expect(tree.root.right.height).toEqual(0);
    expect(tree.root.right.right).toBeNull();
    expect(tree.root.right.left).toBeNull();

    expect(tree.root.left.value).toEqual(4);
    expect(tree.root.left.height).toEqual(0);
    expect(tree.root.left.right).toBeNull();
    expect(tree.root.left.left).toBeNull();
  });

  test("creates a correct tree with left rotation", () => {
    const nums = [8, 6, 4];
    const tree = new Tree();
    nums.map((num) => tree.add(num));

    expect(tree.root.value).toEqual(6);
    expect(tree.root.height).toEqual(1);

    expect(tree.root.right.value).toEqual(8);
    expect(tree.root.right.height).toEqual(0);
    expect(tree.root.right.right).toBeNull();
    expect(tree.root.right.left).toBeNull();

    expect(tree.root.left.value).toEqual(4);
    expect(tree.root.left.height).toEqual(0);
    expect(tree.root.left.right).toBeNull();
    expect(tree.root.left.left).toBeNull();
  });

  test("creates a correct tree with double rotation", () => {
    const tree = new Tree();
    tree.add(6);
    tree.add(10);
    tree.add(8);

    expect(tree.root.value).toEqual(8);
    expect(tree.root.height).toEqual(1);

    expect(tree.root.right.value).toEqual(10);
    expect(tree.root.right.height).toEqual(0);
    expect(tree.root.right.right).toBeNull();
    expect(tree.root.right.left).toBeNull();

    expect(tree.root.left.value).toEqual(6);
    expect(tree.root.left.height).toEqual(0);
    expect(tree.root.left.right).toBeNull();
    expect(tree.root.left.left).toBeNull();
  });

  test("creates a correct tree", () => {
    const nums = [3, 7, 4, 6, 5, 1, 10, 2, 9, 8];
    const tree = new Tree();
    nums.map((num) => tree.add(num));
    const objs = tree.root;

    expect(objs.value).toEqual(4);

    expect(objs.left.value).toEqual(2);

    expect(objs.left.left.value).toEqual(1);
    expect(objs.left.left.left).toBeNull();
    expect(objs.left.left.right).toBeNull();

    expect(objs.left.right.value).toEqual(3);
    expect(objs.left.right.left).toBeNull();
    expect(objs.left.right.right).toBeNull();

    expect(objs.right.value).toEqual(7);

    expect(objs.right.left.value).toEqual(6);
    expect(objs.right.left.right).toBeNull();

    expect(objs.right.left.left.value).toEqual(5);
    expect(objs.right.left.left.left).toBeNull();
    expect(objs.right.left.left.right).toBeNull();

    expect(objs.right.right.value).toEqual(9);

    expect(objs.right.right.left.value).toEqual(8);
    expect(objs.right.right.left.left).toBeNull();
    expect(objs.right.right.left.right).toBeNull();

    expect(objs.right.right.right.value).toEqual(10);
    expect(objs.right.right.right.left).toBeNull();
    expect(objs.right.right.right.right).toBeNull();
  });
});
