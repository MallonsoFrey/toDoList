import { createSlice } from "@reduxjs/toolkit";
//import { generateDummyTasks } from "../utils/generateDummyTasks";
/*для тестирования 50 задач написать tasks: generateDummyTasks(50) в initialState*/

const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

const initialState = {
  tasks: savedTasks,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    addTask(state, action) {
      const task = action.payload;
      state.tasks.push(task);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask(state, action) {
      state.tasks = state.tasks.filter((t) => t.id !== action.payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
  },
});

export const { addTask, removeTask } = tasksSlice.actions;
export default tasksSlice.reducer;
