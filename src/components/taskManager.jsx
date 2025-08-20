import React, { useState } from "react";
import TaskCreate from "../components/taskCreate/taskCreate";
import TaskList from "../components/taskList/taskList";
import { useTasks } from "../hooks/useTasks";
import "./taskManager.scss";

const TaskManager = () => {
  const [list, setList] = useState([]);
  useTasks(setList);

  return (
    <div className="task-manager">
      <TaskCreate
        onCreate={(newTask) => setList((prev) => [...prev, newTask])}
      />
      <TaskList list={list} setList={setList} />
    </div>
  );
};

export default TaskManager;
