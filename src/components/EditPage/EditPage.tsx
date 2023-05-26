import React, {ChangeEvent, FC, useState} from 'react'
import classes from './EditPage.module.sass'
import { useNavigate, useParams } from 'react-router-dom'
import { priority, task } from '../Tasks/TaskCard'
import CustomButton from '../UI/Buttons/CustomButton'
import { nanoid } from 'nanoid'

interface editPageProps{
	tasks: task[]
	editTask: (taskId: string, task: task) => void
	priorityOptions: priority[]
	markOptions: string[]

}

const EditPage: FC<editPageProps> = ({tasks, editTask, priorityOptions, markOptions}) => {

	const { id } = useParams<{id: string}>()

	const task = tasks.length !== 0 
	? tasks.reduce((prev, curr) => {return curr.id.toString() === id ? curr : prev})
	: null

	const [taskLabel, setTaskLabel] = useState(task?.label)
	const [priorityValue, setPriority] = useState(task?.priority)
	const [marks, setMarks] = useState(task?.marks)
	const [descr, setDescr] = useState(task?.description)


	const navigate = useNavigate()

	const handleSelectChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setPriority(event.target.value)
		console.log(marks)
	}

	const handleMarksChange = (event: ChangeEvent<HTMLInputElement>) => {
		console.log(marks)
		console.log(event.target.value)
		if(marks?.includes(event.target.value)){
			setMarks(marks.filter(elem => elem !== event.target.value))
		}else{
			if(marks){
				setMarks([...marks, event.target.value])
			}
		}
	}

	const handleSaveClick = () => {
		const newTaskValue: task = {
			id: nanoid(),
			label: taskLabel ? taskLabel : '',
			description: descr ? descr : '',
			marks: marks ? marks : [],
			priority: priorityValue ? priorityValue : '',
			time: task?.time ? task.time : '1'
		}
		editTask(id ? id : '', newTaskValue)
		navigate(-1)
	}
	

  return (
	<div className={classes.editPage}>
		<div className={classes.buttonArea}>
				<CustomButton onClick={() => navigate(-1)} label='Назад' variant='white'/>
		</div>
		<div className={classes.wrapper}>
				<div className={classes.editLabel}>
					<h1>Название задачи</h1>
					<input type="text" value={taskLabel} onChange={(event) => {setTaskLabel(event.target.value)}}/>
				</div>
				<div className={classes.editPriority}>
					<h1>Приоритет</h1>
					<select name="priority" id="priority" onChange={(event) => handleSelectChange(event)}>
						{priorityOptions.map(elem => <option value={elem}>{elem}</option>)}
					</select>
				</div>
				<div className={classes.editMarks}>
					<h1>Отметки</h1>
					<div className={classes.selectWrapper}>
						{markOptions.map(elem => 
						<div className={classes.markOption}>
						<input type='checkbox' key={elem} value={elem} checked={marks?.includes(elem)} onChange={handleMarksChange}/>
						<label htmlFor={elem}>{elem}</label>
						</div>)}
					</div>

				</div>
				<div className={classes.editDescr}>
					<h1>Описание</h1>
					<textarea value={descr} onChange={event => setDescr(event.target.value)}/>
				</div>
				<div className={classes.saveArea}>
					<CustomButton label='Сохранить' onClick={()=>{handleSaveClick()}} variant='blue'/>
				</div>
		</div>
	</div>
  )
}

export default EditPage