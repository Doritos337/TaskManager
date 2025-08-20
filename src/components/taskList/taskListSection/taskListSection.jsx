import React, { memo } from "react";
import Button from "../../button/button";
import "./taskListSection.scss";

const TaskListSection = memo(({ title, tasks, actions, onStatusChange }) => {
  return (
    <section className="task-section">
      <h3 className="task-section__title" data-count={tasks.length}>
        {title}
      </h3>
      <ul className="task-section__list">
        {tasks.map((task) => (
          <li key={task.id} className="task-card">
            <p className="task-card__title">{task.title}</p>
            <div className="task-card__actions">
              {actions.map(({ label, status }) => (
                <Button
                  key={status}
                  className={`task-action task-action--${status}`}
                  onClick={() => onStatusChange(task.id, status)}
                >
                  {label}
                </Button>
              ))}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
});

export default TaskListSection;
