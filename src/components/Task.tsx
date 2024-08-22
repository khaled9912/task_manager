import React from 'react';

interface TaskProps {
  task: {
    id: number;
    description: string;
    status: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const Task: React.FC<TaskProps> = ({ task, onEdit, onDelete }) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Not Started':
        return 'bg-red-500';
      case 'In Progress':
        return 'bg-yellow-500';
      case 'Finished':
        return 'bg-green-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-lg flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{task.description}</h3>
        <span
          className={`inline-block mt-2 px-3 py-1 text-sm font-semibold text-white ${getStatusColor(task.status)}`}
        >
          {task.status}
        </span>
      </div>
      <div>
        <button
          onClick={() => onEdit(task.id)}
          className="mr-3 text-blue-500 hover:underline"
        >
          Edit
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="text-red-500 hover:underline"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Task;
