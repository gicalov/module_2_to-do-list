import React from "react";
import TaskList from "../../TaskList/";
import { tasksList } from "../../../constants.js";
import "./style.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: "",
    };
  }

  componentDidMount() {
    this.setState({ tasks: tasksList });
  }

  handleInputChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  addTask = () => {
    const { tasks, newTask } = this.state;
    if (newTask.trim()) {
      this.setState({ tasks: [...tasks, newTask], newTask: "" });
    }
  };

  deleteTask = (index) => {
    const { tasks } = this.state;
    tasks.splice(index, 1);
    this.setState({ tasks });
  };

  render() {
    const { tasks, newTask } = this.state;

    return (
      <div className="main">
        <div className="main-container">
          <h1 className="main-container__title">Список задач</h1>
          <div className="main-containe-form">
            <input
              className="main-containe-form__input"
              type="text"
              placeholder="Введите задачу"
              value={newTask}
              onChange={this.handleInputChange}
            />
            <button
              className="main-containe-form__button"
              onClick={this.addTask}
            >
              Добавить
            </button>
          </div>
          <TaskList tasks={tasks} deleteTask={this.deleteTask} />
        </div>
      </div>
    );
  }
}

export default Main;
