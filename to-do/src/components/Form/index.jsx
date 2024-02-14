import React from "react";
import "./style.css";

class Form extends React.Component {
  render() {
    const { newTask, handleInputChange, addTask } = this.props;

    return (
      <div className="form">
        <input
          className="form__input"
          type="text"
          placeholder="Введите задачу"
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="form__button" onClick={addTask}>
          Добавить
        </button>
      </div>
    );
  }
}

export default Form;
