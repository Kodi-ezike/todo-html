const dark = document.getElementById("dark");
const light = document.getElementById("light");
const mobile = window.matchMedia("(max-width: 600px)");
function lightMode() {
  document.documentElement.setAttribute("data-theme", "light");
  light.style.display = "none";
  dark.style.display = "block";
  if (mobile.matches) {
    document.getElementById("background").src = "./images/bg-mobile-light.jpg";
  } else {
    document.getElementById("background").src = "./images/bg-desktop-light.jpg";
  }
}
function darkMode() {
  document.documentElement.setAttribute("data-theme", "root");
  dark.style.display = "none";
  light.style.display = "block";
  if (mobile.matches) {
    document.getElementById("background").src = "./images/bg-mobile-dark.jpg";
  } else {
    document.getElementById("background").src = "./images/bg-desktop-dark.jpg";
  }
}

const inputBox = document.getElementById("todo-input");
const todoList = document.querySelector(".task-section");

let listArray = [];

let newTodo = window.localStorage.getItem("New Todo");
listArray = JSON.parse(newTodo);
console.log(newTodo);
let remainder;
inputBox.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    let userEnteredValue = inputBox.value;
    let text = inputBox.value.trim();
    if (text !== "") {
      listArray.unshift(userEnteredValue);
      localStorage.setItem("New Todo", JSON.stringify(listArray));
      show(text);
      getRemainder();

      inputBox.value = "";
    }
    
  }
});

function show() {
  let newList = "";
  listArray.forEach((element, index) => {
    newList += `<li class="new-task">
            <input type="checkbox" id="task-check" class='task' value=${element}  />
            <p id="task-result">${element}</p>
            <span id="close-icon" onclick="deleteTask(${index})" ><img src="./images/icon-cross.svg" alt="cross" id="close"></span>
          </li>
          
          `;
  });
  todoList.innerHTML = newList;
  remainder = listArray.length;
  selectTask();
}
show();

function deleteTask(index) {
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  remainder = listArray.length;
  selectTask();
  getRemainder();
  show(); //call the showTasks function
}

function getRemainder() {
  if (remainder === 0 || remainder > 1) {
    document.getElementById("remainder").innerHTML = `${remainder} items left`;
  } else {
    document.getElementById("remainder").innerHTML = `${remainder} item left`;
  }
}

function selectTask() {
  let checkboxes = document.querySelectorAll(".task");
  checkboxes.forEach((checkbox) => {
    checkbox.addEventListener("click", (e) => {
      // console.log("event>>>", checkbox.value);
      if (e.target.checked == true) {
        // checkbox.parentNode.classList.add('completed');
        // checkbox.parentNode.classList.remove('active');
        remainder--;
      } else if (checkbox.checked == false) {
        // checkbox.parentNode.classList.remove('completed');
        // checkbox.parentNode.classList.add('active');
        remainder++;
      }
      getRemainder();
    });
  });
}

function getCompleted(){
  let checkboxes = document.querySelectorAll('.task:checked');
            let values = [];
            checkboxes.forEach((checkbox) => {
                values.push(checkbox.value);
            });
            console.log(values);
}










getRemainder();
