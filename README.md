  <h3 align="center">A Task manager App!</h3>

## 📋 <a name="table">Table of Contents</a>

1. 🤖 [Introduction](#introduction)
2. ⚙️ [Tech Stack](#tech-stack)
3. 🔋 [Features](#features)
4. 🤸 [Quick Start](#quick-start)
5. 🕸️ [LiveDemo](#LiveDemo)
6. 🕸️ [DemoLogin](#DemoLogin)
7. 🕸️ [Code Snippets to Copy](#snippets)

## <a name="introduction">🤖 Introduction</a>

This Task Manager is a simple yet powerful application designed to help users manage their tasks efficiently. Built using React and TypeScript, it offers a user-friendly interface to create, update, filter, sort, and delete tasks. Additionally, it supports task categorization through statuses and ensures that your tasks persist across sessions using localStorage and it is responsive for all screen sizes.

## <a name="tech-stack">⚙️ Tech Stack</a>

- **React**: For building the user interface.
- **TypeScript**: To add type safety to the application.
- **Tailwind CSS**: For styling the components with a responsive and modern design.
- **localStorage**: To persist data between sessions.

## <a name="features">🔋 Features</a>

### 1. **Task Management**

- **Add Tasks**: Easily add new tasks with a description and status.
- **Edit Tasks**: Update existing tasks to change their description or status.
- **Delete Tasks**: Remove tasks that are no longer needed.

### 2. **Task Filtering and Sorting**

- **Filter by Status**: View tasks based on their status (`Not Started`, `In Progress`, `Finished`).
- **Sort Tasks**: Sort tasks alphabetically by description, with toggleable ascending and descending order.

### 3. **Pagination**

- **Paginate Tasks**: View tasks in pages, with 4 tasks per page, and navigate between pages with ease.

### 4. **Persistent Storage**

- **LocalStorage Integration**: All tasks and statuses are saved to localStorage, ensuring that data persists even after the browser is closed or the page is refreshed.

### 5. **User Authentication**

- **Login/Logout Functionality**: Secure your tasks behind a login. The session persists until the user logs out, ensuring a secure and personalized experience.

## <a name="quick-start">🤸 Quick Start</a>

Follow these steps to set up the project locally on your machine.

**Prerequisites**

Make sure you have the following installed on your machine:

- [Git](https://git-scm.com/)
- [Node.js](https://nodejs.org/en)
- [npm](https://www.npmjs.com/) (Node Package Manager)

**Cloning the Repository**

```bash
git clone https://github.com/khaled9912/task_manager
cd task_manager
```

**Installation**

Install the project dependencies using npm:

```bash
npm install
```

**Running the Project**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the project.

## <a name="LiveDemo">🕸️ LiveDemo</a>

- [LiveDemo](https://t-managment.netlify.app/)

## <a name="DemoLogin">🕸️Demo Login</a>

- username is "user"
- password is "password"

## <a name="snippets">🕸️ Snippets</a>

<details>
<summary><code>TaskList</code></summary>

```typescript
import React, { useState, useEffect } from 'react';
import Task from './Task';

interface TaskType {
  id: number;
  description: string;
  status: string;
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');
  const [selectedStatus, setSelectedStatus] = useState<string>('Not Started');
  const [statuses, setStatuses] = useState<string[]>([
    'Not Started',
    'In Progress',
    'Finished',
  ]);
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const tasksPerPage = 4;

  // Load tasks and statuses from localStorage on mount
  useEffect(() => {
    const cachedTasks = localStorage.getItem('tasks');
    const cachedStatuses = localStorage.getItem('statuses');

    if (cachedTasks) {
      setTasks(JSON.parse(cachedTasks));
    }
    if (cachedStatuses) {
      setStatuses(JSON.parse(cachedStatuses));
    }
  }, []);

  // Add a new task
  const handleAddTask = () => {
    if (newTaskDescription.trim() === '' || selectedStatus.trim() === '')
      return;

    const newTask = {
      id: Date.now(),
      description: newTaskDescription,
      status: selectedStatus,
    };
    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage
    setNewTaskDescription('');
    setSelectedStatus('Not Started');
  };

  // Edit a task
  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTaskDescription(taskToEdit.description);
      setSelectedStatus(taskToEdit.status);
      setEditTaskId(id);
    }
  };

  // Update a task
  const handleUpdateTask = () => {
    if (
      editTaskId &&
      newTaskDescription.trim() !== '' &&
      selectedStatus.trim() !== ''
    ) {
      const updatedTasks = tasks.map((task) =>
        task.id === editTaskId
          ? {
              ...task,
              description: newTaskDescription,
              status: selectedStatus,
            }
          : task
      );
      setTasks(updatedTasks);
      localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage
      setNewTaskDescription('');
      setSelectedStatus('Not Started');
      setEditTaskId(null);
    }
  };

  // Delete a task
  const handleDeleteTask = (id: number) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks)); // Save to local storage
  };

  // Sort tasks
  const handleSort = () => {
    const sortedTasks = [...tasks].sort((a, b) => {
      const compare = a.description.localeCompare(b.description);
      return sortOrder === 'asc' ? compare : -compare;
    });
    setTasks(sortedTasks);
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  // Filter tasks based on the selected filter
  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

  // Paginate filtered tasks
  const paginatedTasks = filteredTasks.slice(
    (currentPage - 1) * tasksPerPage,
    currentPage * tasksPerPage
  );

  const totalPages = Math.ceil(filteredTasks.length / tasksPerPage);

  return (
    <div className="container mx-auto p-4">
      <div className="mb-4">
        <input
          type="text"
          value={newTaskDescription}
          onChange={(e) => setNewTaskDescription(e.target.value)}
          className="p-2 border rounded w-full mb-2"
          placeholder="Task Description"
        />
        <select
          value={selectedStatus}
          onChange={(e) => setSelectedStatus(e.target.value)}
          className="p-2 border rounded w-full mb-2"
        >
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>
        <button
          onClick={editTaskId ? handleUpdateTask : handleAddTask}
          className="w-full p-2 bg-blue-500 text-white rounded"
        >
          {editTaskId ? 'Update Task' : 'Add Task'}
        </button>
      </div>

      <div className="flex justify-between mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="All">All</option>
          {statuses.map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <button onClick={handleSort} className="p-2 bg-gray-200 rounded">
          Sort {sortOrder === 'asc' ? '↓' : '↑'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {paginatedTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>

      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="p-2 bg-gray-200 rounded mx-2"
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="p-2 bg-gray-200 rounded mx-2"
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default TaskList;
```

</details>
