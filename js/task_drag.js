document.addEventListener("DOMContentLoaded", function() {
    const taskList = document.getElementById("task-list");
    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    function addTask(taskValue) {
        const listItem = document.createElement("li");
        listItem.textContent = taskValue;
        listItem.draggable = true;

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-button";
        deleteButton.innerHTML = "×";  // Using × symbol for delete
        deleteButton.addEventListener("click", function() {
            taskList.removeChild(listItem);
            removeTask(taskValue);
        });

        listItem.appendChild(deleteButton);
        taskList.appendChild(listItem);

        // Improved drag and drop functionality
        let isDragging = false;
        let currentX;
        let currentY;
        let initialX;
        let initialY;
        let xOffset = 0;
        let yOffset = 0;

        function setTranslate(xPos, yOffset) {
            listItem.style.transform = `translate3d(${xPos}px, ${yOffset}px, 0)`;
        }

        function dragStart(e) {
            if (e.type === "touchstart") {
                initialX = e.touches[0].clientX - xOffset;
                initialY = e.touches[0].clientY - yOffset;
            } else {
                initialX = e.clientX - xOffset;
                initialY = e.clientY - yOffset;
            }

            if (e.target === listItem) {
                isDragging = true;
                listItem.style.cursor = 'grabbing';
            }
        }

        function dragEnd(e) {
            initialX = currentX;
            initialY = currentY;
            isDragging = false;
            listItem.style.cursor = 'grab';
        }

        function drag(e) {
            if (isDragging) {
                e.preventDefault();

                if (e.type === "touchmove") {
                    currentX = e.touches[0].clientX - initialX;
                    currentY = e.touches[0].clientY - initialY;
                } else {
                    currentX = e.clientX - initialX;
                    currentY = e.clientY - initialY;
                }

                xOffset = currentX;
                yOffset = currentY;
                setTranslate(currentX, currentY);
            }
        }

        // Mouse events
        listItem.addEventListener("mousedown", dragStart);
        document.addEventListener("mousemove", drag);
        document.addEventListener("mouseup", dragEnd);

        // Touch events
        listItem.addEventListener("touchstart", dragStart);
        document.addEventListener("touchmove", drag);
        document.addEventListener("touchend", dragEnd);
    }

    function saveTask(task) {
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

    function removeTask(task) {
        const taskIndex = tasks.indexOf(task);
        if (taskIndex > -1) {
            tasks.splice(taskIndex, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
        }
    }

    // Load saved tasks
    tasks.forEach(task => addTask(task));

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

    // Enable adding task with Enter key
    document.getElementById("task-input").addEventListener("keypress", function(event) {
        if (event.key === "Enter") {
            document.getElementById("add-task-button").click();
        }
    });
});
