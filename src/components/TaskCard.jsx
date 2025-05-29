import { useDispatch } from "react-redux";
import { removeTask } from "../store/tasksSlice";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { motion } from "framer-motion";
import dayjs from "dayjs";

const TaskCard = ({ id, title, description, tags, priority, dueDate }) => {
  const dispatch = useDispatch();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.6 : 1,
  };

  const isOverdue = dayjs(dueDate).isBefore(dayjs(), "day");

  const handleDelete = () => {
    dispatch(removeTask(id));
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      layout
      transition={{ duration: 0.25, ease: "easeInOut" }}
      className={`p-4 rounded-md shadow cursor-grab select-none bg-white transition-all ${
        isOverdue ? "border-2 border-error_color" : "border border-form_bg"
      }`}
    >
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="mb-1">{description}</p>
      <p className="text-sm mb-1">
        <span className="font-bold">Теги:</span> {tags.join(", ")}
      </p>
      <p className="text-sm mb-1">
        <span className="font-bold">Срок:</span>{" "}
        {dayjs(dueDate).format("DD.MM.YYYY")}
      </p>
      <p className="text-sm capitalize mb-2">
        <span className="font-bold">Приоритет:</span> {priority}
      </p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className="bg-[#ef4444] text-white px-3 py-1 rounded hover:error_color hover:bg-error_color"
      >
        Удалить
      </button>
    </motion.div>
  );
};

export default TaskCard;
