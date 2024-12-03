document.addEventListener("DOMContentLoaded", function() {
    const taskList = document.getElementById("task-list");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    // Function to add a task to the DOM and localStorage
    function addTask(taskValue) {
        const listItem = document.createElement("li");
        listItem.textContent = taskValue;
        listItem.draggable = true;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(listItem);
            removeTask(taskValue);
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        // Drag functionality
        let offsetX, offsetY;

        listItem.addEventListener("mousedown", function(event) {
            offsetX = event.offsetX;
            offsetY = event.offsetY;
        });

        listItem.addEventListener("dragstart", function(event) {
            event.dataTransfer.setData("text/plain", taskValue);
            setTimeout(() => {
                listItem.style.opacity = "0.5";
            }, 0);
        });

        listItem.addEventListener("dragend", function(event) {
            listItem.style.opacity = "1";
            const offsetXPosition = event.clientX - offsetX;
            const offsetYPosition = event.clientY - offsetY;
            listItem.style.position = "absolute";
            listItem.style.left = `${offsetXPosition}px`;
            listItem.style.top = `${offsetYPosition}px`;
        });

        taskList.addEventListener("dragover", function(event) {
            event.preventDefault();
        });
    }

    // Load saved tasks from localStorage
    tasks.forEach(task => addTask(task));

    // Save task to localStorage
    function saveTask(task) {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    // Remove task from localStorage
    function removeTask(task) {
        const taskIndex = tasks.indexOf(task);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    // Add new task button event
    document.getElementById("add-task-button").addEventListener("click", function() {
        const taskInput = document.getElementById("task-input");
        const taskValue = taskInput.value.trim();
        if (taskValue) {
            addTask(taskValue);
            saveTask(taskValue);
            taskInput.value = "";
        }
    });

    // Enable adding task with 'Enter' key
    document.getElementById("task-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("add-task-button").click();
        }
    });
});
