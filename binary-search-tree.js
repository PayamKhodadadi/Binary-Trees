// Before starting, copy and paste your guided practice work from
// `binary-search-tree.js` into this file

// Your code here
class TreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
  }
}

class BinarySearchTree {
  constructor() {
    this.root = null;
  }

  insert(val, currentNode = this.root) {
    let newNode = new TreeNode(val);

    if (this.root === null) {
      this.root = newNode;
      return;
    }

    if (val > currentNode.val) {
      if (!currentNode.right) currentNode.right = newNode;
      else this.insert(val, currentNode.right);
    }
    if (val < currentNode.val) {
      if (!currentNode.left) currentNode.left = newNode;
      else this.insert(val, currentNode.left);
    }
  }

  search(val) {
    if (this.root === null) return false;
    let currentNode = this.root;
    while (currentNode) {
      if (val < currentNode.val) {
        currentNode = currentNode.left;
      } else if (val > currentNode.val) {
        currentNode = currentNode.right;
      } else {
        return true;
      }
    }
    return false;
  }

  preOrderTraversal(currentNode = this.root) {
    if (!currentNode) return;
    console.log(currentNode.val);
    if (currentNode.left) this.preOrderTraversal(currentNode.left);
    if (currentNode.right) this.preOrderTraversal(currentNode.right);
  }

  inOrderTraversal(currentNode = this.root) {
    if (!currentNode) return;
    if (currentNode.left) this.inOrderTraversal(currentNode.left);
    console.log(currentNode.val);
    if (currentNode.right) this.inOrderTraversal(currentNode.right);
  }

  postOrderTraversal(currentNode = this.root) {
    if (!currentNode) return;
    if (currentNode.left) this.postOrderTraversal(currentNode.left);
    if (currentNode.right) this.postOrderTraversal(currentNode.right);
    console.log(currentNode.val);
  }

  // Breadth First Traversal - Iterative
  breadthFirstTraversal() {
    const queue = [];
    queue.push(this.root);

    while (queue.length > 0) {
      let node = queue.shift();
      console.log(node.val);

      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }
  }

  // Depth First Traversal - Iterative
  depthFirstTraversal() {
    const stack = [];
    stack.push(this.root);

    while (stack.length > 0) {
      let node = stack.pop();
      console.log(node.val);

      if (node.left) stack.push(node.left);
      if (node.right) stack.push(node.right);
    }
  }
}

module.exports = { BinarySearchTree, TreeNode };
