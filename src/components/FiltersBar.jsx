import Select from "react-select";

const FiltersBar = ({ filters, setFilters, allTags }) => {
  const handleResetFilters = () => {
    setFilters({
      search: "",
      priority: "",
      dueDate: "",
      selectedTags: [],
    });
  };
  const handleTagChange = (selectedOptions) => {
    const selected = selectedOptions
      ? selectedOptions.map((opt) => opt.value)
      : [];
    setFilters((prev) => ({
      ...prev,
      selectedTags: selected,
    }));
  };
  const tagOptions = allTags.map((tag) => ({
    value: tag,
    label: tag,
  }));

  return (
    <div className="flex flex-col md:flex-row gap-4 mb-4">
      <input
        type="text"
        placeholder="Поиск..."
        className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-border_color hover:border-border_color"
        value={filters.search}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, search: e.target.value }))
        }
      />
      <select
        className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-border_color hover:border-border_color"
        value={filters.priority}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, priority: e.target.value }))
        }
      >
        <option value="">Все приоритеты</option>
        <option value="Низкий">Низкий</option>
        <option value="Средний">Средний</option>
        <option value="Высокий">Высокий</option>
      </select>
      <Select
        isMulti
        options={tagOptions}
        value={tagOptions.filter((opt) =>
          filters.selectedTags.includes(opt.value)
        )}
        onChange={handleTagChange}
        placeholder="Выберите теги..."
        className="w-full md:w-72 h-full"
        styles={{
          control: (base, state) => ({
            ...base,
            borderColor: state.isFocused ? "border_color" : "",
            boxShadow: state.isFocused ? "0 0 0 3px border_color" : "none",
            outline: "none",
          }),
          indicatorSeparator: () => ({
            display: "none",
          }),
        }}
      />
      <select
        className="p-2 rounded border focus:outline-none focus:ring-2 focus:ring-border_color hover:border-border_color"
        value={filters.dateFilter}
        onChange={(e) =>
          setFilters((prev) => ({ ...prev, dateFilter: e.target.value }))
        }
      >
        <option value="all">Все задачи</option>
        <option value="overdue">Просроченные</option>
        <option value="today">На сегодня</option>
        <option value="upcoming">В будущем</option>
      </select>
      <button
        onClick={handleResetFilters}
        className="w-[30%] self-center bg-button_bg hover:bg-border_color rounded-lg p-2"
      >
        Сбросить фильтры
      </button>
    </div>
  );
};

export default FiltersBar;
