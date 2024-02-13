import React from "react";
import "./style.css";

class TaskChange extends React.Component {
  render() {
    const { task, confirmEdit, stopEdit, taskEdit, changeEntryField } = this.props;

    return (
      <form
        className="task-change"
        onSubmit={(event) => {
          confirmEdit(event, task.id, taskEdit);
        }}
      >
        <input
          className="task-change__input"
          type="text"
          value={taskEdit}
          onChange={(e) => changeEntryField(e)}
        />
        <button
          className="task-change__confirm-edit-button"
          type="submit"
        >
        </button>
        <button className="task__stop-edit-button" onClick={stopEdit}></button>
      </form>
    );
  }
}

export default TaskChange;
