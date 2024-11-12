// Wait for the document to fully load before running the code
document.addEventListener("DOMContentLoaded", () => {
  // Retrieve tasks stored in localStorage
  const storedTasks = JSON.parse(localStorage.getItem('tasks'));

  // If there are stored tasks, load them into the tasks array and update the UI
  if (storedTasks) {
    storedTasks.forEach((task) => tasks.push(task));
    updateTasksList();
    updateStats();
  }
});

// Initialize an empty array to store tasks
let tasks = [];

// Function to save the current tasks array to localStorage
const saveTasks = () => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

// Function to add a new task
const addTask = () => {
  const taskInput = document.getElementById("taskInput"); // Get the input element
  const text = taskInput.value.trim();                    // Get input value and remove any extra spaces

  // Only add the task if there's some text
  if (text) {
    tasks.push({ text: text, completed: false }); // Add new task to tasks array
    taskInput.value = "";                         // Clear the input field
    updateTasksList();                            // Update UI task list
    updateStats();                                // Update task statistics
    saveTasks();                                  // Save updated tasks array to localStorage
  }
};

// Function to toggle task completion status
const toggleTaskComplete = (index) => {
  tasks[index].completed = !tasks[index].completed; // Toggle completion status
  updateTasksList();                                // Update UI task list
  updateStats();                                    // Update task statistics
  saveTasks();                                      // Save changes to localStorage
};

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);                           // Remove the task at the specified index
  updateTasksList();                                // Update UI task list
  updateStats();                                    // Update task statistics
  saveTasks();                                      // Save changes to localStorage
};

// Function to edit a task
const editTask = (index) => {
  const taskInput = document.getElementById('taskInput'); // Get the input element
  taskInput.value = tasks[index].text;                    // Pre-fill input with the task text

  tasks.splice(index, 1);                           // Remove the task being edited
  updateTasksList();                                // Update UI task list
  updateStats();                                    // Update task statistics
  saveTasks();                                      // Save changes to localStorage
};

// Function to update task statistics like completed tasks and progress bar
const updateStats = () => {
  const completedTasks = tasks.filter((task) => task.completed).length;  // Count completed tasks
  const totalTasks = tasks.length;                                       // Count total tasks
  const progress = (completedTasks / totalTasks) * 100;                  // Calculate completion percentage
  const progressBar = document.getElementById("progress");

  progressBar.style.width = `${progress}%`; // Update progress bar width

  document.getElementById('numbers').innerText = `${completedTasks} / ${totalTasks}`; // Update stats display
};

// Function to update the task list UI
const updateTasksList = () => {
  const tasklist = document.getElementById("task-list");
  tasklist.innerHTML = ""; // Clear the current list

  // Iterate through tasks array and create list items for each task
  tasks.forEach((task, index) => {
    const listItem = document.createElement("li");

    listItem.innerHTML = `
      <div class="taskItem">
        <div class="task ${task.completed ? "completed" : ""}">
          <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""} />
          <p>${task.text}</p>
        </div>

        <div class="icons">
          <img src="./img/edit.ico" onClick="editTask(${index})" />
          <img src="./img/Recycle Bin Full.ico" onClick="deleteTask(${index})" />
        </div>
      </div>
    `;

    // Add event listener to the checkbox to toggle completion
    const checkbox = listItem.querySelector(".checkbox");
    checkbox.addEventListener("change", () => toggleTaskComplete(index));

    tasklist.append(listItem);   // Add the list item to the task list
  });
};

// Add click event listener to "Add Task" button
document.getElementById("newTask").addEventListener("click", function (e) {
  e.preventDefault();            // Prevent page refresh
  addTask();                     // Call function to add the task
});
