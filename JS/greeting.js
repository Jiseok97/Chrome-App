const form = document.querySelector(".js-form"),
  input = form.querySelector("input"),
  greeting = document.querySelector(".js-greetings");

const USER_LS = "currentUser",
  SHOWING_CN = "showing";

// Local Storage에 사용자의 이름 입력시 그 텍스트를 저장
function saveName(text) {
  localStorage.setItem(USER_LS, text);
}

// askForName에서 submit 할 시 이벤트를 주기 위함
function handleSubmit(event) {
  event.preventDefault();
  const currentValue = input.value;

  // paintGreeting의 있는 text 매개변수를 가져다가 value값 입력
  paintGreeting(currentValue);

  // 9줄에서 기능을 가져다가 paintGreeting의 text 값을 LocalStorage에 저장
  saveName(currentValue);
}

function askForName() {
  form.classList.add(SHOWING_CN);

  // 뭔가를 form 에 submit 하면 처리하기 위함
  form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
  // 텍스트를 색칠할시, 폼을 숨겨야함
  form.classList.remove(SHOWING_CN);
  // greeting 보여줌
  greeting.classList.add(SHOWING_CN);
  // 내가 보낸 text를 넣는다
  greeting.innerText = `Hello ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LS);
  if (currentUser === null) {
    // currentUser 값이 없을 때(이름 입력)
    askForName();
  } else {
    // 있을 때
    paintGreeting(currentUser);
  }
}

function init() {
  paintGreeting;
  loadName();
}

init();
