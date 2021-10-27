import React, { useState, useRef } from 'react';
import './App.css'


type FormElement = React.FormEvent<HTMLFormElement>;

interface ITask {
  name: string;
  done: boolean;
  id: number;
}

function App(): JSX.Element {
  const [newTask, setNewTask] = useState<string>('');
  const [tasks, setTasks] = useState<ITask[]>([]);

  const taskInput = useRef<HTMLInputElement>(null);

  const handleSubmit = (e: FormElement) => {
    e.preventDefault();
    addTask(newTask);
    setNewTask('')
    taskInput.current?.focus()
  }

  const addTask = (name: string) => {
    const newTasks: ITask[] = [...tasks, { name, done: false, id: new Date().getTime() }];
    setTasks(newTasks);
  }

  const toggleDoneTask = (task: ITask): void => {
    const newTasks: ITask[] = [...tasks].map(t => {
      if (t.id === task.id) {
        t.done = !task.done
      }
      return t
    })
    setTasks(newTasks)
  }

  const removeTask = (task: ITask): void => {
    const newTasks: ITask[] = [...tasks].filter(t => t.id !== task.id)
    setTasks(newTasks)

  }

  return (
    <>
      <div className="card">
        <div className="card-body">
          <form onSubmit={handleSubmit} >
            <input type="text" onChange={e => setNewTask(e.target.value)} value={newTask} ref={taskInput} />
            <button className="button-save">Save</button>
          </form>
        </div>
      </div>
      <ul>
        {tasks.map(task =>
          <li key={task.id}>
            <h3 className={task.done ? 'done' : ''} >{task.name}</h3>
            <div><button className="button-check" onClick={() => toggleDoneTask(task)} >{task.done ? '✔' : '✗'}</button>
          <button className="removeTask" onClick={() => removeTask(task)} >🗑</button></div>
          </li>)}
      </ul>
    </>
  );
}

export default App;
