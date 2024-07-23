import { useEffect } from "react";
import { Task } from "../redux/task.slice";
import { SubmitHandler, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { taskSchema } from "../helpers/taskSchema";

interface TaskFormProps {
  task?: Task;
  onSave: (task: Task) => void;
}

export const TaskForm = ({ task, onSave }: TaskFormProps) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Omit<Task, "id">>({
    resolver: yupResolver(taskSchema),
  });
  console.log(errors);
  const onSubmit: SubmitHandler<Omit<Task, "id">> = (data) => {
    onSave({ id: task?.id || `${Date.now()}`, ...data });
    reset({
      title: "",
      description: "",
      date: "",
    });
  };

  useEffect(() => {
    if (task?.title) {
      reset({
        title: task?.title,
        description: task?.description,
        date: task?.date,
      });
      return;
    }
  }, [task, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mb-4">
      <div className="mb-4">
        <label className="block mb-2">Title</label>
        <input
          type="text"
          {...register("title")}
          className="input mb-1 border border-gray-300 p-2 rounded w-full"
        />

        <span className="text-red-500 text-sm block h-4">
          {errors.title && errors.title.message}
        </span>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Description</label>
        <input
          type="text"
          {...register("description")}
          className="input mb-1 border border-gray-300 p-2 rounded w-full"
        />
        <span className="text-red-500 text-sm block h-4">
          {errors.description && errors.description.message}
        </span>
      </div>
      <div className="mb-4">
        <label className="block mb-2">Date</label>
        <input
          type="date"
          {...register("date")}
          className="input mb-1 border border-gray-300 p-2 rounded w-full"
        />
        <span className="text-red-500 text-sm block h-4">
          {errors.date && errors.date.message}
        </span>
      </div>
      <button type="submit" className="btn btn-green">
        {task ? "Save" : "Create New Task"}
      </button>
    </form>
  );
};
