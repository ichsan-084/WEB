let todoList = [];

function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value;

    if (todoText === "") {
        alert("Please enter a task.");
        return;
    }

    const todoItem = {
        id: Date.now(),
        text: todoText,
        isEditing: false
    };

    todoList.push(todoItem);
    todoInput.value = '';
    renderTodoList();
}

function renderTodoList() {
    const todoListElement = document.getElementById('todo-list');
    todoListElement.innerHTML = '';

    todoList.forEach(todo => {
        const li = document.createElement('li');
        
        if (todo.isEditing) {
            const editInput = document.createElement('input');
            editInput.type = 'text';
            editInput.value = todo.text;
            li.appendChild(editInput);
            
            const saveButton = document.createElement('button');
            saveButton.textContent = 'Save';
            saveButton.onclick = () => saveEdit(todo.id, editInput.value);
            li.appendChild(saveButton);
        } else {
            const span = document.createElement('span');
            span.textContent = todo.text;
            li.appendChild(span);
            
            const editButton = document.createElement('button');
            editButton.textContent = 'Edit';
            editButton.onclick = () => editTodo(todo.id);
            li.appendChild(editButton);
        }

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.onclick = () => deleteTodo(todo.id);
        li.appendChild(deleteButton);

        todoListElement.appendChild(li);
    });
}

function deleteTodo(id) {
    todoList = todoList.filter(todo => todo.id !== id);
    renderTodoList();
}

function editTodo(id) {
    todoList = todoList.map(todo => {
        if (todo.id === id) {
            todo.isEditing = true;
        }
        return todo;
    });
    renderTodoList();
}

function saveEdit(id, newText) {
    todoList = todoList.map(todo => {
        if (todo.id === id) {
            todo.text = newText;
            todo.isEditing = false;
        }
        return todo;
    });
    renderTodoList();
}
