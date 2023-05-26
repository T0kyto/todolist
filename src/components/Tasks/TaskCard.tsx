import React, {FC, useState, useEffect, useRef} from 'react'
import classes from './TaskCard.module.sass'
import { parse } from 'path'
import { getTimeLabel } from '../../TimeUtils'
import { useNavigate } from 'react-router-dom'

export type priority = 'low' | 'normal' | 'high' | string
export type mark = 'research' | 'design' | 'develpment' | string

export interface task{
	id: string
	label: string
	time: string
	priority: priority
	marks: mark[]
	description: string
}

interface taskCardProps{
	task: task
}

const TaskCard: FC<taskCardProps> = ({task}) => {

	const navigate = useNavigate()
	
	const [timeState, setTimeState] = useState(getTimeLabel(parseInt(task.time)))
	useEffect(() => {
		setInterval(() => {return setTimeState(getTimeLabel(parseInt(task.time)))}, 30000)
	}, [])

  return (
	<div className={classes.taskCard} key={task.id}>
		<h1 onClick={() => navigate(`/taskinfo/${task.id}`)}>{task.label}</h1>
		<span>Создано: {timeState}</span>
		<span>Приоритет: {task.priority}</span>
		<span>Отметки: {task.marks.join(', ')}</span>
	</div>
  )
}

export default TaskCard