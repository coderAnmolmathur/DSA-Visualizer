const graphContainer = document.getElementById('graph-container');
const algorithmSelect = document.getElementById('algorithm-select');
const graphSizeSelect = document.getElementById('graph-size-select');
const selectedAlgorithmDiv = document.getElementById('selected-algorithm');
const traversalOutputDiv = document.getElementById('traversal-output');

const extraSmallGraph = {
    0: [1],
    1: [0, 2],
    2: [1]
};

const smallGraph = {
    0: [1, 2],
    1: [0, 3, 4],
    2: [0, 4],
    3: [1],
    4: [1, 2, 5],
    5: [4]
};

const mediumGraph = {
    0: [1, 2, 3],
    1: [0, 4],
    2: [0, 5],
    3: [0, 6],
    4: [1, 7],
    5: [2, 8],
    6: [3, 9],
    7: [4, 10],
    8: [5, 11],
    9: [6, 12],
    10: [7],
    11: [8],
    12: [9]
};

const largeGraph = {
    0: [1, 2, 3, 4],
    1: [0, 5, 6],
    2: [0, 7, 8],
    3: [0, 9, 10],
    4: [0, 11, 12],
    5: [1, 13],
    6: [1, 14],
    7: [2, 15],
    8: [2, 16],
    9: [3, 17],
    10: [3, 18],
    11: [4, 19],
    12: [4, 20],
    13: [5],
    14: [6],
    15: [7],
    16: [8],
    17: [9],
    18: [10],
    19: [11],
    20: [12]
};

let graph = extraSmallGraph;
let nodes = [];
let edges = [];

function createGraph() {
    graphContainer.innerHTML = '';
    nodes = [];
    edges = [];

    // Node positions
    const positions = [];
    const size = graphSizeSelect.value;
    const graphLength = Object.keys(graph).length;

    for (let i = 0; i < graphLength; i++) {
        positions.push({
            left: `${Math.random() * 80}%`,
            top: `${Math.random() * 80}%`
        });
    }

    // Create nodes
    for (let i = 0; i < positions.length; i++) {
        const node = document.createElement('div');
        node.classList.add('node');
        node.setAttribute('data-id', i);
        node.textContent = i;
        node.style.left = positions[i].left;
        node.style.top = positions[i].top;
        graphContainer.appendChild(node);
        nodes.push(node);
    }

    // Create edges
    for (let from in graph) {
        graph[from].forEach(to => {
            if (parseInt(from) < to) { // Avoid duplicate edges
                const edge = document.createElement('div');
                edge.classList.add('edge');
                graphContainer.appendChild(edge);
                edges.push({from: nodes[from], to: nodes[to], element: edge});
            }
        });
    }

    updateEdges();
}

function updateEdges() {
    edges.forEach(edge => {
        const fromRect = edge.from.getBoundingClientRect();
        const toRect = edge.to.getBoundingClientRect();
        const graphRect = graphContainer.getBoundingClientRect();

        const x1 = fromRect.left + fromRect.width / 2 - graphRect.left;
        const y1 = fromRect.top + fromRect.height / 2 - graphRect.top;
        const x2 = toRect.left + toRect.width / 2 - graphRect.left;
        const y2 = toRect.top + toRect.height / 2 - graphRect.top;

        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

        edge.element.style.width = `${length}px`;
        edge.element.style.transform = `translate(${x1}px, ${y1}px) rotate(${angle}deg)`;
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bfs(start) {
    let queue = [start];
    let visited = new Set();
    visited.add(start);
    let traversalOutput = `BFS Traversal: ${start}`;

    while (queue.length > 0) {
        let node = queue.shift();
        nodes[node].classList.add('visited');
        await sleep(500);

        graph[node].forEach(neighbor => {
            if (!visited.has(neighbor)) {
                visited.add(neighbor);
                queue.push(neighbor);
                traversalOutput += `, ${neighbor}`;
            }
        });

        traversalOutputDiv.textContent = traversalOutput;
    }
}

async function dfs(start, visited = new Set(), traversalOutput = `DFS Traversal: ${start}`) {
    visited.add(start);
    nodes[start].classList.add('visited');
    traversalOutputDiv.textContent = traversalOutput;
    await sleep(500);

    for (let neighbor of graph[start]) {
        if (!visited.has(neighbor)) {
            traversalOutput += `, ${neighbor}`;
            await dfs(neighbor, visited, traversalOutput);
        }
    }
}

function resetGraph() {
    nodes.forEach(node => node.classList.remove('visited'));
    traversalOutputDiv.textContent = '';
}

function startTraversal() {
    const selectedAlgorithm = algorithmSelect.value;
    selectedAlgorithmDiv.textContent = `Selected Algorithm: ${selectedAlgorithm}`;
    resetGraph();

    if (selectedAlgorithm === 'bfs') {
        bfs(0);
    } else if (selectedAlgorithm === 'dfs') {
        dfs(0);
    }
}

function updateGraphSize() {
    const size = graphSizeSelect.value;
    if (size === 'extra-small') {
        graph = extraSmallGraph;
    } else if (size === 'small') {
        graph = smallGraph;
    } else if (size === 'medium') {
        graph = mediumGraph;
    } else if (size === 'large') {
        graph = largeGraph;
    }
    createGraph();
}

// Initialize the graph
createGraph();
window.onresize = updateEdges;
graphSizeSelect.addEventListener('change', updateGraphSize);
