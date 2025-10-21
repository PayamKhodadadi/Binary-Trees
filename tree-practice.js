const { BinarySearchTree, TreeNode } = require('./binary-search-tree.js');
// Before starting, copy and paste your guided practice work into the copy
// of `binary-search-tree.js` in this folder

// Practice problems on binary trees

function findMinBST(rootNode) {
  let current = rootNode;
  let min = current.val;
  while (current.left !== null) {
    min = current.left.val;
    current = current.left;
  }
  return min;
}

function findMaxBST(rootNode) {
  let current = rootNode;
  let max = current.val;
  while (current.right !== null) {
    max = current.right.val;
    current = current.right;
  }
  return max;
}

function findMinBT(rootNode) {
  //Optimized iterative time:O(n) space:O(h)Fastest, simple, handles subtrees
  if (!rootNode) return null;
  const stack = [];
  stack.push(rootNode);
  let min = rootNode.val;
  while (stack.length > 0) {
    let node = stack.pop();
    if (node.val < min) min = node.val;
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return min;
}

function findMaxBT(rootNode) {
  const stack = [];
  stack.push(rootNode);
  let max = rootNode.val;
  while (stack.length > 0) {
    let node = stack.pop();
    if (node.val > max) max = node.val;
    if (node.left) stack.push(node.left);
    if (node.right) stack.push(node.right);
  }
  return max;
}
//      4
//    /   \
//   2     6
//  / \   / \
// 1   3 5   7
function getHeight(rootNode) {
  if (!rootNode) return -1;
  // if (!rootNode.left && !rootNode.right) return 0;

  let height = -1;
  const queue = [rootNode];

  while (queue.length > 0) {
    let levelSize = queue.length; // number of nodes in this level

    // process all nodes in the current level
    for (let i = 0; i < levelSize; i++) {
      let node = queue.shift();
      if (node.left) queue.push(node.left);
      if (node.right) queue.push(node.right);
    }

    // after processing one full level, increase height
    height++;
  }
  return height;
}

function balancedTree(rootNode) {
  // Your code here
}

function countNodes(rootNode) {
  // Your code here
}

function getParentNode(rootNode, target) {
  // Your code here
}

function inOrderPredecessor(rootNode, target) {
  // Your code here
}

function deleteNodeBST(rootNode, target) {
  // Do a traversal to find the node. Keep track of the parent
  // Undefined if the target cannot be found
  // Set target based on parent
  // Case 0: Zero children and no parent:
  //   return null
  // Case 1: Zero children:
  //   Set the parent that points to it to null
  // Case 2: Two children:
  //  Set the value to its in-order predecessor, then delete the predecessor
  //  Replace target node with the left most child on its right side,
  //  or the right most child on its left side.
  //  Then delete the child that it was replaced with.
  // Case 3: One child:
  //   Make the parent point to the child
}

module.exports = {
  findMinBST,
  findMaxBST,
  findMinBT,
  findMaxBT,
  getHeight,
  countNodes,
  balancedTree,
  getParentNode,
  inOrderPredecessor,
  deleteNodeBST,
};
