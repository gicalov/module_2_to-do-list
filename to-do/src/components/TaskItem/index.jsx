import React from "react";
import "./style.css";

class TaskItem extends React.Component {
  render() {
    const { task, deleteTask } = this.props;

    return (
      <div className="task-item">
        <p className="task-item__task-text">{task}</p>
        <button
          className="task-item__delete-button"
          onClick={deleteTask}
        >
        </button>
      </div>
    );
  }
}

export default TaskItem;
