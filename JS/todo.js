const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

function paintToDo(text) {
  // 비어있는 li만듬, HTML에 li 만들기(ul안의 목록들)
  const li = document.createElement("li");
  // HTML에 Button 만들기, 그 버튼 모양은 아래의 X
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  // HTML에 span 만들기(가져온 text)
  const span = document.createElement("span");
  span.innerText = text;
  // span을 li안에 넣고, 버튼을 li안에 넣음
  li.appendChild(delBtn);
  li.appendChild(span);
  // toDoList에 위에 li 넣음
  toDoList.appendChild(li);
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  // 입력하고 난 뒤, 칸 비우기
  toDoInput.value = "";
}

function loadToDos() {
  const toDos = localStorage.getItem(TODOS_LS);
  if (toDos !== null) {
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
