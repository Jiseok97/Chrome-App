const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// List를 array로 만들기(항목이 많아질 수 있음)
const toDos = [];

// localStorage에 저장하기
function saveToDos() {
  // toDos는 자바스크립트 객체라서 string으로 바꿔줌 (JSON.stringify)
  // localStorage에 객체로 뜨기 때문에 문자열로 바꿔줘야함!
  localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}

function paintToDo(text) {
  // 비어있는 li만듬, HTML에 li 만들기(ul안의 목록들)
  const li = document.createElement("li");
  // HTML에 Button 만들기, 그 버튼 모양은 아래의 X
  const delBtn = document.createElement("button");
  delBtn.innerText = "❌";
  // HTML에 span 만들기(가져온 text)
  const span = document.createElement("span");
  span.innerText = text;
  // toDosObj의 id 값을 배열이다보니 +1 해줘야 함
  const newId = toDos.length + 1;
  // span을 li안에 넣고, 버튼을 li안에 넣음
  li.appendChild(delBtn);
  li.appendChild(span);
  // id 값을 li에 넣어줌
  li.id = newId;
  // toDoList에 위에 li 넣음
  toDoList.appendChild(li);
  // array todo객체 만들기
  const toDoObj = {
    text: text,
    id: newId,
  };
  // toDos array 안에 toDoObj를 넣음
  toDos.push(toDoObj);
  // 위에 array를 넣고 호출해서 저장해야함 !!
  // 먼저하면 빈게 저장됨
  saveToDos();
}

function handleSubmit(event) {
  event.preventDefault();
  const currentValue = toDoInput.value;
  paintToDo(currentValue);
  // 입력하고 난 뒤, 칸 비우기
  toDoInput.value = "";
}

function loadToDos() {
  const loadedToDos = localStorage.getItem(TODOS_LS);
  if (loadedToDos !== null) {
    // JSON 사용! (위와 같은 내용)
    // JSON은 반대로 문자열을 객체로 만들 수 있음
    const parsedToDos = JSON.parse(loadedToDos);
    // forEach는 array에 담겨있는 것들을 각각 한번씩 함수를 실행시켜줌
    parsedToDos.forEach(function (toDo) {
      // toDoObj(array) 안에 있는 원소들을 하나씩 가시화
      paintToDo(toDo.text);
    });
  }
}

function init() {
  loadToDos();
  toDoForm.addEventListener("submit", handleSubmit);
}

init();
