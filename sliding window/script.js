const arrayContainer = document.getElementById('array-container');
const windowStart = document.getElementById('window-start');
const windowEnd = document.getElementById('window-end');
const windowSizeInput = document.getElementById('window-size');

function generateRandomArray(size) {
    const array = [];
    for (let i = 0; i < size; i++) {
        array.push(Math.floor(Math.random() * 100) + 1); // Random numbers between 1 and 100
    }
    return array;
}

function createArrayElements(array) {
    arrayContainer.innerHTML = '';
    array.forEach((value, index) => {
        const element = document.createElement('div');
        element.classList.add('array-element');
        element.textContent = value;
        arrayContainer.appendChild(element);
    });
}

async function visualizeSlidingWindow(array, windowSize) {
    const n = array.length;
    if (windowSize > n) {
        alert('Window size cannot be greater than array size!');
        return;
    }

    for (let i = 0; i <= n - windowSize; i++) {
        windowStart.textContent = `Start: ${i}`;
        windowEnd.textContent = `End: ${i + windowSize - 1}`;

        const elements = arrayContainer.children;
        for (let j = 0; j < elements.length; j++) {
            if (j >= i && j < i + windowSize) {
                elements[j].style.backgroundColor = '#f76c6c'; // Highlight window elements
            } else {
                elements[j].style.backgroundColor = '#61dafb'; // Reset other elements
            }
        }

        await new Promise(resolve => setTimeout(resolve, 1000)); // Adjust delay as needed
    }
}

function startVisualization() {
    const windowSize = parseInt(windowSizeInput.value);
    const arraySize = 10; // Example array size, you can adjust this
    const array = generateRandomArray(arraySize);
    createArrayElements(array);
    visualizeSlidingWindow(array, windowSize);
}

function randomizeArray() {
    const windowSize = parseInt(windowSizeInput.value);
    const arraySize = 10; // Example array size, you can adjust this
    const array = generateRandomArray(arraySize);
    createArrayElements(array);
}
