const arrayContainer = document.getElementById('array-container');
const algorithmSelect = document.getElementById('algorithm-select');
let array = [];
let arraySize = 30; // Default size
const maxValue = 100;
const delay = 50;

function generateRandomArray() {
    array = [];
    for (let i = 0; i < arraySize; i++) {
        array.push(Math.floor(Math.random() * maxValue) + 1);
    }
}

function createBars() {
    arrayContainer.innerHTML = '';
    array.forEach(value => {
        const bar = document.createElement('div');
        bar.classList.add('bar');
        bar.style.height = `${value * 3}px`; // Scaling for better visibility
        bar.style.backgroundColor = '#61dafb'; // Default color
        const valueText = document.createElement('div');
        valueText.classList.add('value-text');
        valueText.textContent = value; // Display value inside bar
        bar.appendChild(valueText);
        arrayContainer.appendChild(bar);
    });
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function bubbleSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        for (let j = 0; j < array.length - i - 1; j++) {
            if (array[j] > array[j + 1]) {
                let temp = array[j];
                array[j] = array[j + 1];
                array[j + 1] = temp;

                bars[j].style.height = `${array[j] * 3}px`;
                bars[j + 1].style.height = `${array[j + 1] * 3}px`;
                bars[j].querySelector('.value-text').textContent = array[j];
                bars[j + 1].querySelector('.value-text').textContent = array[j + 1];

                bars[j].style.backgroundColor = 'red';
                bars[j + 1].style.backgroundColor = 'red';
                await sleep(delay);
                bars[j].style.backgroundColor = '#61dafb';
                bars[j + 1].style.backgroundColor = '#61dafb';
            }
        }
    }
}

async function insertionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 1; i < array.length; i++) {
        let key = array[i];
        let j = i - 1;

        while (j >= 0 && array[j] > key) {
            array[j + 1] = array[j];
            bars[j + 1].style.height = `${array[j + 1] * 3}px`;
            bars[j + 1].querySelector('.value-text').textContent = array[j + 1];

            bars[j].style.backgroundColor = 'red';
            bars[j + 1].style.backgroundColor = 'red';
            await sleep(delay);
            bars[j].style.backgroundColor = '#61dafb';
            bars[j + 1].style.backgroundColor = '#61dafb';

            j--;
        }
        array[j + 1] = key;
        bars[j + 1].style.height = `${array[j + 1] * 3}px`;
        bars[j + 1].querySelector('.value-text').textContent = array[j + 1];
    }
}

async function selectionSort() {
    const bars = document.getElementsByClassName('bar');
    for (let i = 0; i < array.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < array.length; j++) {
            if (array[j] < array[minIdx]) {
                minIdx = j;
            }
        }

        let temp = array[minIdx];
        array[minIdx] = array[i];
        array[i] = temp;

        bars[minIdx].style.height = `${array[minIdx] * 3}px`;
        bars[minIdx].querySelector('.value-text').textContent = array[minIdx];
        bars[i].style.height = `${array[i] * 3}px`;
        bars[i].querySelector('.value-text').textContent = array[i];

        bars[minIdx].style.backgroundColor = 'red';
        bars[i].style.backgroundColor = 'red';
        await sleep(delay);
        bars[minIdx].style.backgroundColor = '#61dafb';
        bars[i].style.backgroundColor = '#61dafb';
    }
}

async function mergeSortHelper(l, r) {
    if (l >= r) return;

    const bars = document.getElementsByClassName('bar');
    const m = Math.floor((l + r) / 2);
    await mergeSortHelper(l, m);
    await mergeSortHelper(m + 1, r);

    let leftArray = array.slice(l, m + 1);
    let rightArray = array.slice(m + 1, r + 1);

    let i = 0, j = 0, k = l;
    while (i < leftArray.length && j < rightArray.length) {
        if (leftArray[i] <= rightArray[j]) {
            array[k] = leftArray[i];
            i++;
        } else {
            array[k] = rightArray[j];
            j++;
        }
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].querySelector('.value-text').textContent = array[k];
        bars[k].style.backgroundColor = 'red';
        await sleep(delay);
        bars[k].style.backgroundColor = '#61dafb';
        k++;
    }

    while (i < leftArray.length) {
        array[k] = leftArray[i];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].querySelector('.value-text').textContent = array[k];
        bars[k].style.backgroundColor = 'red';
        await sleep(delay);
        bars[k].style.backgroundColor = '#61dafb';
        i++;
        k++;
    }

    while (j < rightArray.length) {
        array[k] = rightArray[j];
        bars[k].style.height = `${array[k] * 3}px`;
        bars[k].querySelector('.value-text').textContent = array[k];
        bars[k].style.backgroundColor = 'red';
        await sleep(delay);
        bars[k].style.backgroundColor = '#61dafb';
        j++;
        k++;
    }
}

async function mergeSort() {
    await mergeSortHelper(0, array.length - 1);
}

async function quickSortHelper(low, high) {
    if (low >= high) return;

    const bars = document.getElementsByClassName('bar');
    let pivot = array[high];
    let i = low - 1;

    for (let j = low; j <= high - 1; j++) {
        if (array[j] < pivot) {
            i++;
            let temp = array[i];
            array[i] = array[j];
            array[j] = temp;

            bars[i].style.height = `${array[i] * 3}px`;
            bars[j].style.height = `${array[j] * 3}px`;
            bars[i].querySelector('.value-text').textContent = array[i];
            bars[j].querySelector('.value-text').textContent = array[j];

            bars[i].style.backgroundColor = 'red';
            bars[j].style.backgroundColor = 'red';
            await sleep(delay);
            bars[i].style.backgroundColor = '#61dafb';
            bars[j].style.backgroundColor = '#61dafb';
        }
    }

    let temp = array[i + 1];
    array[i + 1] = array[high];
    array[high] = temp;

    bars[i + 1].style.height = `${array[i + 1] * 3}px`;
    bars[high].style.height = `${array[high] * 3}px`;
    bars[i + 1].querySelector('.value-text').textContent = array[i + 1];
    bars[high].querySelector('.value-text').textContent = array[high];

    bars[i + 1].style.backgroundColor = 'red';
    bars[high].style.backgroundColor = 'red';
    await sleep(delay);
    bars[i + 1].style.backgroundColor = '#61dafb';
    bars[high].style.backgroundColor = '#61dafb';

    await quickSortHelper(low, i);
    await quickSortHelper(i + 2, high);
}

async function quickSort() {
    await quickSortHelper(0, array.length - 1);
}

function randomizeArray() {
    generateRandomArray();
    createBars();
}

function changeArraySize() {
    arraySize = parseInt(document.getElementById('array-size-input').value);
    generateRandomArray();
    createBars();
}

function startSort() {
    const selectedAlgorithm = algorithmSelect.value;
    document.getElementById('selected-algorithm').textContent = `Selected Algorithm: ${selectedAlgorithm}`;
    if (selectedAlgorithm === "bubbleSort") {
        bubbleSort();
    } else if (selectedAlgorithm === "insertionSort") {
        insertionSort();
    } else if (selectedAlgorithm === "selectionSort") {
        selectionSort();
    } else if (selectedAlgorithm === "mergeSort") {
        mergeSort();
    } else if (selectedAlgorithm === "quickSort") {
        quickSort();
    }
}

// Generate initial random array and create bars
generateRandomArray();
createBars();
