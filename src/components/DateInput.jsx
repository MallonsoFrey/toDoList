import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const DateInput = ({ dueDate, setDueDate }) => {
  return (
    <DatePicker
      selected={dueDate ? new Date(dueDate) : null}
      onChange={(date) => setDueDate(date)}
      dateFormat="dd.MM.yyyy"
      placeholderText="Выберите дату"
      className="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-border_color"
      isClearable
      showYearDropdown
      scrollableMonthYearDropdown
    />
  );
};

export default DateInput;
