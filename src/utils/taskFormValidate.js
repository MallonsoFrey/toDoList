export default function TaskFormValidate(formData, tasks) {
  console.log(formData);
  console.log(tasks);
  const title = formData.title;
  console.log(title);
  const tags = formData.tags;
  const dueDate = formData.dueDate;

  if (!title || !tags) {
    return {
      isValid: false,
      message: "Заполните все поля",
    };
  }
  const duplicate = tasks.some(
    (task) => task.title === title && task.dueDate === dueDate
  );
  if (duplicate) {
    return {
      isValid: false,
      message: "Такая задача уже существует",
    };
  }
  return { isValid: true };
}
