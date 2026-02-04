const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

window.addEventListener("load", loadTasks);
addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    if (task === "") return;

    addTaskToDOM(task);
    saveTaskToStorage(task);

    taskInput.value = "";
});

taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addBtn.click();
    }
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
        themeToggle.textContent = "☀️ Light Mode";
    } else {
        localStorage.setItem("theme", "light");
        themeToggle.textContent = "🌙 Dark Mode";
    }
});

function addTaskToDOM(task) {
    const li = document.createElement("li");
    li.innerHTML = `
        ${task}
        <button class="delete">Delete</button>
    `;

    li.querySelector(".delete").addEventListener("click", () => {
        li.remove();
        removeTaskFromStorage(task);
    });

    taskList.appendChild(li);
}

function saveTaskToStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push(task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.forEach(task => addTaskToDOM(task));
}

function removeTaskFromStorage(task) {
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks = tasks.filter(t => t !== task);
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
