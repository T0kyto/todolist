import React, {FC, PropsWithChildren} from 'react'
import classes from './Controls.module.sass'

const Controls: FC<PropsWithChildren> = ({children}) => {
  return (
	<div className={classes.controls}>
		{children}
	</div>
  )
}

export default Controls