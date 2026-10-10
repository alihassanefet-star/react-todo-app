import { useMemo, useRef } from 'react'
import useTasks from './hooks/useTasks'



function App() {
  const {tasks, setTasks} = useTasks();
  const newTaskRef = useRef<HTMLInputElement>(null);
  
  const remainingTasks = useMemo(() => tasks.filter(task => !task.completed).length, [tasks]);
  // add task handler
  const handleAddTask = () => { 
    const text = newTaskRef.current?.value.trim();
    if (!text) return;
    setTasks(prev => [...prev, { id: prev.length + 1,  completed: false ,text}])

    if (newTaskRef.current) {
      newTaskRef.current.value = '';
    }

  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleAddTask();
    }
  };
// complete task handler  
  const handleCompleteTask = (id: number) => {
    const newTasks = [...tasks];
    const task = newTasks.find(task => task.id === id);
    if (!task) return;

    task.completed = !task.completed;
    setTasks(newTasks);
  }

  // delete task handler
  const handleDeleteTask = (id: number) => {
    setTasks(prev => prev.filter(task => task.id !== id));
  };


  return (
    <div className="min-h-screen max-w-sm mx-auto flex flex-col justify-center gap-2">
      <h1 className="text-2xl font-bold text-gray-700">To Do App</h1>
      <div className="w-full flex gap-2">
        <input ref={newTaskRef} onKeyDown={handleKeyDown} className="flex-1  border-b-2 border-gray-300 py-1 px-2" type="text" placeholder="Add a new task"/>
        <button onClick={handleAddTask} className="bg-gray-700 rounded-md text-white py-1 w-8 cursor-pointer"> + </button> 
      </div>
      <div className="flex flex-col gap-2">
        {tasks.map((task) => (
          <div className="border-1 border-gray-200 p-2 rounded-md flex justify-between" key={task.id}>
            <div onClick={() => handleCompleteTask(task.id)}  className="flex gap-2">
             <input type="checkbox" checked={task.completed} readOnly className="cursor-pointer"/> 
             <span className={` ${task.completed ? 'line-through text-gray-500' : ''} select-none  cursor-pointer`}>{task.text}</span>
            </div>
            <button onClick={() => handleDeleteTask(task.id)} className="text-sm cursor-pointer hover:bg-gray-100 rounded-md p-1">❌</button>
          </div>
        ))}
      </div>
      <div>Remaining tasks: {remainingTasks}</div>
    </div>
  )
}

export default App
