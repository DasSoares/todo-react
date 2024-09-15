import { useEffect, useState } from "react";
import AddTask from "./components/AddTask";
import Tasks from "./components/Tasks";

function App() {
  const [lastTasksId, setlastTasksId] = useState(3);
  const [tasks, setTasks] = useState(
    JSON.parse(localStorage.getItem("tasks")) || []
  );

  // Atualiza o estado da Task
  function onCompleteTaskClick(taskId) {
    const newTask = tasks.map((task) => {
      // debugger;
      if (task.id === taskId) {
        return { ...task, isCompleted: !task.isCompleted };
      }
      // Não precisa atualizar a task atual
      return task;
    });
    setTasks(newTask);
  }

  function onDelteTaskClick(taskId) {
    const newTasks = tasks.filter((item) => item.id !== taskId);
    setTasks(newTasks);
  }

  function onAddTaskSubmit(title, description) {
    setlastTasksId((lastTasksId) => lastTasksId + 1);
    const newTask = {
      id: lastTasksId,
      title: title,
      description: description,
      isCompleted: false,
    };
    setTasks([...tasks, newTask]);
  }

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // useEffect não pode ser usado como assincrono, necessário criar um função para isso
  useEffect(() => {
    async function fetchTasksAPI() {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos?_limit=10"
      );
      const data = await response.json();
      setTasks(data);
    }
    // Se quiser, pode chamar uma API para pegar as Tarefas
    // fetchTasksAPI();
  });

  return (
    <div className="w-screen h-screen bg-slate-500 flex justify-center p-6">
      <div className="w-[500px] space-y-4">
        <h1 className="text-3xl text-slate-100 font-bold text-center">
          Gerenciador de Tarefas
        </h1>
        <AddTask onAddTaskSubmit={onAddTaskSubmit} />
        <Tasks
          tasks={tasks}
          onCompleteTaskClick={onCompleteTaskClick}
          onDelteTaskClick={onDelteTaskClick}
        />
        {/* as variaveis podem ser dado qualquer nome --> */}
      </div>
    </div>
  );
}

export default App;
