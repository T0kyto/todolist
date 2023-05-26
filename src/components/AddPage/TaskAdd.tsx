import React, {ChangeEvent, FC, useContext, useState} from 'react'
import { priority, task } from '../Tasks/TaskCard'
import classes from './TaskAdd.module.sass'
import { useNavigate } from 'react-router-dom'
import CustomButton from '../UI/Buttons/CustomButton'


interface taskAddProps {
	taskAddFoo: (label: string, priority: string, marks: string[], descr: string) => void
	priorityOptions: priority[]
	markOptions: string[]

	
}

const TaskAdd: FC<taskAddProps> = ({taskAddFoo, markOptions, priorityOptions}) => {
	const [taskLabel, setTaskLabel] = useState('')
	const [priorityValue, setPriority] = useState(priorityOptions[0])
	const [marks, setMarks] = useState(markOptions)
	const [descr, setDescr] = useState('')



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
		taskAddFoo(taskLabel, priorityValue, marks, descr)
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
					<CustomButton label='Сохранить' onClick={()=>{taskAddFoo(taskLabel, priorityValue, marks, descr); navigate(-1)}} variant='blue'/>
				</div>
		</div>
	</div>
  )
}

export default TaskAdd