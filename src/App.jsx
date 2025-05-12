import Layout from "./components/Layout";
import TaskForm from "./components/TaskForm";
import TasksList from "./components/TasksList";
import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";

function App() {
  const tasks = useSelector((state) => state.tasks.tasks);
  const tasksRef = useRef(tasks);

  useEffect(() => {
    tasksRef.current = tasks;
  }, [tasks]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      localStorage.setItem("tasks", JSON.stringify(tasksRef.current));
    }, 30000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Layout>
        <TaskForm />
        <TasksList />
      </Layout>
    </>
  );
}

export default App;
