import Filter from "./Filter";

import "./TaskControl.css";

function TaskControl({ onStartAddTask, onSetFilter }) {
  return (
    <div id="task-control">
      <button onClick={onStartAddTask} data-cy="start-add-task-button">
        Add Task
      </button>
      <button onClick={onStartAddTask} data-cy="start-add-task-button">
        Delete
      </button>
      <Filter onFilterChange={onSetFilter} />
    </div>
  );
}

export default TaskControl;
