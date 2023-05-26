import React, {FC} from 'react'
import classes from './TaskList.module.sass'
import { task } from './TaskCard'
import TaskCard from './TaskCard'
import AddButtonArea from './AddButtonArea'
import CustomButton from '../UI/Buttons/CustomButton'
import {useNavigate} from 'react-router-dom'

interface taskListProps{
  tasks: task[]
}

const TaskList: FC<taskListProps> = ({tasks}) => {

  const navigate = useNavigate()

  return (
	<div className={classes.taskList}>
    <div className={classes.btnArea}>
      <CustomButton label='Добавить задачу' onClick={() => {navigate('/taskadd')}} variant='blue'/>
    </div>
    {tasks.map(task => <TaskCard task={task} key={task.id}/>)}
  </div>
  )
}

export default TaskList