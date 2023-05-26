import React, {FC} from 'react'
import { task } from '../Tasks/TaskCard'
import classes from './TaskinfoCard.module.sass'
import { getStandartTime } from '../../TimeUtils'

interface taskInfoCardProps{
	task: task
}

const TaskinfoCard: FC<taskInfoCardProps> = ({task}) => {

	const time = parseInt(task.time)
	const timeString = getStandartTime(new Date(time))

  return (
	<div className={classes.taskInfoCard}>
		<div className={classes.taskProp}>
			<h1>Название задачи</h1>
			<p>{task.label}</p>
		</div>
		<div className={classes.taskProp}>
			<h1>Дата создания</h1>
			<p>{timeString}</p>
		</div>
		<div className={classes.taskProp}>
			<h1>Приоритет</h1>
			<p>{task.priority}</p>
		</div>
		<div className={classes.taskProp}>
			<h1>Отметки</h1>
			<p>{task.marks.length !== 0 ? task.marks.join(' ') : '...'}</p>
		</div>
		<div className={classes.taskProp}>
			<h1>Описание</h1>
			<p>{task.description !== '' ? task.description : '...'}</p>
		</div>

	</div>
  )
}

export default TaskinfoCard