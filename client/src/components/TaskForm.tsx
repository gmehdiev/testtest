import React, { useEffect, useState } from "react";
import { Task } from "../redux/task.slice";

interface TaskFormProps {
  task?: Task;
  onSave: (task: Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSave }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  useEffect(() => {
    if (!task?.title) {
      setTitle("");
      setDescription("");
      setDate("");
      return;
    }
    setTitle(task.title);
    setDescription(task.description);
    setDate(task.date);
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ id: task?.id || `${Date.now()}`, title, description, date });
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div>
        <label>Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input"
          required
        />
      </div>
      <div>
        <label>Date</label>
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="input"
          required
        />
      </div>
      <button type="submit" className="btn btn-green">
        {task ? "Save" : "Create New Task"}
      </button>
    </form>
  );
};
