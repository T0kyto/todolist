import React, {FC, PropsWithChildren} from 'react'
import classes from './AddButtonArea.module.sass'

const AddButtonArea: FC<PropsWithChildren> = ({children}) => {
  return (
	<div className={classes.AddButtonArea}>
		{children}
	</div>
  )
}

export default AddButtonArea