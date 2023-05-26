import React, {FC} from 'react'
import classes from './Button.module.sass'

type variants = 'red' | 'blue' | 'white'

interface buttonProps{
	label: string
	onClick: () => void
	variant: variants
}

const CustomButton: FC<buttonProps> = ({label, onClick, variant}) => {

	const btnClasses: string[]  = [classes.button]

	switch(variant){
		case 'red':
			btnClasses.push(classes.red)
			break
		case 'blue':
			btnClasses.push(classes.blue)
			break
		case 'white':
			btnClasses.push(classes.white)
			break
	}

  return (
	<button onClick={() => onClick()} className={btnClasses.join(' ')}>
		{label}
	</button>
  )
}

export default CustomButton