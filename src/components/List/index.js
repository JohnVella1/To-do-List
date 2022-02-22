import PropTypes from 'prop-types';
import './style.scss';

const List = function ({ todos, onTodoClick }) {
  return (
    <ul className="list">
    {
      todos.map(({ id, label, done }) => (
        <li key={id}>
        <label className={done ? "list-item list-item--done" : "list-item"}>
        <input
        type="checkbox"
        checked={done}
        onChange={() => {
          onTodoClick({ id, label, done });
        }} />
        {label}
      </label>
      </li>
      ))
    }
  </ul>
);
};

const { number, string, bool, arrayOf, shape, func, oneOfType } = PropTypes;

List.propTypes = {
  todos: arrayOf(shape({
    id: oneOfType([number, string]).isRequired,
    label: string.isRequired,
    done: bool.isRequired,
  })).isRequired,
  onTodoClick: func.isRequired,
};

export default List;