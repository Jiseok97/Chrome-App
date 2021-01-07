const toDoForm = document.querySelector(".js-toDoForm"),
  toDoInput = toDoForm.querySelector("input"),
  toDoList = document.querySelector(".js-toDoList");

const TODOS_LS = "toDos";

// filter은 forEach에서 function을 실행하는 것 같이 각각의 item과 같이 실행될 예정
function filterFn(toDo) {
  return toDo.id === 1;
}

// List를 array로 만들기(항목이 많아질 수 있음)
let toDos = [];

// toDo 삭제를 위한 함수
function deleteToDo(event) {
  // 아래 만든 버튼인 delBtn에 eventListener을 추가하여 삭제할 예정
  // 작성 시 버튼의 조상을 찾아야 함! (parentNode 임) -> 그래야 어떤 li의 delBtn이 눌렸는지 모색할 수 있음!
  const btn = event.target;
  // 지워야 할 li인 btn.parentNode를 만들고,
  const li = btn.parentNode;
  // google에 검색시 childe element를 삭제하려면 removeChild를 사용하면 된다고 나와 있음
  toDoList.removeChild(li);
  // localStorage에 있는 li를 삭제해야 함! (새로고침시 삭제한 li가 다시 나오기 때문에)
  // cleanToDos와 filter이 하는것은 filterFn이 체크가 된 아이템들의 array를 주는 것!
  const cleanToDos = toDos.filter(function (toDo) {
    // 여기서 toDo의 id는 숫자, li의 id는 문자열이라 바꿔줘야함! -> 그래서 li.id를 숫자로 바꿔줌
    return toDo.id !== parseInt(li.id);
  });
  // 삭제한 array를 기존 toDo array에 대입시켜서 그것을 저장함으로써 완전 삭제 적용!!
  toDos = cleanToDos;
  saveToDos();
}

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
  // 버튼을 누를시 삭제(위에 함수 호출)
  delBtn.addEventListener("click", deleteToDo);
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
