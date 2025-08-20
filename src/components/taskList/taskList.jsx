import React, { useCallback } from "react";
import TaskListSection from "./taskListSection/taskListSection";
import { STATUSES } from "../../constants/constants";
import "./taskList.scss";

const TaskList = ({ list, setList }) => {
  const handleStatusChange = useCallback(
    async (taskId, newStatus) => {
      try {
        await fetch(
          `https://680fc8ae27f2fdac240f60df.mockapi.io/tasks/${taskId}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ status: newStatus }),
          }
        );

        setList((prev) =>
          prev.map((task) =>
            task.id === taskId ? { ...task, status: newStatus } : task
          )
        );
      } catch (err) {
        console.error("Ошибка:", err);
      }
    },
    [setList]
  );

  const handleArchive = useCallback(
    async (taskId) => {
      try {
        await fetch(
          `https://680fc8ae27f2fdac240f60df.mockapi.io/tasks/${taskId}`,
          {
            method: "DELETE",
          }
        );

        setList((prev) => prev.filter((task) => task.id !== taskId));
      } catch (err) {
        console.error("Error:", err);
      }
    },
    [setList]
  );

  return (
    <div className="task-list">
      <TaskListSection
        title="To Do"
        tasks={list.filter((t) => t.status === STATUSES.TODO)}
        onStatusChange={handleStatusChange}
        actions={[{ label: "In Progress", status: STATUSES.IN_PROGRESS }]}
      />

      <TaskListSection
        title="In Progress"
        tasks={list.filter((t) => t.status === STATUSES.IN_PROGRESS)}
        onStatusChange={handleStatusChange}
        actions={[
          { label: "To Do", status: STATUSES.TODO },
          { label: "Done", status: STATUSES.DONE },
        ]}
      />

      <TaskListSection
        title="Done"
        tasks={list.filter((t) => t.status === STATUSES.DONE)}
        onStatusChange={handleArchive}
        actions={[{ label: "Archive", status: STATUSES.ARCHIVED }]}
      />
    </div>
  );
};

export default TaskList;
