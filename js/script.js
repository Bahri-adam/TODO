// JavaScript to add interactivity to the to-do list

document.getElementById("add-task-button").addEventListener("click", function() {
    const taskInput = document.getElementById("task-input");
    const taskValue = taskInput.value.trim();

    if (taskValue) {
        const taskList = document.getElementById("task-list");
        const listItem = document.createElement("li");
        listItem.textContent = taskValue;

        // Add a delete button to the task
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(listItem);
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);
        taskInput.value = "";
    }
});

// Optional: Enable 'Enter' key to add tasks
document.getElementById("task-input").addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        document.getElementById("add-task-button").click();
    }
});
