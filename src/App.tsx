import React from 'react';
import TaskList from './components/TaskList';
import './App.css';

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <TaskList />
    </div>
  );
};

export default App;
