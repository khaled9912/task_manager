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

  // Save tasks and statuses to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('statuses', JSON.stringify(statuses));
  }, [tasks, statuses]);

  // Add a new task
  const handleAddTask = () => {
    if (newTaskDescription.trim() === '' || selectedStatus.trim() === '')
      return;

    const newTask = {
      id: Date.now(),
      description: newTaskDescription,
      status: selectedStatus,
    };
    setTasks([...tasks, newTask]);
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
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId
            ? {
                ...task,
                description: newTaskDescription,
                status: selectedStatus,
              }
            : task
        )
      );
      setNewTaskDescription('');
      setSelectedStatus('Not Started');
      setEditTaskId(null);
    }
  };

  // Delete a task
  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
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
      <h1 className="text-3xl font-bold text-center mb-6">Task List</h1>

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
