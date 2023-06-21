let todoListArray = [
  { id: 1, name: "Javascript" },
  { id: 2, name: "React" },
  { id: 3, name: "HTML" },
];
let todoInput = document.querySelector("input");
let addBtn = document.querySelector("button");
let todoList = document.querySelector("ul");
let count = todoListArray.length;

const createTodoItem = (todoObject) => {
  let todoItem = document.createElement("li");
  todoItem.setAttribute("id", todoObject.id);
  //todo text
  let todoText = document.createElement("p");
  todoText.innerHTML = todoObject.name;
  //Update
  let updateButton = document.createElement("button");
  updateButton.innerText = "Update";
  updateButton.addEventListener("click", () => updateTodoFunc(todoObject.id));
  //Delete
  let deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.addEventListener("click", () => deleteTodoFunc(todoObject.id));
  //Save
  let saveButton = document.createElement("button");
  saveButton.innerText = "Save";
  saveButton.addEventListener("click", () => saveTodoFunc(todoObject.id));
  saveButton.classList.toggle("d-none");
  //Input Field
  let inputField = document.createElement("input");
  todoItem.setAttribute("id", todoObject.id);
  inputField.classList.toggle("d-none");
  todoItem.append(todoText);
  todoItem.append(updateButton);
  todoItem.append(inputField);
  todoItem.append(saveButton);
  todoItem.append(deleteButton);
  return todoItem;
};
const renderTodoList = () => {
  todoList.innerHTML = null;
  todoListArray.forEach((todoObject) => {
    let todoItem = createTodoItem(todoObject);
    todoList.append(todoItem);
  });
};
const saveTodoFunc = (id) => {
  let todoItem = document.getElementById(id);
  let updatedArray = todoListArray.map((todo) => {
    if (todo.id == id) {
      todo.name = todoItem.children[2].value;
      todoItem.children[0].classList.toggle("d-block");
      todoItem.children[1].classList.toggle("d-block");
    }
    todoItem.children[2].classList.toggle("d-none");
    todoItem.children[3].classList.toggle("d-none");
    return todo;
  });
  todoListArray = updatedArray;
  renderTodoList();
};
const updateTodoFunc = (id) => {
  let todoItem = document.getElementById(id);
  console.log(todoItem.children);
  todoItem.children[2].classList.toggle("d-block");
  todoItem.children[3].classList.toggle("d-block");
  todoItem.children[0].classList.toggle("d-none");
  todoItem.children[1].classList.toggle("d-none");
  todoItem.children[2].value = todoItem.children[0].innerHTML;
};
const addTodoFunc = () => {
  if (todoInput.value != "") {
    count += 1;
    let newTodoArray = [...todoListArray, { id: count, name: todoInput.value }];
    todoListArray = newTodoArray;
    let todoItem = createTodoItem({ id: count, name: todoInput.value });
    todoList.append(todoItem);
    todoInput.value = "";
  } else {
    alert("Input field is empty");
  }
  renderTodoList();
};
const deleteTodoFunc = (id) => {
  let delArray = todoListArray.filter((todo) => todo.id != id);
  todoListArray = delArray;
  renderTodoList();
};
addBtn.addEventListener("click", () => addTodoFunc());
renderTodoList();
