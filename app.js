// Define the task list array
let tasks = [];
// Get the necessary HTML elements
let taskInput = document.getElementById("taskInput");
let addButton = document.getElementById("addButton");
let taskList = document.getElementById("taskList");
let clearButton = document.getElementById("clearButton"); // New clear button element

// Function to add a task to the list
function addTask() {
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

// Function to render the tasks in the list
function renderTasks() {
  taskList.innerHTML = ""; // Clear the task list

  // Sort the tasks using quicksort
  quicksort(tasks, 0, tasks.length - 1);

  tasks.forEach(function (task, index) {
    let li = document.createElement("li");
    li.textContent = task;

    // Parse the task as a number
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

    // Add a remove button for each task
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

function quicksort(arr, low, high) {
  if (low < high) {
    let pivotIndex = partition(arr, low, high);
    quicksort(arr, low, pivotIndex - 1);
    quicksort(arr, pivotIndex + 1, high);
  }
}

function partition(arr, low, high) {
  let pivot = arr[high];
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

function swap(arr, i, j) {
  let temp = arr[i];
  arr[i] = arr[j];
  arr[j] = temp;
}
