const listElement = document.getElementById("todoItems");

const listElementsForFetch = document.getElementById("todoItemsForFetch");

const listElementForAllTodosFetch =
  document.getElementById("todoItemsForFetch");

const addButton = document.querySelector("#addItemButton");

const fetchTodo = document.querySelector(".fetchTodo");

const fetchTodos = document.querySelector(".fetchTodos");

const fetch10Todos = document.querySelector(".fetch10Todos");

const removeButton = document.querySelector(".removeItemButton");

const makeItDone = document.querySelector(".makeItDoneItemButton");

const input = document.querySelector(".todoInput");

const cancelButton = document.getElementsByClassName("cancelButton")[0];

const deleteTimer = document.getElementById("timer");

const deleteMessage = document.getElementsByClassName("deleteConfirm")[0];

const inputId = document.querySelector(".todoInputId");

const paginationButtons = document.querySelectorAll(".paginationButton");

let interval;

function TodoList() {
  this.todos = [];
}

const todoList = new TodoList();

TodoList.prototype.addItem = function (item, isDone = false) {
  // debugger; debugger if you want it;
  this.todos.push({
    item,
    isDone,
  });
};

TodoList.prototype.getItemString = function (index) {
  if (!this.todos[index]) {
    alert(`The item at index ${index} does not exist`);
  }
  return this.todos[index].item;
};

TodoList.prototype.isItemDone = function (index) {
  if (!this.todos[index]) {
    alert(`The item at index ${index} does not exist`);
  }
  return this.todos[index].item;
};

TodoList.prototype.removeItem = function (index) {
  if (!this.todos[index]) {
    alert(`The item at indesx ${index} does not exist`);
  } else {
    // removed for dom change
    // const shouldRemove = confirm(`Are you sure you want to remove ${this.getItemString(index)}?`)

    // if(shouldRemove) {
    this.todos.splice(index, 1);
    // }
  }
};

TodoList.prototype.makeItemDone = function (index) {
  if (!this.todos[index]) {
    alert(`The item at index ${index} does not exist`);
  } else {
    const shouldMarkDone = confirm(
      `Are you sure you want to mark ${this.getItemString(index)}?`
    );

    if (shouldMarkDone) {
      const item = document.getElementById(`todo - ${index}`);
      console.log(item);
      item.style.textDecoration = "line-through";
      const randomColor = Math.floor(Math.random() * 16777215).toString(16);
      item.style.color = "#" + randomColor;

      //    this.isItemDone(index) = !this.isItemDone(index);
    }
  }
};

TodoList.prototype.makeItDoneForFetching = function (index) {
  // debugger
  const item = document.getElementById(`todo - ${index}`);
  console.log(item);
  item.style.textDecoration = "line-through";
  const randomColor = Math.floor(Math.random() * 16777215).toString(16);
  item.style.color = "#" + randomColor;
};

TodoList.prototype.printItems = function () {
  listElement.innerHTML = "";

  // removed in lesson 32
  // console.log(listElement)
  // console.log('Your list of todoElements:')

  for (let i = 0; i < this.todos.length; i++) {
    // console.log(` - ${i}, ${this.todos[i]}`);
    const li = document.createElement("li");

    // debugger

    console.log(this.todos[i]);

    const button = document.createElement("button");

    button.style.borderRadius = "1.5rem";
    button.setAttribute("value", "Remove");
    button.setAttribute("id", `remove-${i}`);
    button.setAttribute("data-todo", i);

    const span = document.createElement("span");
    // span.classList.add('todo-item') removed in 27 lesson
    span.setAttribute("data-todo", i);
    span.textContent = this.todos[i].item;

    li.setAttribute("id", `todo - ${i}`);

    if (this.todos[i].isDone) {
      li.classList.add("done");
    }

    if (!document.getElementById(`todo-${i}`)) {
      // li.textContent = this.todos[i];
      listElement.appendChild(li);
      li.appendChild(span);
      li.appendChild(button);
      button.textContent = "Remove";
      // button.addEventListener('click', removeItem) removed becouse used for whole items
      button.style.margin = "0 0 0 1rem";
    }

    if (li.classList.contains("done")) {
      this.makeItDoneForFetching(Number([i]));
    }
  }

  // console.log(this);
};

// TodoList.prototype.printItems = function() {
//     listElement.innerHTML = this.todos.map((todo, index) => {
//       return `<li id="todo - ${index}">${todo}</li>`
//     }).join('');

//     console.log('Your list of todoItems:')

//     for (let i = 0; i < this.todos.length; i++) {
//       console.log(` ${i}. ${this.todos[i]}`)
//     }

// for (const finding in this.todos) {
//   console.log(finding + '. ' + this.todos[finding])
// }

// }

function TodoListExtended() {
  TodoList.call(this);
}

TodoListExtended.prototype = Object.create(TodoList.prototype);

TodoListExtended.prototype.addItem = function (item) {
  this.todos.push({
    item: item,
    id: Math.random(),
  });
};

TodoListExtended.prototype.printItems = function () {
  listElement.innerHTML = this.todos
    .map((todo, index) => {
      const isDone = todo.isDone ? "done" : "";
      return `<li id='todo-${index}' class='${isDone}'>${index}. ${todo}</li>`;
    })
    .join("");
};

function clearInput() {
  input.value = "";
}

function clearInputOne() {
  inputId.value = "";
}

