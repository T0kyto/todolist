import React, {FC, PropsWithChildren} from 'react'
import classes from './TaskArea.module.sass'

const TaskArea:FC<PropsWithChildren> = ({children}) => {
  return (
	<div className={classes.taskArea}>
    {children}
  </div>
  )
}

export default TaskArea