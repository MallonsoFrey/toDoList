import { nanoid } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const priorities = ["Низкий", "Средний", "Высокий"];
const sampleTags = ["Работа", "Учеба", "Срочно", "Дом"];

export const generateDummyTasks = (count = 50) => {
  const tasks = [];

  for (let i = 0; i < count; i++) {
    tasks.push({
      id: nanoid(),
      title: `Task ${i + 1}`,
      description: `This is the description for task ${i + 1}`,
      tags: [sampleTags[i % sampleTags.length]],
      dueDate: dayjs()
        .add((i % 7) - 3, "day")
        .toISOString(),
      priority: priorities[i % priorities.length],
    });
  }

  return tasks;
};