function addItem() {
  const item = input.value;
  if (item == "" || item == null || item == undefined) {
    console.log("please enter something");
    window.alert("please enter something");
    return;
  }
  todoList.addItem(item);
  todoList.printItems();
  clearInput();
  showMessage();
}

function removeItem() {
  const index = prompt("Enter the index of the item to remove");
  todoList.removeItem(index);
  todoList.printItems();
}

// <============================== Lesson 32 FETCH  ==============================>
// I stopped on 38 minute of lesson

TodoList.prototype.removeAllItems = function () {
  this.todos = [];
};

fetchTodos.addEventListener("click", fetchAllTodoAsync);
fetchTodo.addEventListener("click", fetchOneTodoAsync);

/// fetch before 38 minute

// function fetchAllTodoAsync() {
//     todoList.removeAllItems();
//     listElement.innerHTML = '';

//     fetch('https://jsonplaceholder.typicode.com/todos/')
//       .then(response => response.json())
//       .then(json => {
//         console.log(json)
//         json.forEach(todo => {
//             todoList.addItem(todo.title);
//             todoList.printItems();
//         })
//       })

// }

async function fetchOneTodoAsync() {
  const id = inputId.value;

  const oneTodoRaw = await fetch(
    `https://jsonplaceholder.typicode.com/todos/${id}`
  );
  const todo = await oneTodoRaw.json();

  console.log(todo);

  todoList.addItem(todo.title, todo.completed);

  todoList.printItems();

  clearInputOne();
}

fetch10Todos.addEventListener("click", fetch10TodosAsync);

async function fetch10TodosAsync() {
  const oneTodoRaw = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=10`
  );
  const todos = await oneTodoRaw.json();

  todos.forEach((todo) => {
    todoList.addItem(todo.title, todo.completed);
    todoList.printItems();
  });

  clearInputOne();
}

async function fetchAllTodoAsync() {
  // debugger
  todoList.removeAllItems();
  listElement.innerHTML = "";

  const allTodosRaw = await fetch(
    "https://jsonplaceholder.typicode.com/todos/"
  );
  const todos = await allTodosRaw.json();

  console.log(todos + "ATENTION!!!!!!! this is json() result");

  todos.forEach((todo) => {
    todoList.addItem(todo.title, todo.completed);
    todoList.printItems();
  });
}

async function handlePagination(e) {
  console.log("Event - ", e.target.innerHTML);
  todoList.removeAllItems();
  listElement.innerHTML = "";

  const oneTodoRaw = await fetch(
    `https://jsonplaceholder.typicode.com/todos?_limit=10&_page=${e.target.innerHTML}`
  );
  const todos = await oneTodoRaw.json();

  todos.forEach((todo) => {
    todoList.addItem(todo.title, todo.completed);
    todoList.printItems();
  });
}

input.addEventListener("keyup", (event) => {
  console.log(event);
  if (event.key === "Enter") {
    addItem();
  }
});

addButton.addEventListener("click", addItem);

paginationButtons.forEach((item) => {
  item.addEventListener("click", handlePagination);
});

listElement.addEventListener("keyup", (event) => {
  const element = event.target;
  const id = element.getAttribute("data-todo");
  if (event.key === "Backspace") {
    todoList.removeItem(Number(id));
    todoList.printItems();
  }
});

//// remove button section =======================================================

listElement.addEventListener("click", (event) => {
  const element = event.target;
  const id = element.getAttribute("data-todo");

  // console.log(element.tagName)

  if (element.tagName === "BUTTON") {
    showDeleteMessage(undefined, undefined, element, id);
  } else {
    todoList.makeItemDone(id);
  }
});

removeButton.addEventListener("click", removeItem);

makeItDone.addEventListener("click", () => {
  const index = prompt("Enter the index of the item to mark as done:");
  todoList.makeItemDone(index);
});

////// counter in todo list header

// const todoCount = document.getElementById("todoCount")

// let timeLeft = 11;

// const interval = setInterval(() => {
//     timeLeft--;

//     todoCount.innerHTML = timeLeft

//     if(timeLeft === 0) {
//         clearInterval(interval);

//         setTimeout(() => {
//             todoCount.textContent = ""
//         }, 1000 )

//     }
// }, 1000)

/////////////////////////////////////////////

function showMessage() {
  const messageElement = document.getElementsByClassName("message")[0];

  messageElement.classList.add("show");

  setTimeout(() => {
    messageElement.classList.remove("show");
  }, 3000);
}

function deleteItem(id) {
  showDeleteMessage(() => {
    todoList.removeItem(Number(id));
    todoList.printItems();
  }, 5);
}

cancelButton.addEventListener("click", () => {
  deleteMessage.classList.remove("showDelete");
  clearInterval(interval);
  return;
});

function showDeleteMessage(cb, timeLeft = 5, element, id) {
  const deleteTimer = document.getElementById("timer");

  const deleteMessage = document.getElementsByClassName("deleteConfirm")[0];

  deleteMessage.classList.add("showDelete");

  deleteTimer.textContent = timeLeft;

  interval = setInterval(() => {
    timeLeft--;

    deleteTimer.textContent = timeLeft;

    if (timeLeft === 0) {
      deleteMessage.classList.remove("showDelete");

      clearInterval(interval);
      todoList.removeItem(Number(id));
      todoList.printItems();
      // if(cv) {
      //     cb(

      //     );
      // }
    }
  }, 1000);
}
