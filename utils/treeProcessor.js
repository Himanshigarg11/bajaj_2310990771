function calculateDepth(node, graph) {
  const children = graph[node] || [];

  if (children.length === 0) {
    return 1;
  }

  let maxDepth = 0;

  for (const child of children) {
    maxDepth = Math.max(maxDepth, calculateDepth(child, graph));
  }

  return maxDepth + 1;
}
function buildTree(node, graph) {
  const children = graph[node] || [];

  const result = {};

  for (const child of children) {
    result[child] = buildTree(child, graph);
  }

  return result;
}
function hasCycle(node, graph, visited, stack) {
  if (stack.has(node)) {
    return true;
  }

  if (visited.has(node)) {
    return false;
  }

  visited.add(node);
  stack.add(node);

  const children = graph[node] || [];

  for (const child of children) {
    if (hasCycle(child, graph, visited, stack)) {
      return true;
    }
  }

  stack.delete(node);

  return false;
}
function processData(data) {
const invalid_entries = [];
const valid_edges = [];
const duplicate_edges = [];

const seenEdges = new Set();

const graph = {};
const childSet = new Set();
const allNodes = new Set();
const childParentMap = {};

  for (let entry of data) {
    entry = entry.trim();

    // Must match A->B format
    const regex = /^[A-Z]->[A-Z]$/;

    if (!regex.test(entry)) {
      invalid_entries.push(entry);
      continue;
    }

    const [parent, child] = entry.split("->");

    // Self-loop is invalid
    if (parent === child) {
      invalid_entries.push(entry);
      continue;
    }

  if (seenEdges.has(entry)) {
  if (!duplicate_edges.includes(entry)) {
    duplicate_edges.push(entry);
  }
  continue;
}

seenEdges.add(entry);

if (childParentMap[child]) {
  continue;
}

valid_edges.push(entry);
childParentMap[child] = parent;

if (!graph[parent]) {
  graph[parent] = [];
}

graph[parent].push(child);

childSet.add(child);

allNodes.add(parent);
allNodes.add(child);
  }
const roots = [];

for (let node of allNodes) {
  if (!childSet.has(node)) {
    roots.push(node);
  }
}
if (roots.length === 0 && allNodes.size > 0) {
const firstNode = [...allNodes].sort()[0];

  const visited = new Set();
  const stack = new Set();

  if (hasCycle(firstNode, graph, visited, stack)) {
    return {
      roots: [],

      user_id: "himanshi_24062026",
      email_id: "Himanshi0771.be23@chitkara.edu.in",
      college_roll_number: "2310990771",

      valid_edges,
      invalid_entries,
      duplicate_edges,

      hierarchies: [
        {
          root: firstNode,
          tree: {},
          has_cycle: true,
        }
      ],

      summary: {
        total_trees: 0,
        total_cycles: 1,
        largest_tree_root: ""
      }
    };
  }
}
const hierarchies = [];
let total_cycles = 0;
const hierarchyNodes = new Set();

for (const root of roots) {

  const queue = [root];

  while (queue.length) {
    const current = queue.shift();

    if (hierarchyNodes.has(current)) continue;

    hierarchyNodes.add(current);

    const children = graph[current] || [];

    for (const child of children) {
      queue.push(child);
    }
  }

  const visited = new Set();
  const stack = new Set();

  const cycle = hasCycle(root, graph, visited, stack);

  if (cycle) {
    total_cycles++;

  hierarchies.push({
  root,
  tree: {},
  has_cycle: true
});

    continue;
  }

hierarchies.push({
  root,
  tree: {
    [root]: buildTree(root, graph)
  },
  depth: calculateDepth(root, graph)
});
}
let largest_tree_root = "";
for (const node of allNodes) {

  if (hierarchyNodes.has(node)) {
    continue;
  }

  const visited = new Set();
  const stack = new Set();

  if (hasCycle(node, graph, visited, stack)) {

    total_cycles++;

    hierarchies.push({
      root: node,
      tree: {},
      has_cycle: true
    });

    visited.forEach(n => hierarchyNodes.add(n));
  }
}

let maxDepth = -1;

for (const hierarchy of hierarchies) {

  if (hierarchy.depth === undefined) continue;

  if (
    hierarchy.depth > maxDepth ||
    (
      hierarchy.depth === maxDepth &&
      hierarchy.root < largest_tree_root
    )
  ) {
    maxDepth = hierarchy.depth;
    largest_tree_root = hierarchy.root;
  }
}
const summary = {
  total_trees: hierarchies.length - total_cycles,
  total_cycles,
  largest_tree_root
};
  return {
    roots,
    user_id: "himanshi_24062026",
    email_id: "Himanshi0771.be23@chitkara.edu.in",
    college_roll_number: "2310990771",

    valid_edges,
    invalid_entries,

    duplicate_edges,
    hierarchies,

    summary
  };
}

module.exports = { processData };