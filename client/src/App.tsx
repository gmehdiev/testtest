import React from "react";
import "./App.css";
import { TaskList } from "./components/TaskList";

const App: React.FC = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl mb-4">To-Do List</h1>
      <TaskList />
    </div>
  );
};

export default App;
