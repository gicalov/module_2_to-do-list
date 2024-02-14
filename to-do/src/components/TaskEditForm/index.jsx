import React from "react";
import "./style.css";

class TaskEditForm extends React.Component {
  render() {
    const { task, saveEditingTask, cancelEditingTask, taskEdit, handleChangeInput } = this.props;

    return (
      <form
        className="task-edit-form"
        onSubmit={(event) => {
          saveEditingTask(event, task.id, taskEdit);
        }}
      >
        <input
          className="task-edit-form__input"
          type="text"
          value={taskEdit}
          onChange={(e) => handleChangeInput(e)}
        />
        <button
          className="task-edit-form__confirm-edit-button"
          type="submit"
        >
        </button>
        <button className="task-edit-form__cancel-edit-button" onClick={cancelEditingTask}></button>
      </form>
    );
  }
}

export default TaskEditForm;
