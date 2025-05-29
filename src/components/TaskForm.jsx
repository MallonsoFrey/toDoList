import { useState } from "react";
import { useDispatch } from "react-redux";
import { nanoid } from "@reduxjs/toolkit";
import { addTask } from "../store/tasksSlice";
import TaskFormValidate from "../utils/taskFormValidate";
import { useSelector } from "react-redux";

const TaskForm = () => {
  const tasks = useSelector((state) => state.tasks.tasks) || [];
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    tags: "",
    dueDate: "",
    priority: "low",
  });
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(value);
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(tasks);
    const validation = TaskFormValidate(formData, tasks);
    if (!validation.isValid) {
      setError(validation.message);
      console.log(validation.message);
      return;
    }
    setError(null);

    const tags = formData.tags
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean);

    const newTask = {
      id: nanoid(),
      title: formData.title,
      description: formData.description,
      dueDate: formData.dueDate,
      priority: formData.priority,
      tags,
    };

    dispatch(addTask(newTask));

    setFormData({
      title: "",
      description: "",
      tags: "",
      dueDate: "",
      priority: "low",
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-[300px] flex flex-col gap-2 bg-form_bg border-none rounded-lg border-indigo-400 p-4"
    >
      <input
        type="text"
        value={formData.title}
        onChange={handleChange}
        name="title"
        placeholder="Название"
        className="placeholder:p-2 focus:outline-none focus:ring-2 focus:ring-border_color border hover:border-[#374151]"
      />
      <input
        type="text"
        value={formData.description}
        onChange={handleChange}
        name="description"
        placeholder="Описание"
        className="placeholder:p-2 focus:outline-none focus:ring-2 focus:ring-border_color border hover:border-[#374151]"
      />
      <input
        type="text"
        value={formData.tags}
        onChange={handleChange}
        name="tags"
        placeholder="Теги (через запятую)"
        className="placeholder:p-2 focus:outline-none focus:ring-2 focus:ring-border_color border hover:border-[#374151]"
      />
      <input
        type="date"
        value={formData.dueDate}
        onChange={handleChange}
        name="dueDate"
        placeholder="Дата выполнения"
        className="focus:outline-none focus:ring-2 focus:ring-border_color border hover:border-[#374151]"
      />
      <select
        name="priority"
        value={formData.priority}
        onChange={handleChange}
        className="focus:outline-none focus:ring-2 focus:ring-border_color border hover:border-[#374151]"
      >
        <option value="Низкий">Низкий</option>
        <option value="Средний">Средний</option>
        <option value="Высокий">Высокий</option>
      </select>
      {error && <p className="text-red-600 font-medium">{error}</p>}
      <button className="self-center w-[80%] bg-button_bg rounded-lg p-2 hover:bg-border_color">
        Создать задачу
      </button>
    </form>
  );
};

export default TaskForm;
