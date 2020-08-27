import React from 'react';

const simpleDropDown = (props) => {
  let choices = [...new Set(props.choices)].map(choice => {
    // if (choice === props.selected) {
    //   return (
    //     <option 
    //       key={props.selected} 
    //       value={props.selected}
    //       selected>
    //       {props.selected}
    //     </option>
    //   )
    // } else {
      return (      
        <option 
          key={choice} 
          value={choice}>
          {choice}
        </option>
       )
    // }
  });
  
  return (
    <div className="form-group">
      <label className="font-weight-bold" htmlFor={props.id}>{props.name}</label>
      <select 
        className="custom-select" 
        id={props.id}
        onChange={props.onChange}
        value={props.selected}
        >
        {choices}
      </select>
    </div>
  )
}

export default simpleDropDown;