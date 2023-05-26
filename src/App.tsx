import React, {useState, useEffect, createContext, useMemo} from 'react';
import classes from './sass/App.module.sass'
import CustomButton from './components/UI/Buttons/CustomButton';
import TaskCard, { priority } from './components/Tasks/TaskCard';
import { task } from './components/Tasks/TaskCard';
import TaskList from './components/Tasks/TaskList';
import TaskArea from './components/Tasks/TaskArea';
import Sorter from './components/ControlZone/Sorter';
import Filter from './components/ControlZone/Filter';
import Controls from './components/ControlZone/Controls';
import Page from './components/Page';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskinfoCard from './components/Taskinfo/TaskinfoCard';
import TaskinfoPage from './components/Taskinfo/TaskinfoPage';
import EditPage from './components/EditPage/EditPage';
import TaskAdd from './components/AddPage/TaskAdd';
import { create } from 'domain';
import { nanoid } from 'nanoid';
import axios from 'axios';


export type checkboxValues = {label: string, checked: boolean}[]


function App() {

  
  const time = new Date().getTime()
  const [radioValue, setRadioValue] = useState<string>('Новые')
  const sortOptions = ['Новые', 'Старые']

  const [priorityFlags, setPriorityFlags] = useState<checkboxValues>([
    {label: 'low', checked: true},
    {label: 'normal', checked: true},
    {label: 'high', checked: true},
])
  const [markFlags, setMarkFlags] = useState<checkboxValues>([
    {label: 'research', checked: true},
    {label: 'development', checked: true},
    {label: 'design', checked: true}
  ])


  const [tasks, setTasks] = useState<task[]>([])

  const getTasks = async () => {

    const posts = await axios.get("http://test-rest-api/tasks")
    const postsParsed = await (posts.data)

    console.log(postsParsed)
    
    setTasks(postsParsed)

  }

  const addTask = async (label: string, priority: string, marks: string[], description: string) => {

    const id = nanoid()
    const time = new Date().getTime().toString()

    let data = new FormData()
    data.append("id", id)
    data.append("label", label ? label : 'Задача без названия')
    data.append('priority', priority)
    data.append('marks', marks.join(' '))
    data.append('description', description ? description : '...')
    data.append('time', time)

    const post = await axios({
      method: 'post',
      url: 'http://test-rest-api/tasks',
      data: data
    })

    getTasks()
  }

  const deleteTask = async (taskId: string) => {
    const del = await axios({
        method: 'delete',
        url: `http://test-rest-api/tasks/${taskId}`
     })

     getTasks()
  }

  const editTask = async (taskId: string, taskValue: task) => {

    const label = taskValue.label
    const priority = taskValue.priority
    const marks = taskValue.marks.join(' ')
    const description = taskValue.description
    const time = taskValue.time

    const update = await axios({
      method: 'put',
      url: `http://test-rest-api/tasks/${taskId}`,
      data: {
        id: taskId,
        label: label,
        priority: priority,
        marks: marks,
        description: description,
        time: time
      }
    })

    getTasks()
  }

  useEffect(() => {getTasks()},[])

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRadioValue(event.target.value)

  }

  const handleCheckChangeMark = (label: string) => {
    setMarkFlags(markFlags.map(elem => {
      return elem.label === label ? {...elem, checked: !elem.checked} : elem
    }))
  }

  const handleCheckChangePriority = (label: string) => {
    setPriorityFlags(priorityFlags.map(elem => {
      return elem.label === label ? {...elem, checked: !elem.checked} : elem
    }))
  }

  // const editTask = (taskId: string, taskValue: task) => {
  //   setTasks(tasks.map(elem => elem.id === taskId ? taskValue : elem))
  // }

  const getSortedTasks = (tasks: task[]) => {
    const sortedArr = radioValue === 'Новые' 
    ? tasks.sort((prev, curr) => parseInt(curr.time) - parseInt(prev.time)) 
    : tasks.sort((prev, curr) =>  parseInt(prev.time) - parseInt(curr.time))
    return sortedArr
  }

  const getFilteredByPriority = (tasks: task[]) => {
    const currentPriorities: string[] = []
    for(let i of priorityFlags){
      if(i.checked){
        currentPriorities.push(i.label)
      }
    }
    return tasks.filter(elem => currentPriorities.includes(elem.priority))

  }

  const getFilteredByMarks = (tasks: task[]) => {
    const currentMarks: string[] = []
    for(let i of markFlags){
      if(i.checked){
        currentMarks.push(i.label)
      }
    }
    return tasks.filter(elem => elem.marks.filter(x => currentMarks.includes(x)).length !== 0 )
  }

  let filteredAndSortedTasks = useMemo(() => {return getFilteredByMarks(getFilteredByPriority(getSortedTasks(tasks)))}, [tasks, markFlags, priorityFlags, radioValue])

   


  return (

   <div className={classes.app}>

      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <Page>
              <Controls>
                <Sorter options={sortOptions} setValue={handleRadioChange} value={radioValue} label='Сортировка'/>
                <div className={classes.filterWrap}>
                  <Filter label='Отметка' onChange={handleCheckChangeMark} value={markFlags}></Filter>
                  <Filter label='Приоритет' onChange={handleCheckChangePriority} value={priorityFlags}></Filter>
                </div>
              </Controls>
              <TaskArea>
                <TaskList tasks={filteredAndSortedTasks}/>
              </TaskArea>
            </Page>
          }/>

          <Route path='taskinfo/:id' element={<TaskinfoPage deleteFoo={deleteTask} tasks={tasks}/>}/>

          <Route path='taskedit/:id' element={<EditPage 
          editTask={editTask} 
          markOptions={['research', 'design', 'development']}
          priorityOptions={['high', 'normal', 'low']}
          tasks={tasks}/>}/>

          <Route path='taskadd' element={<TaskAdd 
          markOptions={['research', 'design', 'development']}
          priorityOptions={['high', 'normal', 'low']}
          taskAddFoo={addTask}  
          />}/>

          <Route path='*' element ={
            <Page>
              <Controls>
                <Sorter options={sortOptions} setValue={handleRadioChange} value={radioValue} label='Сортировка'/>
                <div className={classes.filterWrap}>
                  <Filter label='Отметка' onChange={handleCheckChangeMark} value={markFlags}></Filter>
                  <Filter label='Приоритет' onChange={handleCheckChangePriority} value={priorityFlags}></Filter>
                </div>
              </Controls>
              <TaskArea>
                <TaskList tasks={filteredAndSortedTasks}/>
              </TaskArea>
          </Page>
          }/>

        </Routes>
      </BrowserRouter>

   </div>

  );
}

export default App;
