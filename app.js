"use strict";

/**
 * Represents a list of tasks.
 * @type {string[]}
 */
let tasks = [];

/**
 * Get the necessary HTML elements.
 * @type {HTMLInputElement}
 */
let taskInput = document.getElementById("taskInput");

/**
 * Add button element for adding tasks.
 * @type {HTMLButtonElement}
 */
let addButton = document.getElementById("addButton");

/**
 * Task list element for rendering tasks.
 * @type {HTMLUListElement}
 */
let taskList = document.getElementById("taskList");

/**
 * Clear button element for clearing tasks.
 * @type {HTMLButtonElement}
 */
let clearButton = document.getElementById("clearButton");

/**
 * Adds a task to the list.
 * @function
 */
function addTask()
{
	/**
	 * Task to be added.
	 * @type {string}
	 */
	let task = taskInput.value.trim();

	if (task !== "") {
		if (tasks.includes(task)) {
			alert("Task already exists!");
			return; // Exit the function to prevent adding the duplicate task
		}

		tasks.push(task);
		renderTasks();
		taskInput.value = "";
	}
}

/**
 * Renders the tasks in the list.
 * @function
 */
function renderTasks()
{
	taskList.innerHTML = ""; // Clear the task list

	// Sort the tasks using quicksort
	quicksort(tasks, 0, tasks.length - 1);

	/**
	 * Represents a task.
	 * @callback forEachCallback
	 * @param {string} task - The task to be rendered.
	 * @param {number} index - The index of the task in the array.
	 */

	tasks.forEach(function (task, index) {
		/**
		 * List item element for each task.
		 * @type {HTMLLIElement}
		 */
		let li = document.createElement("li");
		li.textContent = task;

		/**
		 * Parsed representation of the task as a number.
		 * @type {number}
		 */
		let parsedTask = parseFloat(task);

		// Check if the task can be parsed as a number
		if (!isNaN(parsedTask)) {
			// Sort numerically
			tasks.sort(function (a, b) {
				return parseFloat(a) - parseFloat(b);
			});
		} else {
			// Sort alphabetically
			tasks.sort();
		}

		/**
		 * Remove button for each task.
		 * @type {HTMLButtonElement}
		 */
		let removeButton = document.createElement("button");
		removeButton.textContent = "Remove";
		removeButton.id = "remove-task"; // Add the "remove-task" id
		removeButton.addEventListener("click", function () {
			tasks.splice(index, 1); // Remove the task from the array
			renderTasks(); // Re-render the tasks
		});

		li.appendChild(removeButton);
		taskList.appendChild(li);
	});
}

// Event listener for the add button
addButton.addEventListener("click", addTask);

// Event listener for the clear button
clearButton.addEventListener("click", function () {
	tasks = []; // Clear the tasks array
	renderTasks(); // Re-render the tasks
});

/**
 * Sorts an array using the quicksort algorithm.
 * @function
 * @param {Array} arr - The array to be sorted.
 * @param {number} low - The low index of the array or subarray.
 * @param {number} high - The high index of the array or subarray.
 */
function quicksort(arr, low, high)
{
	if (low < high) {
		/**
		 * Index of the pivot element.
		 * @type {number}
		 */
		let pivotIndex = partition(arr, low, high);

		quicksort(arr, low, pivotIndex - 1);
		quicksort(arr, pivotIndex + 1, high);
	}
}

/**
 * Partitions an array for quicksort.
 * @function
 * @param {Array} arr - The array to be partitioned.
 * @param {number} low - The low index of the array or subarray.
 * @param {number} high - The high index of the array or subarray.
 * @returns {number} The index of the pivot element after partitioning.
 */
function partition(arr, low, high)
{
	/**
	 * The pivot element.
	 * @type {*}
	 */
	let pivot = arr[high];

	/**
	 * Index of the smaller element.
	 * @type {number}
	 */
	let i = low - 1;

	for (let j = low; j < high; j++) {
		if (arr[j] < pivot) {
			i++;
			swap(arr, i, j);
		}
	}

	swap(arr, i + 1, high);
	return i + 1;
}

/**
 * Swaps two elements in an array.
 * @function
 * @param {Array} arr - The array containing elements to be swapped.
 * @param {number} i - The index of the first element.
 * @param {number} j - The index of the second element.
 */
function swap(arr, i, j)
{
	/**
	 * Temporary variable for swapping elements.
	 * @type {*}
	 */
	let temp = arr[i];
	arr[i] = arr[j];
	arr[j] = temp;
}
