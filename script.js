document.addEventListener("DOMContentLoaded", function() {
    const addButton = document.getElementById("add-button");
    const clearCompletedButton = document.getElementById("clear-completed-button");
    const emptyButton = document.getElementById("empty-button");
    const saveButton = document.getElementById("save-button");

    var toDoEntryBox = document.getElementById("todo-entry-box");
    var toDoList = document.getElementById("todo-list");

    addButton.addEventListener("click", addToDoItem);
    clearCompletedButton.addEventListener("click", clearCompletedToDoItems);
    emptyButton.addEventListener("click", emptyList);
    saveButton.addEventListener("click", saveList);

    function newToDoItem(itemText, completed) {
        var toDoItem = document.createElement("li");
        var toDoText = document.createTextNode(itemText);
        toDoItem.appendChild(toDoText);

        if (completed) {
            toDoItem.classList.add("completed");
        }

        toDoList.appendChild(toDoItem);
        toDoItem.addEventListener("dblclick", toggleToDoItemState);
    }

    function addToDoItem() {
        var itemText = toDoEntryBox.value.trim();
        if (itemText === "") return;  // Cegah item kosong ditambahkan
        newToDoItem(itemText, false);
        toDoEntryBox.value = "";  // Kosongkan input setelah menambah item
    }

    function toggleToDoItemState() {
        this.classList.toggle("completed");
    }

    function clearCompletedToDoItems() {
        var completedItems = Array.from(toDoList.getElementsByClassName("completed"));
        completedItems.forEach(item => item.remove());
        console.log("Completed items cleared");
    }

    function emptyList() {
        var toDoItems = Array.from(toDoList.children);
        toDoItems.forEach(item => item.remove());
        console.log("List emptied");
    }

    function saveList() {
        var toDos = [];

        for (var i = 0; i < toDoList.children.length; i++) {
            var toDo = toDoList.children.item(i);

            var toDoInfo = {
                "task": toDo.innerText,
                "completed": toDo.classList.contains("completed")
            };

            toDos.push(toDoInfo);
        }

        localStorage.setItem("toDos", JSON.stringify(toDos));
        console.log("List saved to localStorage");
    }

    function loadList() {
        var toDoData = localStorage.getItem("toDos");
        if (toDoData) {
            var toDos = JSON.parse(toDoData);
            toDos.forEach(toDo => newToDoItem(toDo.task, toDo.completed));
        }
    }

    // Load list on page load
    loadList();
});
