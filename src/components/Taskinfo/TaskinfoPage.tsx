import React, {FC} from 'react'
import TaskCard, { task } from '../Tasks/TaskCard'
import {useParams, useNavigate} from 'react-router-dom'
import TaskinfoCard from './TaskinfoCard'
import classes from './TaskinfoPage.module.sass'
import CustomButton from '../UI/Buttons/CustomButton'

interface taskinfoPage{
	deleteFoo: (id: string) => void
	tasks: task[]
}

const TaskinfoPage: FC<taskinfoPage> = ({ tasks, deleteFoo}) => {

	const {id} = useParams<{id: string}>()
	const currTask = tasks.length !== 0 
	? tasks.reduce((prev, curr) => {return curr.id.toString() === id ? curr : prev})
	: null
	const navigate= useNavigate()

  return (
	<>{currTask !== null ? 
	<div className={classes.taskInfoPage}>
		<div className={classes.controls}>
			<div className={classes.firstControls}>
				<CustomButton label='Назад' onClick={() => navigate(-1)} variant='white'/>
				<CustomButton label='Редактировать' onClick={() => navigate(`../taskedit/${currTask.id}`, {replace: true})} variant='blue'/>
			</div>
			<div className={classes.secondControls}>
				<CustomButton label='Удалить' onClick={() => {deleteFoo(currTask.id); navigate(-1)}} variant='red'/>
			</div>
		</div>
		<TaskinfoCard task={currTask}/>
	</div> 
	: <></>}</>
	
  )
}

export default TaskinfoPage