import TaskCard from "./TaskCard";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import FiltersBar from "./FiltersBar";
import dayjs from "dayjs";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { AnimatePresence } from "framer-motion";

const TasksList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const allTags = Array.from(new Set(tasks.flatMap((task) => task.tags)));
  const today = dayjs().startOf("day");

  const [filters, setFilters] = useState({
    search: "",
    priority: "",
    dateFilter: "all",
    selectedTags: [],
  });
  const [sortedIds, setSortedIds] = useState([]);

  useEffect(() => {
    setSortedIds(tasks.map((t) => t.id));
  }, [tasks]);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setSortedIds((prev) => {
        const oldIndex = prev.indexOf(active.id);
        const newIndex = prev.indexOf(over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const matchesDate = (task) => {
    const due = dayjs(task.dueDate).startOf("day");

    switch (filters.dateFilter) {
      case "overdue":
        return due.isBefore(today);
      case "today":
        return due.isSame(today);
      case "upcoming":
        return due.isAfter(today);
      default:
        return true;
    }
  };

  const filteredTasks = tasks.filter((task) => {
    const matchesSearch =
      task.title.toLowerCase().includes(filters.search.toLowerCase()) ||
      task.description.toLowerCase().includes(filters.search.toLowerCase());

    const matchesPriority = filters.priority
      ? task.priority === filters.priority
      : true;

    const matchesDueDate = matchesDate(task);

    const matchesTags =
      filters.selectedTags.length === 0
        ? true
        : filters.selectedTags.some((tag) => task.tags.includes(tag));

    return matchesSearch && matchesPriority && matchesDueDate && matchesTags;
  });
  const orderedTasks = sortedIds
    .map((id) => filteredTasks.find((t) => t.id === id))
    .filter(Boolean);

  return (
    <div className="flex flex-col items-center gap-4">
      <FiltersBar filters={filters} setFilters={setFilters} allTags={allTags} />
      {orderedTasks.length === 0 ? (
        <p className="text-gray-600 italic">Нет задач по фильтру.</p>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={orderedTasks.map((t) => t.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="grid gap-4 w-full sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence>
                {orderedTasks.map((task) => (
                  <TaskCard key={task.id} {...task} />
                ))}
              </AnimatePresence>
            </div>
          </SortableContext>
        </DndContext>
      )}
    </div>
  );
};

export default TasksList;
