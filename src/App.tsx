// src/App.tsx
import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import Login from './components/Login';
import './App.css';

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    // Check authentication status from localStorage
    const authStatus = localStorage.getItem('isAuthenticated');
    if (authStatus === 'true') {
      setIsAuthenticated(true);
    }
  }, []);
  const handleLogin = () => {
    setIsAuthenticated(true);
    localStorage.setItem('isAuthenticated', 'true');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('tasks'); // clear tasks when logout.
  };
  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />;
  }
  return (
    <div className="App">
      <header className="flex justify-between p-4  ">
        <h1 className="text-5xl font-bold text-center mb-6">Task List</h1>
        <button onClick={handleLogout} className="p-2 bg-red-400 rounded">
          Logout
        </button>
      </header>
      <TaskList />
    </div>
  );
};

export default App;
