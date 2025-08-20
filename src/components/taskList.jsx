import React, { useEffect } from 'react';
import { STATUSES } from '../constants/constants';

const API = "https://680fc8ae27f2fdac240f60df.mockapi.io/tasks";

export default function TaskList({ list, setList }) {
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(API);
        const data = await response.json();
        setList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [setList]);

  const handleStatusChange = (taskId, newStatus) => {
    setList(prev => 
      prev
        .map(task => 
          task.id === taskId ? { ...task, status: newStatus } : task
        )
    );
  };

  const filteredListGetter = (list, status) => {
    return (list.filter(item => item.status === status))
  }

  return (
    <section>
      <section>
        <h2>To Do: {filteredListGetter(list, STATUSES.TODO).length}</h2>
        <ul>
          {filteredListGetter(list, STATUSES.TODO).map(task => (
            <div key={task.id}>
              <li>{task.title}</li>
              <button onClick={() => handleStatusChange(task.id, STATUSES.IN_PROGRESS)}>
                In progress
              </button>
            </div>
          ))}
        </ul>
      </section>

      <section>
        <h2>In progress: {filteredListGetter(list, STATUSES.IN_PROGRESS).length}</h2>
        <ul>
          {filteredListGetter(list, STATUSES.IN_PROGRESS).map(task => (
            <div key={task.id}>
              <li>{task.title}</li>
              <button onClick={() => handleStatusChange(task.id, STATUSES.TODO)}>
                To do
              </button>
              <button onClick={() => handleStatusChange(task.id, STATUSES.DONE)}>
                Done
              </button>
            </div>
          ))}
        </ul>
      </section>

      <section>
        <h2>Done: {filteredDoneList.length}</h2>
        <ul>
          {filteredDoneList.map(task => (
            <div key={task.id}>
              <li>{task.title}</li>
              <button onClick={() => handleStatusChange(task.id, STATUSES.ARCHIVED)}>
                To archive
              </button>
            </div>
          ))}
        </ul>
      </section>
    </section>
  );
}