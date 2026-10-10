import { useState, useEffect } from 'react';
import type {  TaskList } from '../types/Task';


function useTasks() {
  const [tasks, setTasks] = useState<TaskList>(() => {
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    return [];
  });

    useEffect(() => {
      
    }, []); 

    useEffect(() => {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

  return { tasks, setTasks };
  
}
export default useTasks;