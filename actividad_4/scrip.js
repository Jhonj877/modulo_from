let tasks = [];

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text) {
    tasks.push({ id: Date.now(), text, completed: false });
    renderTasks();
    input.value = "";
  }
}

function toggleTask(id) {
  tasks = tasks.map((t) =>
    t.id === id ? { ...t, completed: !t.completed } : t
  );
  renderTasks();
}

function deleteTask(id) {
  tasks = tasks.filter((t) => t.id !== id);
  renderTasks();
}

function renderTasks() {
  const list = document.getElementById("taskList");
  list.innerHTML = tasks
    .map(
      (t) =>
        `<li class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <input type="checkbox" ${t.completed ? "checked" : ""} 
                   onchange="toggleTask(${t.id})" class="me-2">
            <span class="${
              t.completed ? "text-decoration-line-through text-muted" : ""
            }">${t.text}</span>
          </div>
          <button class="btn btn-sm btn-outline-danger" onclick="deleteTask(${
            t.id
          })">
            Eliminar
          </button>
        </li>`
    )
    .join("");

  document.getElementById("stats").textContent = `${tasks.length} ${
    tasks.length === 1 ? "tarea" : "tareas"
  }`;
}


const _taskInput = document.getElementById("taskInput");
if (_taskInput) {
  _taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
  });
}
