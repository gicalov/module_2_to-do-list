import React from "react";
import "./style.css";

class Task extends React.Component {
  render() {
    const { task, deleteTask, changeCheckbox, changeTask } = this.props;

    return (
      <div className="task">
        <input
          className="task__checkbox"
          type="checkbox"
          checked={task.isCompleted}
          onChange={changeCheckbox}
        />
        <p className="task__task-text">{task.text}</p>
        <button className="task__edit-button" onClick={changeTask}></button>
        <button className="task__delete-button" onClick={deleteTask}></button>
      </div>
    );
  }
}

export default Task;
