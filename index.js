let listElement = document.querySelector("#container ul");
let inputElement = document.querySelector("#container input");
let buttonElement = document.querySelector("#container button");

let tasks = JSON.parse(localStorage.getItem("task_list")) || [];

function renderTasks() {
  listElement.innerHTML = "";

  for (const task of tasks) {
    let taskElement = document.createElement("li");
    let taskText = document.createTextNode(task);

    let position = tasks.indexOf(task);

    let buttonElement = document.createElement("button");
    let buttonText = document.createTextNode("Excluir");
    buttonElement.appendChild(buttonText);
    buttonElement.setAttribute("onclick", `deleteTask(${position})`);

    taskElement.appendChild(taskText);
    taskElement.appendChild(buttonElement);
    listElement.appendChild(taskElement);

    inputElement.onkeypress = function (event) {
      if (event.keyCode === 13) {
        createTask();
      }
    };
  }
}

renderTasks();

function createTask() {
  let taskText = inputElement.value;

  tasks.push(taskText);
  inputElement.value = "";
  renderTasks();
  saveInStorage();
}

buttonElement.onclick = createTask;

function deleteTask(position) {
  tasks.splice(position, 1);
  renderTasks();
  saveInStorage();
}

function saveInStorage() {
  //JSON = JavaScript Object Notation
  localStorage.setItem("task_list", JSON.stringify(tasks));
}
