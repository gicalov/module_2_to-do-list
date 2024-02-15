import React from "react";
import Task from "../../Task/";
import Form from "../../Form/";
import Error from "../../Error/";
import TaskEditForm from "../../TaskEditForm/";
import sortTasks from '../../../helpers/sort-tasks.js';
import { tasksList } from "../../../constants.js";
import "./style.css";

class Main extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      newTask: "",
      error: "",
      changedTaskId: null,
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

  openEditForm = (taskId) => {
    const { tasks } = this.state;
    this.setState({ changedTaskId: taskId });
    const currentTask = tasks.find((element) => element.id === taskId);
    this.setState({ taskEdit: currentTask.text });
  };

  cancelEditingTask = () => {
    this.setState({ changedTaskId: null });
  };

  saveEditingTask = (event, taskId) => {
    event.preventDefault();
    const { tasks, taskEdit } = this.state;
    
    if (!taskEdit.trim()) { 
      this.setState({ error: 'неверно введен текст' });
      return;
    }

    const editedTask = tasks.find((element) => element.id === taskId);
    editedTask.text = taskEdit;
    this.setState({ tasks, changedTaskId: null });
  };

  handleChangeInput = (e) => {
    this.setState({ taskEdit: e.target.value });
  };

  render() {
    const { tasks, newTask, error, changedTaskId, taskEdit } = this.state;

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
                {(task.id !== changedTaskId) ? (
                  <Task
                    key={task.id}
                    task={task}
                    deleteTask={() => this.deleteTask(task.id)}
                    changeCheckbox={() => this.changeCheckbox(task.id)}
                    openEditForm={() => this.openEditForm(task.id)}
                  />
                ) : (
                  <TaskEditForm
                    key={task.id}
                    task={task}
                    cancelEditingTask={this.cancelEditingTask}
                    saveEditingTask={this.saveEditingTask}
                    taskEdit={taskEdit}
                    handleChangeInput={this.handleChangeInput}
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
