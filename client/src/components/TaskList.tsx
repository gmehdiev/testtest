import React, { useEffect, useState } from "react";
import { TaskItem } from "./TaskItem";
import { TaskForm } from "./TaskForm";
import { useSelector } from "react-redux";
import {
  addTask,
  deleteTask,
  getTasks,
  selectTasks,
  StatusRequestEnum,
  Task,
  updateTask,
} from "../redux/task.slice";
import { useAppDispatch } from "../redux/store";

export const TaskList: React.FC = () => {
  //   const [tasks, setTasks] = useState<Task[]>([]);
  const [editingTask, setEditingTask] = useState<Task>();
  const { tasks, status, error } = useSelector(selectTasks);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getTasks());
  }, [dispatch]);

  const handleDeleteTask = (id: string) => {
    dispatch(deleteTask(id));
  };
  const handleSave = (task: Task) => {
    if (editingTask) {
      dispatch(updateTask(task));
      setEditingTask(undefined);
    } else {
      dispatch(addTask(task));
    }
  };

  return (
    <div>
      <div className="flex flex-col">
        <div>
          STATUS:
          {status === StatusRequestEnum.LOADING && (
            <span className="text-blue-500">LOADING..</span>
          )}
          {error && <span className="text-red-500">ERROR: {error}</span>}
        </div>

        {editingTask ? "Edit mode" : "Create mode"}
      </div>

      <TaskForm task={editingTask} onSave={handleSave} />

      <div>
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            onEdit={setEditingTask}
            onDelete={handleDeleteTask}
          />
        ))}
      </div>
    </div>
  );
};
