import React, {FC, useRef} from 'react'
import classes from './Filter.module.sass'
import { checkboxValues } from '../../App'

interface filterProps{
  
  onChange: (label: string) => void
  label: string
  value: {label: string, checked: boolean}[]

}

const Filter:FC<filterProps> = ({label, onChange, value}) => {

  return (
	<div className={classes.filter}>
    <h1>{label}</h1>
    {value.map((elem, index) => 
      <div className={classes.option} key={elem.label}>
        <input 
        className={classes.input}
        key={elem.label} 
        type="checkbox" 
        checked={value[index].checked} 
        onChange={() => onChange(elem.label)} 
        id={elem.label}/>

        <label htmlFor={elem.label}>{elem.label}</label>
      </div>
      )}
  </div>
  )
}

export default Filter