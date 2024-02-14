import React from "react";
import Task from "../../Task/";
import Form from "../../Form/";
import Error from "../../Error/";
import TaskChange from "../../TaskChange/";
import sortTasks from '../../helpers/sortTasks.js';
import { tasksList } from "../../../constants.js";
import "./style.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: "",
      error: "",
      isChangeing: 0,
      taskEdit: "",
    };
  }

  componentDidMount = () => {
    this.setState({ tasks: tasksList });
  };

  handleInputChange = (event) => {
    this.setState({ newTask: event.target.value });
  };

  addTask = () => {
    const { tasks, newTask } = this.state;
    const currentId = Date.now();
    
    if (!newTask.trim()) { 
      this.setState({ error: 'неверно введен текст' });
      return;
    }

    const newTaskList = [
      ...tasks,
      { id: currentId, text: newTask, isCompleted: false },
    ];
    const sortedTasks = sortTasks(newTaskList);
    this.setState({
      tasks: sortedTasks,
      newTask: "",
    });
  };

  deleteTask = (elementId) => {
    const { tasks } = this.state;
    const updatedTasks = tasks.filter((element) => element.id !== elementId);
    this.setState({ tasks: updatedTasks });
  };

  changeCheckbox = (elementId) => {
    const { tasks } = this.state;
    const updatedTasks = [...tasks];
    const taskIndex = updatedTasks.findIndex(
      (element) => element.id === elementId
    );

    if (taskIndex === -1) {
      return
    }

    updatedTasks[taskIndex].isCompleted =
      !updatedTasks[taskIndex].isCompleted;
    const sortedTasks = sortTasks(updatedTasks);
    this.setState({ tasks: sortedTasks });
  };

  deleteAllTask = () => {
    this.setState({ tasks: [] });
  };

  changeTask = (taskId) => {
    this.setState({ isChangeing: taskId });
    this.fixInputFields(taskId);
  };

  stopEdit = () => {
    this.setState({ isChangeing: 0 });
  };

  confirmEdit = (event, taskId, text) => {
    event.preventDefault();
    const { tasks } = this.state;
    
    if (!text.trim()) { 
      this.setState({ error: 'неверно введен текст' });
      return;
    }

    const editedTask = tasks.find((element) => element.id === taskId);

    if (editedTask) {
      editedTask.text = text;
    }
    this.setState({ tasks, isChangeing: 0 });
  };

  fixInputFields = (taskId) => {
    const { tasks } = this.state;
    const currentTask = tasks.find((element) => element.id === taskId);
    this.setState({ taskEdit: currentTask.text });
  };

  changeEntryField = (e) => {
    this.setState({ taskEdit: e.target.value });
  };

  render() {
    const { tasks, newTask, error, isChangeing, taskEdit } = this.state;

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
              <div>
                {!(task.id === isChangeing) ? (
                  <Task
                    key={task.id}
                    task={task}
                    deleteTask={() => this.deleteTask(task.id)}
                    changeCheckbox={() => this.changeCheckbox(task.id)}
                    changeTask={() => this.changeTask(task.id)}
                  />
                ) : (
                  <TaskChange
                    key={task.id}
                    task={task}
                    stopEdit={() => this.stopEdit()}
                    confirmEdit={(event, taskId, text) =>
                      this.confirmEdit(event, taskId, text)
                    }
                    taskEdit={taskEdit}
                    changeEntryField={(e) => this.changeEntryField(e)}
                  />
                )}
              </div>
            ))}
          </div>
          <button
            className="main-container__delete-all-button"
            type="button"
            onClick={this.deleteAllTask}
          >
            Тотальная чистка
          </button>
        </div>
      </div>
    );
  }
}

export default Main;
