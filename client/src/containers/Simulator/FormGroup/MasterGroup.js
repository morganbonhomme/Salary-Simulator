import React from 'react';
import SimpleDropdown from './SimpleDropdown';


const masterGroup = (props) => {
  let range;
  let min;
  let max;
  let input;
 
  if (props.min && props.max) {
    range =  <input type='range' className='custom-range ' min={props.min} max={props.max} step='0.01' id='masterRange' value={props.inputValue} onInput={props.rangeChanged} onChange={props.rangeChanged}></input>;

    min = <input type='text' readOnly className='form-control-plaintext text-right' id='minRange' value={(props.min)}></input>;

    max = <input type='text' readOnly className='form-control-plaintext' id='maxRange' value={(props.max)}></input>;

    if (props.inputValue) {
      input = <input type='text' readOnly className='form-control-plaintext w-25 text-center mx-auto font-weight-bolder text-primary' id='actualValue' value={(props.inputValue)}></input>
    }
  }

  return (
    <div className='form-group'>
      <SimpleDropdown 
        onChange={props.onChange}
        name={props.name} 
        key={props.id} 
        id={props.id} 
        choices={props.choices}
        selected={props.selected}/>
      <div className='container-fluid'>
        <div className='row justify-content-center '>
          <div className='col'> 
            {input}
          </div>
        </div>
        <div className='row justify-content-center '>
          <div className='col-4'> 
            {min}
          </div>
          <div className='col my-auto'> 
            {range}
          </div>
          <div className='col-4'> 
            {max}
          </div>
        </div>
      </div>
    </div>
  )
}

export default masterGroup;