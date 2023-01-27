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
// let checkboxes = document.querySelectorAll("input[type ='checkbox']");
//const checkboxes = document.getElementById('task-check');
// const task = document.getElementById('task-result');
// let pendingTasksNumb = document.querySelector(".pendingNumber");

let listArray = [];
let remainder = 0;
function getStorage() {
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray = []; //create a blank array
  } else if (getLocalStorageData != null) {
    listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
    remainder = listArray.length;
  }
}
getStorage();

inputBox.addEventListener("keyup", function (event) {
  if (event.keyCode === 13) {
    //to press enter on keyboard
    //event.preventDefault();
    //document.querySelector('.input-heading').submit();
    let userEnteredValue = inputBox.value; //getting input field value
    let checkedValue = inputBox.checked; //getting input field value
    let valueDetails = { value: userEnteredValue, checked: checkedValue };

    const text = inputBox.value.trim();
    if (text !== "") {
      listArray.unshift(valueDetails); //pushing or adding new value in array
      localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
      remainder = listArray.length;

      show(text);

      inputBox.value = "";
    }
  }
});

function show() {
  let getLocalStorageData = localStorage.getItem("New Todo");
  if (getLocalStorageData == null) {
    //if localstorage has no data
    listArray = []; //create a blank array
  } else {
    listArray = JSON.parse(getLocalStorageData); //transforming json string into a js object
  }

  let newList = "";
  //   console.log(listArray)
  listArray.forEach((element, index) => {
    newList += `<li class="new-task">
        <input type="checkbox" id="task-check" class='task' value=${element.value}  />
        <p id="task-result">${element.value}</p>
        <span id="close-icon" onclick="deleteTask(${index})" ><img src="./images/icon-cross.svg" alt="cross" id="close"></span>
      </li>
      
      `;
  });
  // newList += `
  //   <div class="record">
  //         <p class="remainder" id="remainder">
  //           <span class="pendingNumber">${remainder}</span> items left
  //         </p>

  //         <div class="list">
  //           <div class="wrapper">
  //             <p id="all">All</p>
  //             <p id="active">Active</p>
  //             <p class="completed" id="completed">Completed</p>
  //           </div>
  //         </div>

  //         <p class="clear" id="clear">Clear Completed</p>
  //       </div>
  //   `;
  todoList.innerHTML = newList;
}
show();

let checkboxes = document.querySelectorAll(".task");
checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("click", (e) => {
    // console.log("event>>>", checkbox.value);
    if (checkbox.checked == true) {
      // checkbox.parentNode.classList.add('completed');
      // checkbox.parentNode.classList.remove('active');
      remainder--;
      console.log("checked");
      console.log(remainder);
    } else if (checkbox.checked == false) {
      // checkbox.parentNode.classList.remove('completed');
      // checkbox.parentNode.classList.add('active');
      remainder++;
      console.log("unchecked");
      console.log(remainder);
    }
  });
});

// function selectTask() {
// //   let checkbox = document.getElementById("task-check");
// // var checked_elements = document.querySelectorAll(".task:checked");
// // var list = document.querySelector('li');
// // list.addEventListener('click', function(ev) {
// //   if (ev.target.tagName === 'LI') {
// //     ev.target.classList.toggle('checked');
// //   }
// // }, false);

// let checkboxes = document.querySelectorAll('.task');
// // console.log("check>>>", checkboxes)

// checkboxes.forEach(checkbox => {
//             checkbox.addEventListener('click', e => {
//             console.log("event>>>", checkbox.value)
//                 if (checkbox.checked == true) {
//                     // checkbox.parentNode.classList.add('completed');
//                     // checkbox.parentNode.classList.remove('active');
//                     console.log('checked');
//                 }
//                 else if (checkbox.checked == false) {
//                     // checkbox.parentNode.classList.remove('completed');
//                     // checkbox.parentNode.classList.add('active');
//                     console.log('unchecked');
//                 }

//             })
//         })
// }

// function selectTask(){
//     let getLocalStorageData = localStorage.getItem("New Todo");
//     listArray = JSON.parse(getLocalStorageData);
//     //listArray.valueOf(index); //delete or remove the li
//     //let pendingTasksNumb = document.querySelector(".pendingNumber");
//    // pendingTasksNumb = listArray.length;
//     //localStorage.setItem("New Todo", JSON.stringify(listArray));
//     show(); //call the showTasks function
// }

// var checked_elements = document.querySelectorAll(".task:checked");

// var checked_elements_values = [];

// // loop through all checked elements
// checked_elements.forEach(function(element) {
//     checked_elements_values.push(element.value);
// });

// if(checked_elements_values.length == 0)
// 	console.log('No items checked');
// else
// 	console.log(checked_elements_values);

function deleteTask(index) {
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  listArray.splice(index, 1); //delete or remove the li
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  remainder = listArray.length;

  show(); //call the showTasks function
}

document.getElementById('clear').addEventListener('click', (e)=>{
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  let selectedCheckboxes = document.querySelectorAll(".task:checked");
  selectedCheckboxes.forEach((index) => {
    // listArray.splice(index, 1); 
    delete listArray[index]
  })
  // delete listArray[selectedCheckboxes]
  localStorage.setItem("New Todo", JSON.stringify(listArray));
  remainder = listArray.length;
  show();
})
document.getElementById('active').addEventListener('click', (e)=>{
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  let selectedCheckboxes = document.querySelectorAll(".task:!checked");
  console.log(selectedCheckboxes)
  // localStorage.setItem("New Todo", JSON.stringify(listArray));
  // remainder = listArray.length;
  // show();
})
document.getElementById('completed').addEventListener('click', (e)=>{
  let getLocalStorageData = localStorage.getItem("New Todo");
  listArray = JSON.parse(getLocalStorageData);
  let selectedCheckboxes = document.querySelectorAll(".task:checked");
  console.log(selectedCheckboxes)
  // delete listArray[selectedCheckboxes]
  // localStorage.setItem("New Todo", JSON.stringify(listArray));
  // remainder = listArray.length;
  // show();
})

// let checkboxes = document.querySelectorAll('input[type="checkbox"]');
// function markAsCompleted() {
//     checkboxes.forEach(checkbox => {
//         checkbox.addEventListener('click', e => {
//             if (checkbox.checked == true) {
//                 checkbox.parentNode.classList.add('completed');
//                 checkbox.parentNode.classList.remove('active');
//                 console.log('here');
//             }
//             else if (!checkbox.checked) {
//                 checkbox.parentNode.classList.remove('completed');
//                 checkbox.parentNode.classList.add('active');
//             }

//         })
//     })
// }
