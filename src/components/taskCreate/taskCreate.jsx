import React, { memo, useState, useCallback } from "react";
import { STATUSES } from "../../constants/constants";
import Button from "../button/button";
import "./taskCreate.scss";

const TaskCreate = memo(({ onCreate }) => {
  const [title, setTitle] = useState("");
  const [status, setStatus] = useState(STATUSES.TODO);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      if (!title.trim()) return;

      try {
        const response = await fetch(
          "https://680fc8ae27f2fdac240f60df.mockapi.io/tasks",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, status }),
          }
        );

        const newTask = await response.json();
        onCreate(newTask);
        setTitle("");
      } catch (err) {
        console.error("Error:", err);
      }
    },
    [title, status, onCreate]
  );

  return (
    <form className="task-create" onSubmit={handleSubmit}>
      <div className="task-create__group">
        <label className="task-create__label">Title:</label>
        <input
          className="task-create__input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </div>

      <div className="task-create__group">
        <label className="task-create__label">Status:</label>
        <select
          className="task-create__select"
          value={status}
          onChange={(e) => setStatus(Number(e.target.value))}
        >
          <option value={STATUSES.TODO}>To Do</option>
          <option value={STATUSES.IN_PROGRESS}>In Progress</option>
          <option value={STATUSES.DONE}>Done</option>
        </select>
      </div>

      <Button className="task-create__button" type="submit">
        Create
      </Button>
    </form>
  );
});

export default TaskCreate;
