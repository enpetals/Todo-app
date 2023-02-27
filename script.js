const form = document.querySelector("form")
const cardContainer = document.querySelector(".card-container")
let DB = [];

const addItemsToDOM = () => {
  // Clear all the items in the container
  cardContainer.innerHTML = ""

  // Loop through all the DB item
  DB.forEach(taskItem => {
    cardContainer.innerHTML += `
    <article id="${taskItem.id}" class="task-card">
      <div class="task-row edit">
        <input value="${taskItem.task}" type="text" class="edit-input">
        <div class="options">
          <button class="option-btn green">Save</button>
          <button class="option-btn red" onclick="handleToggleEditing(${taskItem.id})">Cancel</button>
        </div>
      </div>

      <div class="task-row preview">
        <p class="text">${taskItem.task}</p>
        <div class="options">
          <button class="option-btn blue" onclick="handleToggleEditing(${taskItem.id})">Edit</button>
          <button class="option-btn red" onclick="handleDeleteTask(${taskItem.id})">Delete</button>
        </div>
      </div>
    </article>`
  })

}

const handleToggleEditing = (id) => {
  const taskItemContainer = document.getElementById(id)

  // Check if the <article> element have a class of 'editing'
  if(taskItemContainer.classList.contains(`editing`)) {
    // If it have editing already; remove it
    taskItemContainer.classList.remove("editing")
  }
  else {
     // If it does not have editing; add it
    taskItemContainer.classList.add("editing")
  }
}

const handleDeleteTask = (id) => {
  // Remove the task with the id from the DB array

  // With filter
  // const filteredItems = DB.filter((taskItem) => taskItem.id !== id)
  // DB = filteredItems

  // With splice
  const index = DB.findIndex(taskItem => taskItem.id == id)
  DB.splice(index, 1)

  // Remove the article element containing the task item

  // Method 1
  // addItemsToDOM()

  // Method 2
  document.getElementById(id).remove()
}

const handleAddNewTask = () => {
  // Get the input value 
  const input = document.querySelector(".form-control");
  const inputValue = input.value.trim()

  // Check if there's a value in the inputValue variable
  if(!inputValue) {
    alert("Please add a task")
    return
  }

  // Create a new task card 
  const newTaskItem = {
    task: inputValue,
    id: Date.now()
  }
  DB.push(newTaskItem)

  // Clear the input value
  input.value = ""
  
  // Append it to the task container
  addItemsToDOM()
}

form.addEventListener("submit", (event) => {
  event.preventDefault();  // It will cancel the page from refresh (i.e try to submit to the server)
  handleAddNewTask()
})