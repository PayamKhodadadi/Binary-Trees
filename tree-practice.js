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

function getHeight(rootNode) {
  if (!rootNode) return -1;
  return 1 + Math.max(getHeight(rootNode.left), getHeight(rootNode.right));
}

function balancedTree(rootNode) {
  function checkHeight(node) {
    if (!node) return 0; // height of empty tree = 0

    const leftHeight = checkHeight(node.left);
    if (leftHeight === -1) return -1; // left subtree unbalanced

    const rightHeight = checkHeight(node.right);
    if (rightHeight === -1) return -1; // right subtree unbalanced

    if (Math.abs(leftHeight - rightHeight) > 1) return -1; // current node unbalanced

    // return height if balanced
    return 1 + Math.max(leftHeight, rightHeight);
  }

  // If unbalanced, checkHeight returns -1
  return checkHeight(rootNode) !== -1;
}

function countNodes(rootNode) {
  if (rootNode === null) return 0; // base case

  // count current node + left subtree + right subtree
  return 1 + countNodes(rootNode.left) + countNodes(rootNode.right);
}

function getParentNode(rootNode, target) {
  // Case 1: Tree empty
  if (!rootNode) return undefined;

  // Case 2: Target is root
  if (rootNode.val === target) return null;

  // Case 3: Check left and right children
  if (
    (rootNode.left && rootNode.left.val === target) ||
    (rootNode.right && rootNode.right.val === target)
  ) {
    return rootNode;
  }

  // Case 4: Search left subtree
  let leftResult = getParentNode(rootNode.left, target);
  if (leftResult !== undefined) return leftResult;

  // Case 5: Search right subtree
  let rightResult = getParentNode(rootNode.right, target);
  if (rightResult !== undefined) return rightResult;

  // Case 6: Target not found
  return undefined;
}

function inOrderPredecessor(rootNode, target) {
  let prev = null;
  let result = undefined; // Will store the node (not value)

  function traverse(node) {
    if (!node || result !== undefined) return;

    traverse(node.left);

    if (node.val === target) {
      result = prev || null; // predecessor or null if none
      return;
    }

    prev = node; // previous visited node
    traverse(node.right);
  }

  traverse(rootNode);

  return result ? result.val : null;
}
function search(rootNode, target) {
  let currentNode = rootNode;

  // iterate through tree until a null child is found.
  while (currentNode !== null) {
    // return true if currentNode has desired value
    if (currentNode.val === target) return true;

    // determine next node by comparing nodes value to target value
    if (currentNode.val < target) currentNode = currentNode.right;
    else if (currentNode.val > target) currentNode = currentNode.left;
  }

  return false;
}
function deleteNodeBST(rootNode, target) {
  let parent;

  // Do a traversal to find the node. Keep track of the parent
  if (search(rootNode, target)) parent = getParentNode(rootNode, target);
  // Undefined if the target cannot be found
  else {
    return undefined;
  }

  // Set target based on parent
  let directionChild;
  if (!parent) target = rootNode;
  else if (parent.left && parent.left.val === target) {
    target = parent.left;
    directionChild = 'left';
  } else {
    target = parent.right;
    directionChild = 'right';
  }

  // Case 0: Zero children and no parent:
  if (parent === null && target.left === null && target.right === null)
    //   return null
    return null;

  // Case 1: Zero children:
  if (target.left === null && target.right === null) {
    //   Set the parent that points to it to null
    if (parent.left.val === target.val) parent.left = null;
    else parent.right = null;
  }

  // Case 2: Two children:
  else if (target.left && target.right) {
    let successor = findMinBST(target.right);
    deleteNodeBST(rootNode, successor);
    target.val = successor;
  }

  // Case 3: One child:
  else if ((target.left && !target.right) || (!target.left && target.right)) {
    // find child
    let child;
    if (target.left) child = target.left;
    else child = target.right;

    //   Make the parent point to the child
    if (directionChild === 'left') parent.left = child;
    else parent.right = child;
  }
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
