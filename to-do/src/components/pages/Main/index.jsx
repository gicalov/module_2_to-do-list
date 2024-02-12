import React from "react";
import Task from "../../Task/";
import Form from "../../Form/";
import Error from "../../Error/";
import { tasksList } from "../../../constants.js";
import "./style.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: "",
      error: "",
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
    const currentId = Date.now();
    const error_now = newTask.trim() ? "" : "неверно введен текст";
    this.setState({ error: error_now });
    if (!error_now) {
      this.setState({
        tasks: [...tasks, { id: currentId, text: newTask, isCompleted: false }],
        newTask: "",
      });
    }
  };

  deleteTask = (elementId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((element) => element.id !== elementId);
    this.setState({ tasks: updatedTasks });
  };

  changeCheckbox = (elementId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.map((element) => {
      return element.id === elementId
        ? { ...element, isCompleted: !element.isCompleted }
        : element;
    });
    this.setState({ tasks: updatedTasks });
  };

  render() {
    const { tasks, newTask, error } = this.state;

    return (
      <div className="main">
        <div className="main-container">
          <h1 className="main-container__title">Список задач</h1>
          <Form
            newTask={newTask}
            handleInputChange={this.handleInputChange}
            addTask={this.addTask}
          />
          {error && <Error error={error} />}
          <div className="main-container__task-list">
            {tasks.map((task) => (
              <Task
                task={task}
                deleteTask={() => this.deleteTask(task.id)}
                changeCheckbox={() => this.changeCheckbox(task.id)}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Main;
