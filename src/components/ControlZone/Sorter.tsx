import React, {FC} from 'react'
import classes from './Sorter.module.sass'

interface sorterProps{
	options: string[]
  setValue: (event: React.ChangeEvent<HTMLInputElement>) => void
  value: string
  label:string
}

const Sorter: FC<sorterProps> = ({options, setValue, value, label}) => {

  return (
  <div className={classes.sorter}>
  <h1>{label}</h1>
  {options.map((elem) => 
  
      <div className={classes.option} key={elem}>
        <input 
        className={classes.radio}
        checked={elem === value}
        type='radio' 
        value={elem} 
        name='radio' 
        onChange={(event) => setValue(event)} 
        key={elem}
        id={elem}
        />
        <label htmlFor={elem}>{elem}</label>
      </div>

  
  )}

  </div>
  )
}

export default Sorter