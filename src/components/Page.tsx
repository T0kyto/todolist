import React, {FC, PropsWithChildren} from 'react'
import classes from '../sass/Page.module.sass'

const Page:FC<PropsWithChildren> = ({children}) => {
  return (
	<div className={classes.page}>
		{children}
	</div>
  )
}

export default Page