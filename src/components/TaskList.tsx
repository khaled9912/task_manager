import React, { useState } from 'react';
import Task from './Task';

interface TaskType {
  id: number;
  description: string;
  status: 'Not Started' | 'In Progress' | 'Finished';
}

const TaskList: React.FC = () => {
  const [tasks, setTasks] = useState<TaskType[]>([
    { id: 1, description: 'Task 1', status: 'Not Started' },
    { id: 2, description: 'Task 2', status: 'In Progress' },
    { id: 3, description: 'Task 3', status: 'Finished' },
  ]);

  const [newTask, setNewTask] = useState<string>('');
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [filter, setFilter] = useState<string>('All');

  const handleAddTask = () => {
    if (newTask.trim() === '') return;

    setTasks([
      ...tasks,
      { id: Date.now(), description: newTask, status: 'Not Started' },
    ]);
    setNewTask('');
  };

  const handleEditTask = (id: number) => {
    const taskToEdit = tasks.find((task) => task.id === id);
    if (taskToEdit) {
      setNewTask(taskToEdit.description);
      setEditTaskId(id);
    }
  };

  const handleUpdateTask = () => {
    if (editTaskId && newTask.trim() !== '') {
      setTasks(
        tasks.map((task) =>
          task.id === editTaskId ? { ...task, description: newTask } : task
        )
      );
      setNewTask('');
      setEditTaskId(null);
    }
  };

  const handleDeleteTask = (id: number) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const filteredTasks =
    filter === 'All' ? tasks : tasks.filter((task) => task.status === filter);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Task List</h1>

      <div className="mb-4">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="p-2 border rounded w-full mb-2"
          placeholder="Add a new task"
        />
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
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Finished">Finished</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            onEdit={handleEditTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskList;
