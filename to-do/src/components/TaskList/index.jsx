import React from "react";
import TaskItem from "../TaskItem/";
import "./style.css";

class TaskList extends React.Component {
  render() {
    const { tasks, deleteTask } = this.props;

    return (
      <div className="task-list">
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            task={task}
            deleteTask={() => deleteTask(index)}
          />
        ))}
      </div>
    );
  }
}

export default TaskList;
