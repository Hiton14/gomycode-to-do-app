const monthInput = document.getElementById("monthInput");
const weekInput = document.getElementById("weekInput");
const dayInput = document.getElementById("dayInput");
const timeInput = document.getElementById("timeInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    li.innerHTML = `
      <div onclick="toggleTask(${index})">
        <span>${task.text}</span>
        <div class="details">
          📆 ${task.month} | Week ${task.week} | ${task.day} <br/>
          ⏰ ${task.time}
        </div>
      </div>
      <button onclick="deleteTask(${index})">✖</button>
    `;

    taskList.appendChild(li);
  });
}

function isValidTimeRange(time) {
  const regex = /^([01]\d|2[0-3]):[0-5]\d\s*-\s*([01]\d|2[0-3]):[0-5]\d$/;
  return regex.test(time);
}

function isValidMonth(month) {
  const months = [
    "january", "february", "march", "april", "may", "june",
    "july", "august", "september", "october", "november", "december"
  ];
  return months.includes(month.toLowerCase());
}

function isValidDay(day) {
  const days = [
    "monday", "tuesday", "wednesday",
    "thursday", "friday", "saturday", "sunday"
  ];
  return days.includes(day.toLowerCase());
}

function isValidWeek(week) {
  const num = parseInt(week);
  return !isNaN(num) && num >= 1 && num <= 5;
}

function showAlert(msg) {
  alert(msg);
}

function addTask() {
  const month = monthInput.value.trim();
  const week = weekInput.value.trim();
  const day = dayInput.value.trim();
  const time = timeInput.value.trim();

  // Validate all inputs
  if (!isValidMonth(month)) return showAlert("Enter a valid month (e.g., January).");
  if (!isValidWeek(week)) return showAlert("Week must be a number between 1 and 5.");
  if (!isValidDay(day)) return showAlert("Enter a valid day (e.g., Monday).");
  if (!isValidTimeRange(time)) return showAlert("Time must be in 24-hour format (e.g., 14:00 - 16:00).");

  // If all valid, save
  tasks.push({ text: `${month} Week ${week} - ${day} ${time}`, completed: false, month, week, day, time });
  monthInput.value = "";
  weekInput.value = "";
  dayInput.value = "";
  timeInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

renderTasks();

// Theme toggle
const themeToggle = document.getElementById("themeSwitcher");
const body = document.body;

function applyTheme(theme) {
  body.className = theme;
  localStorage.setItem("theme", theme);
  themeToggle.checked = theme === "light";
}



// Load saved theme on start
window.addEventListener("DOMContentLoaded", () => {
  const savedTheme = localStorage.getItem("theme") || "dark";
  applyTheme(savedTheme);
  
  // Add theme toggle event listener after DOM is loaded
  if (themeToggle) {
    themeToggle.addEventListener("change", () => {
      const newTheme = themeToggle.checked ? "light" : "dark";
      applyTheme(newTheme);
    });
  }
});
