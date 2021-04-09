import { useState } from "react";

import "../styles/tasklist.scss";

import { FiTrash, FiCheckSquare } from "react-icons/fi";

interface Task {
  id: number;
  title: string;
  isComplete: boolean;
}

export function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [test, setTest] = useState(0);

  function handleCreateNewTask() {
    // Crie uma nova task com um id random, não permita criar caso o título seja vazio.
    if (newTaskTitle) {
      let task = {
        id: Math.floor(Math.random() * 1000 + 1),
        title: newTaskTitle,
        isComplete: false,
      };
      setTasks([...tasks, task]);
    }
  }

  function handleToggleTaskCompletion(id: number) {
    // Altere entre `true` ou `false` o campo `isComplete` de uma task com dado ID
    let oldTasks = [...tasks];
    tasks.map((task) => {
      if (task.id == id) {
        let taskIndex = tasks.indexOf(task); // pegar o índice dessa task dentro do array
        let taskChanged = oldTasks[taskIndex]; // essa é a task que precisa ser atualizada

        // task update
        if (taskChanged.isComplete == false) {
          task.isComplete = true;
        } else if (taskChanged.isComplete == true) {
          task.isComplete = false;
        }
      }
    });
    setTasks(oldTasks);
  }

  function handleRemoveTask(id: number) {
    // Remova uma task da listagem pelo ID
    let oldTasks = [...tasks];
    tasks.map((task) => {
      if (task.id == id) {
        let indexTaskToBeRemove = oldTasks.indexOf(task);
        oldTasks.splice(indexTaskToBeRemove, 1);
      }
    });
    setTasks(oldTasks);
  }

  return (
    <section className="task-list container">
      <header>
        <h2>Minhas tasks</h2>

        <div className="input-group">
          <input
            type="text"
            placeholder="Adicionar novo todo"
            onChange={(e) => setNewTaskTitle(e.target.value)}
            value={newTaskTitle}
          />
          <button
            type="submit"
            data-testid="add-task-button"
            onClick={handleCreateNewTask}
          >
            <FiCheckSquare size={16} color="#fff" />
          </button>
        </div>
      </header>

      <main>
        <ul>
          {tasks.map((task) => (
            <li key={task.id}>
              <div
                className={task.isComplete ? "completed" : ""}
                data-testid="task"
              >
                <label className="checkbox-container">
                  <input
                    type="checkbox"
                    readOnly
                    checked={task.isComplete}
                    onClick={() => handleToggleTaskCompletion(task.id)}
                  />
                  <span className="checkmark"></span>
                </label>
                <p>{task.title}</p>
              </div>

              <button
                type="button"
                data-testid="remove-task-button"
                onClick={() => handleRemoveTask(task.id)}
              >
                <FiTrash size={16} />
              </button>
            </li>
          ))}
        </ul>
        {/* <ul>{test}</ul> */}
      </main>
    </section>
  );
}
