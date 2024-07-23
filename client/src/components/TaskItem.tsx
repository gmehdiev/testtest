import { memo } from "react";
import { Task } from "../redux/task.slice";

interface TaskItemProps {
  task: Task;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}

export const TaskItem = memo(({ task, onEdit, onDelete }: TaskItemProps) => {
  return (
    <div className="border p-4 mb-2 flex justify-between items-center">
      <div>
        <h3 className="text-xl">{task.title}</h3>
        <p>{task.description}</p>
        <small>{task.date}</small>
      </div>
      <div>
        <button onClick={() => onEdit(task)} className="btn btn-blue mr-2">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="btn btn-red">
          Delete
        </button>
      </div>
    </div>
  );
});
